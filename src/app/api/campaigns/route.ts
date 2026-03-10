import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/campaigns - 캠페인 목록
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const displayed = searchParams.get("displayed");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(displayed === "true" ? { isDisplayed: true } : {}),
    };

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        include: {
          category: true,
          _count: { select: { applications: true } },
        },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.campaign.count({ where }),
    ]);

    return NextResponse.json({
      campaigns,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Campaigns GET error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

// POST /api/campaigns - 캠페인 생성 (관리자)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }

    const { verifyToken } = await import("@/lib/auth");
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

    const campaign = await prisma.campaign.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        summary,
        description,
        thumbnailImage: thumbnailImage || null,
        bannerImage: bannerImage || null,
        images: JSON.stringify(images || []),
        categoryId: categoryId || null,
        isActive: isActive ?? true,
        isDisplayed: isDisplayed ?? true,
        displayOrder: displayOrder || 0,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        maxParticipants: maxParticipants || null,
        requiredGrade: requiredGrade || "GRADE1",
        tags: JSON.stringify(tags || []),
      },
    });

    return NextResponse.json({ campaign }, { status: 201 });
  } catch (error) {
    console.error("Campaigns POST error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
