import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/home/HeroSection";
import { CampaignSection } from "@/components/home/CampaignSection";
import { GradeSection } from "@/components/home/GradeSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";

async function getHomeData() {
  const [campaigns, stats] = await Promise.all([
    prisma.campaign.findMany({
      where: { isActive: true, isDisplayed: true },
      include: {
        category: true,
        _count: { select: { applications: true } },
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  return { campaigns, userCount: stats };
}

export default async function HomePage() {
  const { campaigns, userCount } = await getHomeData();

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <StatsSection userCount={userCount} campaignCount={campaigns.length} />
      <CampaignSection campaigns={campaigns} />
      <GradeSection />
      <CTASection />
    </div>
  );
}
