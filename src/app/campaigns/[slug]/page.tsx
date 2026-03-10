import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CampaignDetail } from "@/components/campaign/CampaignDetail";
import { CampaignApplyForm } from "@/components/campaign/CampaignApplyForm";

async function getCampaign(slug: string) {
  return prisma.campaign.findFirst({
    where: { slug, isActive: true },
    include: {
      category: true,
      products: { where: { isActive: true }, include: { category: true } },
      _count: { select: { applications: true } },
    },
  });
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await getCampaign(slug);

  if (!campaign) notFound();

  return (
    <div style={{ backgroundColor: "#fffbf5", minHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <CampaignDetail campaign={campaign as any} />
        <div className="mt-12">
          <CampaignApplyForm campaignId={campaign.id} campaignTitle={campaign.title} />
        </div>
      </div>
    </div>
  );
}
