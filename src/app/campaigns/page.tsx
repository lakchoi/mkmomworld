import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

async function getCampaigns() {
  return prisma.campaign.findMany({
    where: { isActive: true },
    include: {
      category: true,
      _count: { select: { applications: true } },
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

async function getCategories() {
  return prisma.campaignCategory.findMany({ orderBy: { name: "asc" } });
}

export default async function CampaignsPage() {
  const [campaigns, categories] = await Promise.all([getCampaigns(), getCategories()]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-orange-400 font-semibold text-sm mb-2">📢 참여 가능한 캠페인</p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">모든 캠페인</h1>
        <p className="text-stone-500 mt-2">엄마들을 위한 특별한 캠페인에 참여해보세요</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/campaigns"
          className="px-4 py-2 rounded-full text-sm font-medium bg-orange-500 text-white"
        >
          전체
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/campaigns?category=${cat.slug}`}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-orange-100 text-stone-600 hover:border-orange-300 hover:text-orange-500 transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Campaign grid */}
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
              className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 hover:-translate-y-1"
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
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-50">📢</div>
                )}
                {campaign.category && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-orange-500 px-3 py-1 rounded-full">
                    {campaign.category.name}
                  </div>
                )}
                {!campaign.isDisplayed && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="bg-white/90 text-stone-600 text-sm font-bold px-4 py-1.5 rounded-full">준비 중</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-stone-800 mb-2 line-clamp-1 group-hover:text-orange-500 transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-sm text-stone-500 line-clamp-2 mb-4 leading-relaxed">{campaign.summary}</p>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="text-xs bg-orange-50 text-orange-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{campaign._count.applications}명 신청</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-500 font-medium">
                    자세히 보기 <ArrowRight size={12} />
                  </div>
                </div>
                {campaign.maxParticipants && (
                  <div className="mt-3 h-1.5 bg-orange-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-stone-400">현재 진행 중인 캠페인이 없습니다</p>
        </div>
      )}
    </div>
  );
}
