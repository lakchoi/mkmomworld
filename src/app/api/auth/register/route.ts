import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateReferralCode, generateToken, generateSessionToken } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다"),
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  phone: z.string().optional(),
  referralCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password, name, phone, referralCode } = validated.data;

    // 이메일 중복 확인
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다" },
        { status: 409 }
      );
    }

    // 추천인 코드 확인
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (!referrer) {
        return NextResponse.json(
          { error: "유효하지 않은 추천인 코드입니다" },
          { status: 400 }
        );
      }
    }

    // 고유 추천 코드 생성
    let myReferralCode = generateReferralCode();
    let codeExists = await prisma.user.findUnique({ where: { referralCode: myReferralCode } });
    while (codeExists) {
      myReferralCode = generateReferralCode();
      codeExists = await prisma.user.findUnique({ where: { referralCode: myReferralCode } });
    }

    const hashedPw = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPw,
        name,
        phone: phone || null,
        referralCode: myReferralCode,
        referredBy: referralCode || null,
        role: "GRADE1",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        referralCode: true,
      },
    });

    // 추천인에게 포인트 지급
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } });
      if (referrer) {
        await prisma.point.create({
          data: {
            userId: referrer.id,
            amount: 1000,
            type: "REFERRAL_BONUS",
            description: `${name}님 추천 보너스`,
          },
        });
        await prisma.user.update({
          where: { id: referrer.id },
          data: { totalPoints: { increment: 1000 } },
        });
      }
    }

    // 세션 생성
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const jwtToken = generateToken(user.id, user.role);

    return NextResponse.json({
      message: "회원가입이 완료되었습니다",
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
