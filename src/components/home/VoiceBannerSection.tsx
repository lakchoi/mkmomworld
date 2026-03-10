import Link from "next/link";

export function VoiceBannerSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* 군중 배경 사진 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1400&auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      {/* 어두운 오버레이 */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,20,35,0.72)" }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-6 py-16">
        {/* 민트 뱃지 */}
        <div className="flex justify-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(45,212,191,0.2)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.3)" }}
          >
            당신의 목소리가
          </span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
          style={{ color: "#ffffff" }}
        >
          당신의 목소리가
          <br />
          중요합니다
        </h2>
        <p
          className="text-base mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          맘월드는 시민의 목소리로 움직입니다.
          <br />
          더 안전하고 공정한 사회를 위해 함께해주세요.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
          style={{
            backgroundColor: "#2dd4bf",
            color: "#0f172a",
            boxShadow: "0 4px 20px rgba(45,212,191,0.40)",
          }}
        >
          참여하기
        </Link>
      </div>
    </section>
  );
}
