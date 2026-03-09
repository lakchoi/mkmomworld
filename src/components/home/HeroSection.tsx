"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50/50 to-amber-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-gradient-to-l from-pink-300 to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-56 h-56 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles size={14} />
              엄마들을 위한 특별한 공간
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight mb-6">
              함께하는{" "}
              <span className="gradient-text">엄마들의</span>
              <br />
              특별한 세상
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed mb-8 max-w-md">
              MK Mom World에서 다양한 캠페인에 참여하고,
              특별한 혜택과 포인트를 누려보세요.
              엄마들을 위한 모든 것이 여기에 있습니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold px-6 py-3 rounded-full hover:shadow-xl hover:shadow-orange-300/50 transition-all hover:-translate-y-0.5"
              >
                캠페인 참여하기
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-white text-orange-500 border-2 border-orange-200 font-bold px-6 py-3 rounded-full hover:border-orange-400 hover:shadow-lg hover:shadow-orange-100 transition-all"
              >
                무료 회원가입
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-6 mt-10">
              {[
                { emoji: "👩", label: "활성 회원" },
                { emoji: "📢", label: "진행 캠페인" },
                { emoji: "🎁", label: "파트너사" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xl">{stat.emoji}</span>
                  <span className="text-xs text-stone-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative hidden md:block">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-orange-200/50 overflow-hidden">
                <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                      🌸
                    </div>
                    <div>
                      <p className="text-sm opacity-80">MK Mom World</p>
                      <p className="font-bold text-lg">엄마의 특별한 혜택</p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <p className="text-xs opacity-80">보유 포인트</p>
                    <p className="text-3xl font-bold mt-1">12,450P</p>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: "🌿", text: "새싹 → 나무 등급 승급!", color: "bg-green-50 text-green-600" },
                    { icon: "🎀", text: "봄맞이 스킨케어 캠페인 당첨", color: "bg-pink-50 text-pink-600" },
                    { icon: "💰", text: "추천인 보너스 1,000P 적립", color: "bg-amber-50 text-amber-600" },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.color}`}>
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-2 rounded-2xl shadow-lg text-sm font-bold">
                🌟 인기 캠페인
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-2 border border-orange-100">
                <p className="text-xs text-stone-500">신규 회원 혜택</p>
                <p className="text-sm font-bold text-orange-500">500P 지급!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
