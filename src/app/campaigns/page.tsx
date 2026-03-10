import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Target, MapPin } from "lucide-react";

async function getCampaigns() {
  return prisma.campaign.findMany({
    where: { isActive: true },
    include: { category: true, _count: { select: { applications: true } } },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}
const CAMPAIGN_META: Record<string, {
  icon: string;
  accent: string;
  bg: string;
  border: string;
  badgeText: string;
}> = {
  "safety-campaign":            { icon: "🛡️", accent: "#2dd4bf", bg: "rgba(45,212,191,0.08)", border: "rgba(45,212,191,0.25)", badgeText: "치안·안전" },
  "food-campaign":              { icon: "🥗", accent: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)", badgeText: "먹거리·건강" },
  "environment-campaign":       { icon: "🌿", accent: "#38bdf8", bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.25)", badgeText: "환경·미래" },
  "social-economy-campaign":    { icon: "📈", accent: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)", badgeText: "사회·경제" },
  "hospital-companion-campaign":{ icon: "🏥", accent: "#fb7185", bg: "rgba(251,113,133,0.08)", border: "rgba(251,113,133,0.25)", badgeText: "돌봄·동행" },
};

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1e293b" }}>

      {/* 페이지 헤더 */}
      <div
        className="border-b"
        style={{
          background: "linear-gradient(160deg, #0f1927 0%, #1e293b 60%)",
          borderColor: "#334155",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#2dd4bf]">
                  진행 중인 캠페인
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3" style={{ color: "#f1f5f9" }}>
                캠페인 목록
              </h1>
              <p className="text-base max-w-lg leading-relaxed" style={{ color: "#94a3b8" }}>
                맘월드의 5대 핵심 캠페인입니다.
                참여를 원하는 캠페인을 선택해 상세 내용을 확인하세요.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div
                className="flex items-center gap-2 backdrop-blur-sm rounded-2xl px-4 py-2.5 border"
                style={{ backgroundColor: "rgba(45,212,191,0.08)", borderColor: "rgba(45,212,191,0.2)" }}
              >
                <Target size={16} style={{ color: "#2dd4bf" }} />
                <span className="font-bold text-sm" style={{ color: "#e2e8f0" }}>{campaigns.length}개 캠페인</span>
              </div>
              <div
                className="flex items-center gap-2 backdrop-blur-sm rounded-2xl px-4 py-2.5 border"
                style={{ backgroundColor: "rgba(52,211,153,0.08)", borderColor: "rgba(52,211,153,0.2)" }}
              >
                <MapPin size={16} style={{ color: "#34d399" }} />
                <span className="font-bold text-sm" style={{ color: "#e2e8f0" }}>전국 참여 가능</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* 캠페인 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {campaigns.map((campaign, idx) => {
            const meta = CAMPAIGN_META[campaign.slug] || {
              icon: "📢", accent: "#2dd4bf",
              bg: "rgba(45,212,191,0.08)", border: "rgba(45,212,191,0.25)", badgeText: "캠페인",
            };
            const num = String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.slug}`}
                className="group block rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  backgroundColor: "#293548",
                  borderColor: meta.border,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.20)",
                }}
              >
                {/* 상단 컬러 배너 */}
                <div
                  className="relative h-44 flex flex-col items-center justify-center gap-2 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, #1e293b 0%, ${meta.bg.replace("0.08","0.25")} 100%)` }}
                >
                  {/* 번호 워터마크 */}
                  <span
                    className="absolute right-4 top-2 font-black text-7xl leading-none select-none opacity-10 tabular-nums"
                    style={{ color: meta.accent }}
                  >
                    {num}
                  </span>

                  {/* 아이콘 */}
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: "#1e293b",
                      border: `1px solid ${meta.border}`,
                      boxShadow: `0 8px 24px ${meta.accent}25`,
                    }}
                  >
                    {meta.icon}
                  </div>

                  {/* 배지 */}
                  <span
                    className="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{ backgroundColor: meta.accent, color: "#0f172a" }}
                  >
                    {meta.badgeText}
                  </span>
                </div>

                {/* 본문 */}
                <div className="p-5">
                  <h3 className="font-extrabold text-base mb-2 leading-snug transition-colors group-hover:text-[#2dd4bf]"
                    style={{ color: "#f1f5f9" }}>
                    {campaign.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2 mb-4" style={{ color: "#64748b" }}>
                    {campaign.summary}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#334155" }}>
                    <span className="text-xs font-medium" style={{ color: "#64748b" }}>
                      {campaign.category?.name || "캠페인"}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-bold"
                      style={{ color: meta.accent }}
                    >
                      자세히 보기 <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg" style={{ color: "#64748b" }}>현재 진행 중인 캠페인이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
