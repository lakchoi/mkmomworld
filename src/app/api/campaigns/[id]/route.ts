import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET /api/campaigns/[id]
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const campaign = await prisma.campaign.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isActive: true,
      },
      include: {
        category: true,
        products: {
          where: { isActive: true },
          include: { category: true },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: "캠페인을 찾을 수 없습니다" }, { status: 404 });
    }

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error("Campaign GET error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

// PUT /api/campaigns/[id] - 캠페인 수정 (관리자)
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title, slug, summary, description, thumbnailImage, bannerImage,
      images, categoryId, isActive, isDisplayed, displayOrder,
      startDate, endDate, maxParticipants, requiredGrade, tags,
    } = body;

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        title,
        slug,
        summary,
        description,
        thumbnailImage,
        bannerImage,
        images: JSON.stringify(images || []),
        categoryId: categoryId || null,
        isActive,
        isDisplayed,
        displayOrder,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        maxParticipants,
        requiredGrade,
        tags: JSON.stringify(tags || []),
      },
    });

    return NextResponse.json({ campaign });
  } catch (error) {
    console.error("Campaign PUT error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

// DELETE /api/campaigns/[id]
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
    }

    await prisma.campaign.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json({ message: "캠페인이 삭제되었습니다" });
  } catch (error) {
    console.error("Campaign DELETE error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
