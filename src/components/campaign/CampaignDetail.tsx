import Link from "next/link";
import { Users, Calendar, Tag, ChevronLeft } from "lucide-react";
import { getGradeInfo } from "@/lib/grades";
import { UserRole } from "@prisma/client";

interface CampaignDetailProps {
  campaign: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;
    thumbnailImage: string | null;
    bannerImage: string | null;
    images: string;
    startDate: Date | null;
    endDate: Date | null;
    maxParticipants: number | null;
    currentCount: number;
    requiredGrade: UserRole;
    tags: string;
    category: { name: string } | null;
    products: Array<{
      id: string;
      name: string;
      basePrice: number;
      gradePrices: string;
      gradePointRates: string;
      images: string;
      description: string;
    }>;
    _count: { applications: number };
  };
}

export function CampaignDetail({ campaign }: CampaignDetailProps) {
  const tags = (() => { try { return JSON.parse(campaign.tags); } catch { return []; } })();
  const progressPct = campaign.maxParticipants
    ? Math.min(100, Math.round((campaign.currentCount / campaign.maxParticipants) * 100))
    : 0;
  const gradeInfo = getGradeInfo(campaign.requiredGrade);

  return (
    <article>
      {/* Back button */}
      <Link
        href="/campaigns"
        className="inline-flex items-center gap-2 text-stone-400 hover:text-orange-500 transition-colors text-sm mb-6"
      >
        <ChevronLeft size={16} />
        캠페인 목록으로
      </Link>

      {/* Banner image */}
      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-orange-100 to-pink-100">
        {campaign.bannerImage || campaign.thumbnailImage ? (
          <img
            src={campaign.bannerImage || campaign.thumbnailImage || ""}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-40">📢</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          {campaign.category && (
            <span className="text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">
              {campaign.category.name}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-bold mt-1">{campaign.title}</h1>
        </div>
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: <Users size={18} />,
            label: "신청 인원",
            value: `${campaign._count.applications}명`,
          },
          {
            icon: <span className="text-lg">{gradeInfo.emoji}</span>,
            label: "참여 조건",
            value: `${gradeInfo.name} 이상`,
          },
          {
            icon: <Calendar size={18} />,
            label: "마감 현황",
            value: campaign.maxParticipants
              ? `${progressPct}% (${campaign.currentCount}/${campaign.maxParticipants})`
              : "상시 모집",
          },
          {
            icon: <Tag size={18} />,
            label: "태그",
            value: tags.length > 0 ? tags[0] : "없음",
          },
        ].map((item, i) => (
          <div key={i} className="bg-orange-50 rounded-2xl p-4 flex flex-col gap-2">
            <div className="text-orange-400">{item.icon}</div>
            <p className="text-xs text-stone-400">{item.label}</p>
            <p className="font-bold text-stone-700 text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag: string, i: number) => (
            <span key={i} className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-50">
        <h2 className="text-xl font-bold text-stone-800 mb-4">캠페인 상세 안내</h2>
        <div
          className="prose prose-orange max-w-none text-stone-600 leading-relaxed"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {campaign.description.split("##").map((section, i) => {
            if (i === 0 && !section.trim()) return null;
            const lines = section.split("\n");
            const heading = lines[0];
            const content = lines.slice(1).join("\n").trim();
            return (
              <div key={i} className="mb-6">
                {heading && (
                  <h3 className="text-lg font-bold text-stone-800 mb-3">
                    {i === 0 ? heading : `## ${heading}`}
                  </h3>
                )}
                {content && (
                  <div className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Products */}
      {campaign.products.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-stone-800 mb-4">관련 상품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {campaign.products.map((product) => {
              const productImages = (() => { try { return JSON.parse(product.images); } catch { return []; } })();
              return (
                <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-orange-50 flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-orange-50 flex-shrink-0">
                    {productImages[0] ? (
                      <img src={productImages[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-800 text-sm truncate">{product.name}</h4>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">{product.description}</p>
                    <p className="text-orange-500 font-bold mt-2 text-sm">
                      ₩{product.basePrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
