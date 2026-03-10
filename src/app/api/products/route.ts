import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get("campaignId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    const where = {
      isActive: true,
      ...(campaignId ? { campaignId } : {}),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true, campaign: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

// POST /api/products (관리자)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.json({ error: "관리자 권한이 필요합니다" }, { status: 403 });
    }

    const body = await request.json();
    const {
      name, slug, description, images, categoryId, campaignId,
      basePrice, stock, gradePrices, gradePointRates,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        description,
        images: JSON.stringify(images || []),
        categoryId: categoryId || null,
        campaignId: campaignId || null,
        basePrice,
        stock: stock || 0,
        gradePrices: JSON.stringify(gradePrices || {}),
        gradePointRates: JSON.stringify(gradePointRates || {}),
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
