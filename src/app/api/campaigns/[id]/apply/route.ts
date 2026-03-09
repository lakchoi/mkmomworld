import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applySchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  campaignName: z.string().min(1, "신청 캠페인명을 입력해주세요"),
  message: z.string().optional(),
});

// POST /api/campaigns/[id]/apply
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = applySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.findFirst({
      where: { OR: [{ id }, { slug: id }], isActive: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: "캠페인을 찾을 수 없습니다" }, { status: 404 });
    }

    // 최대 참여자 수 확인
    if (campaign.maxParticipants && campaign.currentCount >= campaign.maxParticipants) {
      return NextResponse.json({ error: "신청 인원이 마감되었습니다" }, { status: 400 });
    }

    const { name, phone, email, campaignName, message } = validated.data;

    // 중복 신청 확인
    const existing = await prisma.campaignApplication.findFirst({
      where: { campaignId: campaign.id, email },
    });
    if (existing) {
      return NextResponse.json({ error: "이미 신청하셨습니다" }, { status: 409 });
    }

    // 로그인 유저 확인
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    let userId: string | null = null;
    if (token) {
      const { verifyToken } = await import("@/lib/auth");
      const decoded = verifyToken(token);
      if (decoded) userId = decoded.userId;
    }

    const application = await prisma.campaignApplication.create({
      data: {
        campaignId: campaign.id,
        userId,
        name,
        phone,
        email,
        campaignName,
        message: message || null,
      },
    });

    // 신청자 수 증가
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { currentCount: { increment: 1 } },
    });

    return NextResponse.json({
      message: "캠페인 신청이 완료되었습니다",
      application: { id: application.id },
    }, { status: 201 });
  } catch (error) {
    console.error("Campaign apply error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

// GET /api/campaigns/[id]/apply - 신청 목록 (관리자)
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });

    const { verifyToken } = await import("@/lib/auth");
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
    }

    const applications = await prisma.campaignApplication.findMany({
      where: { campaignId: id },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Campaign applications GET error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
