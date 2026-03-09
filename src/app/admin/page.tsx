import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

async function getAdminStats() {
  const [
    totalUsers, totalCampaigns, totalApplications, totalOrders,
    recentUsers, campaigns, recentApplications,
    gradeStats,
  ] = await Promise.all([
    prisma.user.count({ where: { isActive: true } }),
    prisma.campaign.count({ where: { isActive: true } }),
    prisma.campaignApplication.count(),
    prisma.order.count(),
    prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true, name: true, email: true, role: true, referralCode: true,
        totalPoints: true, isActive: true, createdAt: true,
        _count: { select: { referrals: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.campaign.findMany({
      where: { isActive: true },
      include: { category: true, _count: { select: { applications: true } } },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.campaignApplication.findMany({
      include: { campaign: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
    }),
  ]);

  return {
    stats: { totalUsers, totalCampaigns, totalApplications, totalOrders },
    recentUsers,
    campaigns,
    recentApplications,
    gradeStats,
  };
}

export default async function AdminPage() {
  const data = await getAdminStats();
  return <AdminDashboard data={data as any} />;
}
