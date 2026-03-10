import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "유효하지 않은 토큰입니다" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        referralCode: true,
        totalPoints: true,
        profileImage: true,
        bio: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            referrals: true,
            orders: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
