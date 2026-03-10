import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/home/HeroSection";
import { DreamSection } from "@/components/home/DreamSection";
import { VoiceBannerSection } from "@/components/home/VoiceBannerSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CampaignSection } from "@/components/home/CampaignSection";
import { CTASection } from "@/components/home/CTASection";

async function getHomeData() {
  const campaigns = await prisma.campaign.findMany({
    where: { isActive: true, isDisplayed: true },
    include: {
      category: true,
      _count: { select: { applications: true } },
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    take: 6,
  });
  return campaigns.map((c) => ({
    ...c,
    currentCount: c._count.applications,
  }));
}

export default async function HomePage() {
  const campaigns = await getHomeData();

  return (
    <div>
      {/* 1. 히어로 (배경 실사진 + 티커바) */}
      <HeroSection />

      {/* 2. 우리의 꿈 이야기 (실사진 3장) */}
      <DreamSection />

      {/* 3. 당신의 목소리가 중요합니다 (군중 배경사진) */}
      <VoiceBannerSection />

      {/* 4. 티커바 + 통계 (99명, 100대, 100%) */}
      <StatsSection />

      {/* 5. 5대 캠페인 섹션들 */}
      <CampaignSection campaigns={campaigns} />

      {/* 6. MK MOMWORLD CTA + FAQ + 참여 폼 */}
      <CTASection />
    </div>
  );
}
