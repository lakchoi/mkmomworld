"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { getGradeInfo } from "@/lib/grades";
import { UserRole } from "@prisma/client";
import { Copy, Check, User, Gift, Star, Share2 } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export default function MyPage() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [pointHistory, setPointHistory] = useState<any[]>([]);
  const [loadingPoints, setLoadingPoints] = useState(false);

  useEffect(() => {
    if (!user) { router.push("/auth/login"); }
  }, [user, router]);

  const gradeInfo = user ? getGradeInfo(user.role as UserRole) : null;

  const copyReferralLink = () => {
    const link = `${window.location.origin}/auth/register?ref=${user?.referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast("추천 링크가 복사되었습니다! 🎉", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user || !gradeInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#2dd4bf]">로딩 중...</div>
      </div>
    );
  }

  const grades = ["GRADE1", "GRADE2", "GRADE3", "GRADE4", "GRADE5"] as UserRole[];
  const currentGradeIndex = grades.indexOf(user.role as UserRole);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile header */}
      <div className="bg-[#2dd4bf] rounded-3xl p-6 md:p-8 text-slate-800 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-[#ffffff]/20 flex items-center justify-center text-4xl">
            {gradeInfo.emoji}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-slate-800/80 text-sm">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-[#ffffff]/20 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
                {gradeInfo.emoji} {gradeInfo.name} 등급
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-800/70 text-xs">보유 포인트</p>
            <p className="text-3xl font-bold">{user.totalPoints?.toLocaleString()}P</p>
          </div>
        </div>

        {/* Grade progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-800/70">등급 현황</p>
          </div>
          <div className="flex items-center gap-1">
            {grades.map((g, i) => {
              const gi = getGradeInfo(g);
              return (
                <div
                  key={g}
                  className={`flex-1 h-2 rounded-full ${
                    i <= currentGradeIndex ? "bg-[#ffffff]" : "bg-[#ffffff]/20"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-xs text-slate-800/70">🌱 씨앗</span>
            <span className="text-xs text-slate-800/70">🌲 숲</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade benefits */}
        <div className="bg-[#ffffff] rounded-3xl p-6 shadow-sm border border-[#ccfbf1]">
          <h2 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
            <Star size={18} className="text-[#2dd4bf]" />
            내 등급 혜택
          </h2>
          <div className={`p-4 rounded-2xl ${gradeInfo.bgColor} mb-4`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{gradeInfo.emoji}</span>
              <div>
                <p className={`font-bold ${gradeInfo.color}`}>{gradeInfo.name} 등급</p>
                <p className="text-sm text-stone-500">{gradeInfo.description}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">할인율</span>
              <span className="font-bold text-stone-700">
                {gradeInfo.discountRate > 0 ? `-${gradeInfo.discountRate}%` : "기본가"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">포인트 적립률</span>
              <span className="font-bold text-[#2dd4bf]">{gradeInfo.pointRate}%</span>
            </div>
          </div>
        </div>

        {/* Referral */}
        <div className="bg-[#ffffff] rounded-3xl p-6 shadow-sm border border-[#ccfbf1]">
          <h2 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
            <Gift size={18} className="text-[#2dd4bf]" />
            추천인 코드
          </h2>
          <div className="bg-[#ffffff] rounded-2xl p-4 mb-4">
            <p className="text-xs text-stone-400 mb-1">나의 추천 코드</p>
            <p className="text-2xl font-mono font-bold text-[#2dd4bf] tracking-widest">
              {user.referralCode}
            </p>
          </div>
          <button
            onClick={copyReferralLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2dd4bf] text-slate-800 font-semibold text-sm hover:shadow-lg hover:shadow-[#2dd4bf]/20 transition-all"
          >
            {copied ? <><Check size={16} /> 복사됨!</> : <><Copy size={16} /> 추천 링크 복사</>}
          </button>
          <p className="text-xs text-stone-400 text-center mt-2">
            추천 성공 시 1,000P 적립!
          </p>
        </div>

        {/* Grade list */}
        <div className="md:col-span-2 bg-[#ffffff] rounded-3xl p-6 shadow-sm border border-[#ccfbf1]">
          <h2 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
            <User size={18} className="text-[#2dd4bf]" />
            등급 안내
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {grades.map((g, i) => {
              const gi = getGradeInfo(g);
              const isCurrentOrPast = i <= currentGradeIndex;
              const isCurrent = i === currentGradeIndex;
              return (
                <div
                  key={g}
                  className={`relative p-4 rounded-2xl text-center border-2 transition-all ${
                    isCurrent
                      ? `${gi.bgColor} border-[#2dd4bf]/50 shadow-md`
                      : isCurrentOrPast
                      ? "bg-stone-50 border-stone-100"
                      : "bg-[#ffffff] border-stone-100 opacity-50"
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#ffffff]0 text-slate-800 text-xs px-2 py-0.5 rounded-full font-bold">
                      현재
                    </div>
                  )}
                  <div className="text-2xl mb-1">{gi.emoji}</div>
                  <p className={`text-xs font-bold ${isCurrent ? gi.color : "text-stone-400"}`}>
                    {gi.name}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">적립 {gi.pointRate}%</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
