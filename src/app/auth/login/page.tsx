"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { toast } from "@/components/ui/Toaster";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        toast(json.error || "로그인에 실패했습니다", "error");
        return;
      }

      setUser(json.user);
      setToken(json.token);
      toast(`${json.user.name}님, 환영합니다! 🎉`, "success");
      router.push("/");
    } catch {
      toast("서버 오류가 발생했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} 로그인은 준비 중입니다`, "error");
  };

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
          <h1 className="text-2xl font-bold text-slate-800 mt-5 mb-1">로그인</h1>
          <p className="text-slate-500 text-sm">계정에 로그인하여 캠페인에 참여하세요</p>
        </div>

        {/* Form card */}
        <div className="bg-[#ffffff] rounded-3xl p-8 shadow-xl shadow-black/30 border border-[#ccfbf1]">
          {/* Social Login Buttons */}
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
              카카오로 로그인
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
              네이버로 로그인
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("구글")}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm text-stone-700 bg-[#ffffff] border border-[#ccfbf1] transition-all hover:border-stone-300 hover:shadow-md"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 로그인
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400 font-medium">또는 이메일로 로그인</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#ccfbf1] bg-[#ffffff] focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm text-slate-800 placeholder:text-slate-600 transition-all"
                />
              </div>
              {errors.email && <p className="text-xs mt-1 text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">비밀번호</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  {...register("password", { required: "비밀번호를 입력해주세요" })}
                  type={showPass ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#ccfbf1] bg-[#ffffff] focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm text-slate-800 placeholder:text-slate-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs mt-1 text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-slate-800 bg-[#2dd4bf] hover:shadow-xl hover:shadow-[#2dd4bf]/20 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> 로그인 중...</> : "로그인"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <span className="text-slate-500">계정이 없으신가요? </span>
            <Link href="/auth/register" className="font-bold text-[#2dd4bf] hover:text-[#14b8a6] transition-colors">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
