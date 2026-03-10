"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* ── 히어로 (배경 실사진) ── */}
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* 배경 실사진 (Unsplash - 함께 모인 손) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* 어두운 오버레이 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(15,25,39,0.92) 0%, rgba(15,25,39,0.82) 50%, rgba(15,25,39,0.60) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32 w-full">
          <div
            className="max-w-xl transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            {/* 상단 태그 */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
                MK MOMWORLD
              </span>
            </div>

            {/* 헤드라인 */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
              style={{ color: "#ffffff" }}
            >
              2000년대 감성,{" "}
              <span
                className="gradient-text"
                style={{ display: "inline-block" }}
              >
                함께
              </span>
              <br />
              하는 세상
            </h1>

            <p
              className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.70)" }}
            >
              과거의 순수함과 현재의 열정을 담아,
              <br />
              더 나은 미래를 함께 만들어갑니다.
            </p>

            {/* 버튼 2개 */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#dream"
                className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  backgroundColor: "#2dd4bf",
                  color: "#0f172a",
                  boxShadow: "0 4px 20px rgba(45,212,191,0.40)",
                }}
              >
                더 알아보기
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full border-2 transition-all hover:-translate-y-0.5"
                style={{
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.5)",
                  backgroundColor: "transparent",
                }}
              >
                참여하기 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
