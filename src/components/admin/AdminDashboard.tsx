"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Megaphone, FileText, ShoppingBag, Plus, Settings, Crown, Edit, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { getGradeInfo } from "@/lib/grades";
import { UserRole } from "@prisma/client";
import { CampaignForm } from "@/components/admin/CampaignForm";
import { UserManagement } from "@/components/admin/UserManagement";

interface AdminDashboardProps {
  data: {
    stats: { totalUsers: number; totalCampaigns: number; totalApplications: number; totalOrders: number };
    recentUsers: any[];
    campaigns: any[];
    recentApplications: any[];
    gradeStats: any[];
  };
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "users" | "applications">("overview");
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);

  const tabs = [
    { id: "overview", label: "대시보드", icon: <Settings size={16} /> },
    { id: "campaigns", label: "캠페인 관리", icon: <Megaphone size={16} /> },
    { id: "users", label: "회원 관리", icon: <Users size={16} /> },
    { id: "applications", label: "신청 현황", icon: <FileText size={16} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Crown size={20} className="text-purple-500" />
            <h1 className="text-2xl font-bold text-stone-800">관리자 대시보드</h1>
          </div>
          <p className="text-slate-500 text-sm">MK Mom World 관리 페이지입니다</p>
        </div>
        <Link href="/" className="text-sm text-slate-500 hover:text-[#2dd4bf] transition-colors">
          사이트 보기 →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#ffffff] p-1 rounded-2xl mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-white text-[#2dd4bf] shadow-sm"
                : "text-slate-500 hover:text-[#2dd4bf]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Users size={20} />, label: "총 회원수", value: data.stats.totalUsers, color: "from-[#38bdf8] to-[#2dd4bf]" },
              { icon: <Megaphone size={20} />, label: "진행 캠페인", value: data.stats.totalCampaigns, color: "from-[#2dd4bf] to-[#14b8a6]" },
              { icon: <FileText size={20} />, label: "총 신청수", value: data.stats.totalApplications, color: "from-green-400 to-emerald-500" },
              { icon: <ShoppingBag size={20} />, label: "총 주문수", value: data.stats.totalOrders, color: "from-[#a78bfa] to-[#2dd4bf]" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#ccfbf1]">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-slate-800 mb-3`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Grade stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ccfbf1]">
            <h3 className="font-bold text-stone-800 mb-4">등급별 회원 분포</h3>
            <div className="flex flex-wrap gap-3">
              {data.gradeStats.map((gs: any) => {
                const gradeInfo = getGradeInfo(gs.role as UserRole);
                return (
                  <div key={gs.role} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${gradeInfo.bgColor}`}>
                    <span className="text-lg">{gradeInfo.emoji}</span>
                    <div>
                      <p className={`text-sm font-bold ${gradeInfo.color}`}>{gradeInfo.name}</p>
                      <p className="text-xs text-slate-500">{gs._count.role}명</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent applications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ccfbf1]">
            <h3 className="font-bold text-stone-800 mb-4">최근 캠페인 신청</h3>
            <div className="space-y-3">
              {data.recentApplications.slice(0, 5).map((app: any) => (
                <div key={app.id} className="flex items-center justify-between py-2 border-b border-[#ccfbf1] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-stone-700">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.campaign?.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      app.status === "APPROVED" ? "bg-green-50 text-green-600" :
                      app.status === "REJECTED" ? "bg-red-50 text-red-500" :
                      "bg-[#ffffff] text-[#2dd4bf]"
                    }`}>
                      {app.status === "APPROVED" ? "승인" : app.status === "REJECTED" ? "거절" : "대기"}
                    </span>
                    <p className="text-xs text-slate-500">
                      {new Date(app.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-800">캠페인 관리</h2>
            <button
              onClick={() => { setEditingCampaign(null); setShowCampaignForm(true); }}
              className="flex items-center gap-2 bg-[#2dd4bf] text-slate-800 font-semibold px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-[#2dd4bf]/20 transition-all text-sm"
            >
              <Plus size={16} />
              새 캠페인 추가
            </button>
          </div>

          {showCampaignForm && (
            <div className="mb-6">
              <CampaignForm
                campaign={editingCampaign}
                onClose={() => setShowCampaignForm(false)}
                onSuccess={() => { setShowCampaignForm(false); window.location.reload(); }}
              />
            </div>
          )}

          <div className="space-y-4">
            {data.campaigns.map((campaign: any) => (
              <div key={campaign.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#ccfbf1]">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-[#ffffff] flex-shrink-0">
                    {campaign.thumbnailImage ? (
                      <img src={campaign.thumbnailImage} alt={campaign.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📢</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-stone-800 text-sm">{campaign.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                        {campaign.isActive ? "활성" : "비활성"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${campaign.isDisplayed ? "bg-blue-50 text-blue-600" : "bg-stone-50 text-slate-500"}`}>
                        {campaign.isDisplayed ? "표시" : "숨김"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{campaign.summary}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span>신청 {campaign._count.applications}명</span>
                      <span>순서 #{campaign.displayOrder}</span>
                      {campaign.category && <span>{campaign.category.name}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/campaigns/${campaign.slug}`}
                      className="p-2 text-slate-500 hover:text-[#2dd4bf] hover:bg-[#ffffff] rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                    </Link>
                    <button
                      onClick={() => { setEditingCampaign(campaign); setShowCampaignForm(true); }}
                      className="p-2 text-slate-500 hover:text-[#2dd4bf] hover:bg-[#ffffff] rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <UserManagement initialUsers={data.recentUsers} />
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div>
          <h2 className="text-xl font-bold text-stone-800 mb-6">캠페인 신청 현황</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-[#ccfbf1] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#ffffff] text-xs font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">신청자</th>
                    <th className="px-4 py-3 text-left">캠페인</th>
                    <th className="px-4 py-3 text-left">연락처</th>
                    <th className="px-4 py-3 text-left">상태</th>
                    <th className="px-4 py-3 text-left">신청일</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {data.recentApplications.map((app: any) => (
                    <tr key={app.id} className="hover:bg-[#ffffff]/50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-stone-700">{app.name}</p>
                        <p className="text-xs text-slate-500">{app.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-stone-600">{app.campaign?.title}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{app.phone}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          app.status === "APPROVED" ? "bg-green-50 text-green-600" :
                          app.status === "REJECTED" ? "bg-red-50 text-red-500" :
                          "bg-[#ffffff] text-[#2dd4bf]"
                        }`}>
                          {app.status === "APPROVED" ? "승인" : app.status === "REJECTED" ? "거절" : "대기"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {new Date(app.createdAt).toLocaleDateString("ko-KR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
