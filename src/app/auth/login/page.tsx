"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { toast } from "@/components/ui/Toaster";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

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

      login(json.user, json.token);
      toast(`환영합니다, ${json.user.name}님! 🌸`, "success");
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
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-orange-400 to-pink-500 px-8 py-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
              🌸
            </div>
            <h1 className="text-2xl font-bold">다시 만나요!</h1>
            <p className="text-white/80 text-sm mt-1">로그인하고 특별한 혜택을 누리세요</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                  이메일
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("email", {
                      required: "이메일을 입력해주세요",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "올바른 이메일을 입력해주세요" },
                    })}
                    type="email"
                    placeholder="hello@mkmomworld.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-1.5">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    {...register("password", { required: "비밀번호를 입력해주세요" })}
                    type={showPw ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-orange-300/50 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> 로그인 중...</> : "로그인"}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 text-center">
              <p className="text-sm text-stone-400">
                아직 회원이 아니신가요?{" "}
                <Link href="/auth/register" className="text-orange-500 font-bold hover:underline">
                  회원가입
                </Link>
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 p-3 bg-orange-50 rounded-xl">
              <p className="text-xs text-stone-500 font-medium mb-1">데모 계정</p>
              <p className="text-xs text-stone-400">관리자: admin@mkmomworld.com / admin1234!</p>
              <p className="text-xs text-stone-400">회원: test@mkmomworld.com / test1234!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
