import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Calendar, Tag } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnailImage: string | null;
  startDate: Date | null;
  endDate: Date | null;
  maxParticipants: number | null;
  currentCount: number;
  requiredGrade: string;
  tags: string;
  category: { name: string } | null;
  _count: { applications: number };
}

interface CampaignSectionProps {
  campaigns: Campaign[];
}

export function CampaignSection({ campaigns }: CampaignSectionProps) {
  return (
    <section className="py-16 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-orange-400 font-semibold text-sm mb-2">📢 현재 진행 중</p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800">
              인기 캠페인
            </h2>
            <p className="text-stone-500 mt-2">엄마들이 사랑하는 특별한 캠페인들을 만나보세요</p>
          </div>
          <Link
            href="/campaigns"
            className="hidden md:flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all"
          >
            전체 보기 <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => {
            const tags = (() => { try { return JSON.parse(campaign.tags); } catch { return []; } })();
            const progressPct = campaign.maxParticipants
              ? Math.min(100, Math.round((campaign.currentCount / campaign.maxParticipants) * 100))
              : 0;

            return (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 hover:-translate-y-1 campaign-card"
              >
                {/* Thumbnail */}
                <div className="relative h-52 bg-gradient-to-br from-orange-100 to-pink-100 overflow-hidden">
                  {campaign.thumbnailImage ? (
                    <img
                      src={campaign.thumbnailImage}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-50">
                      📢
                    </div>
                  )}
                  {campaign.category && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-orange-500 px-3 py-1 rounded-full">
                      {campaign.category.name}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    참여중
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-stone-800 text-base mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                    {campaign.summary}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats row */}
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{campaign._count.applications}명 신청</span>
                    </div>
                    {campaign.maxParticipants && (
                      <div className="flex items-center gap-1">
                        <span className="text-orange-400 font-medium">{progressPct}% 마감</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  {campaign.maxParticipants && (
                    <div className="mt-3 h-1.5 bg-orange-50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transition-all"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 bg-white text-orange-500 border-2 border-orange-200 font-semibold px-6 py-2.5 rounded-full hover:bg-orange-50 transition-colors"
          >
            전체 캠페인 보기 <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
