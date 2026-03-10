"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Phone, Gift, Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { toast } from "@/components/ui/Toaster";
import { Suspense } from "react";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  referralCode: string;
}

function RegisterFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultRef = searchParams.get("ref") || "";

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({
    defaultValues: { referralCode: defaultRef },
  });
  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast("비밀번호가 일치하지 않습니다", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          referralCode: data.referralCode || undefined,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        toast(json.error || "회원가입에 실패했습니다", "error");
        return;
      }

      login(json.user, json.token);
      toast(`환영합니다, ${json.user.name}님! 🎉`, "success");
      router.push("/");
    } catch {
      toast("서버 오류가 발생했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} 간편가입은 준비 중입니다`, "error");
  };

  const inputCls = "w-full pl-10 pr-4 py-3 rounded-xl border border-[#ccfbf1] bg-[#ffffff] focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm text-slate-800 placeholder:text-slate-600 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 min-h-screen">
      {/* Decorative blobs */}
      <div className="fixed top-20 right-10 w-80 h-80 bg-[#2dd4bf]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-64 h-64 bg-[#2dd4bf]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-[#2dd4bf] flex items-center justify-center text-2xl font-bold text-slate-800 shadow-xl shadow-[#2dd4bf]/20">
              M
            </div>
            <span className="font-bold text-xl text-slate-800">MK Mom World</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-5 mb-1">함께 시작해요!</h1>
          <p className="text-slate-500 text-sm">MK Mom World에 오신 것을 환영합니다</p>
        </div>

        {/* Form card */}
        <div className="bg-[#ffffff] rounded-3xl p-8 shadow-xl shadow-black/30 border border-[#ccfbf1]">
          {/* Social Login Buttons */}
          <p className="text-center text-sm font-semibold text-stone-600 mb-4">간편 가입</p>
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin("카카오")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:shadow-md"
              style={{ backgroundColor: "#FEE500", color: "#3C1E1E" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C7.03 3 3 6.14 3 10c0 2.38 1.46 4.47 3.67 5.75L5.8 19.1c-.08.27.2.5.44.35L9.9 17c.68.1 1.38.15 2.1.15 4.97 0 9-3.14 9-7S16.97 3 12 3z"/>
              </svg>
              카카오로 시작하기
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("네이버")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm text-slate-800 transition-all hover:opacity-90 hover:shadow-md"
              style={{ backgroundColor: "#03C75A" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.27 12.67L7.16 2H2v20h5.73l9.11-10.67V22H22V2h-5.73z"/>
              </svg>
              네이버로 시작하기
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("구글")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-[#ffffff] border border-[#ccfbf1] transition-all hover:border-stone-300 hover:shadow-md"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 시작하기
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-slate-500 font-medium">또는 이메일로 가입</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">이름</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("name", { required: "이름을 입력해주세요", minLength: { value: 2, message: "이름은 2자 이상이어야 합니다" } })}
                  type="text" placeholder="홍길동"
                  className={inputCls}
                />
              </div>
              {errors.name && <p className="text-xs mt-1 text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">이메일</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("email", {
                    required: "이메일을 입력해주세요",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "올바른 이메일을 입력해주세요" },
                  })}
                  type="email" placeholder="hello@example.com"
                  className={inputCls}
                />
              </div>
              {errors.email && <p className="text-xs mt-1 text-red-500">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                전화번호 <span className="font-normal text-slate-500">(선택)</span>
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("phone")}
                  type="tel" placeholder="010-0000-0000"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">비밀번호</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: { value: 8, message: "비밀번호는 8자 이상이어야 합니다" },
                  })}
                  type={showPw ? "text" : "password"} placeholder="8자 이상 입력"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#ccfbf1] bg-[#ffffff] focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm text-slate-800 placeholder:text-slate-600 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-stone-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs mt-1 text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">비밀번호 확인</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("confirmPassword", {
                    required: "비밀번호 확인을 입력해주세요",
                    validate: (v) => v === password || "비밀번호가 일치하지 않습니다",
                  })}
                  type={showPw ? "text" : "password"} placeholder="비밀번호 재입력"
                  className={inputCls}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs mt-1 text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Referral Code */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                추천인 코드 <span className="font-normal text-slate-500">(선택)</span>
              </label>
              <div className="relative">
                <Gift size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("referralCode")}
                  type="text" placeholder="추천인 코드 (예: ABCD1234)"
                  className={inputCls + " uppercase"}
                />
              </div>
              <p className="text-xs mt-1 text-[#2dd4bf] font-medium">추천인이 있으면 1,000P 추가 적립!</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-slate-800 bg-[#2dd4bf] hover:shadow-xl hover:shadow-[#2dd4bf]/20 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> 가입 중...</> : "무료 회원가입"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-slate-500">
              이미 회원이신가요?{" "}
              <Link href="/auth/login" className="font-bold text-[#2dd4bf] hover:text-[#14b8a6] transition-colors">로그인</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8fffe]">
        <div className="text-[#2dd4bf]">로딩 중...</div>
      </div>
    }>
      <RegisterFormInner />
    </Suspense>
  );
}
