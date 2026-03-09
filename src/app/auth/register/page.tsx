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

function RegisterForm() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50/30 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 px-8 py-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
              🌱
            </div>
            <h1 className="text-2xl font-bold">함께 시작해요!</h1>
            <p className="text-white/80 text-sm mt-1">MK Mom World에 오신 것을 환영합니다</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">이름</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("name", { required: "이름을 입력해주세요", minLength: { value: 2, message: "이름은 2자 이상이어야 합니다" } })}
                    type="text" placeholder="홍길동"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">이메일</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("email", {
                      required: "이메일을 입력해주세요",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "올바른 이메일을 입력해주세요" },
                    })}
                    type="email" placeholder="hello@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">전화번호 <span className="text-stone-300 font-normal">(선택)</span></label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("phone")}
                    type="tel" placeholder="010-0000-0000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">비밀번호</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("password", {
                      required: "비밀번호를 입력해주세요",
                      minLength: { value: 8, message: "비밀번호는 8자 이상이어야 합니다" },
                    })}
                    type={showPw ? "text" : "password"} placeholder="8자 이상 입력"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">비밀번호 확인</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("confirmPassword", {
                      required: "비밀번호 확인을 입력해주세요",
                      validate: (v) => v === password || "비밀번호가 일치하지 않습니다",
                    })}
                    type={showPw ? "text" : "password"} placeholder="비밀번호 재입력"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {/* Referral Code */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                  추천인 코드 <span className="text-stone-300 font-normal">(선택)</span>
                </label>
                <div className="relative">
                  <Gift size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("referralCode")}
                    type="text" placeholder="추천인 코드 (예: ABCD1234)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all uppercase"
                  />
                </div>
                <p className="text-xs text-orange-400 mt-1">추천인이 있으면 1,000P 추가 적립!</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-orange-300/50 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> 가입 중...</> : "무료 회원가입"}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-sm text-stone-400">
                이미 회원이신가요?{" "}
                <Link href="/auth/login" className="text-orange-500 font-bold hover:underline">로그인</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-orange-400">로딩 중...</div></div>}>
      <RegisterForm />
    </Suspense>
  );
}
