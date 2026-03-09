"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { getGradeInfo } from "@/lib/grades";
import { UserRole } from "@prisma/client";
import { useAuthStore } from "@/lib/store";
import { toast } from "@/components/ui/Toaster";

interface UserManagementProps {
  initialUsers: any[];
}

const roleOptions = [
  { value: "", label: "전체 등급" },
  { value: "ADMIN", label: "👑 관리자" },
  { value: "GRADE1", label: "🌱 씨앗 (1등급)" },
  { value: "GRADE2", label: "🌿 새싹 (2등급)" },
  { value: "GRADE3", label: "🌳 나무 (3등급)" },
  { value: "GRADE4", label: "🍎 열매 (4등급)" },
  { value: "GRADE5", label: "🌲 숲 (5등급)" },
];

export function UserManagement({ initialUsers }: UserManagementProps) {
  const { token } = useAuthStore();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterRole) params.set("role", filterRole);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) setUsers(json.users);
    } catch {
      toast("회원 목록을 불러오지 못했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      const json = await res.json();
      if (!res.ok) { toast(json.error || "수정 실패", "error"); return; }
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role } : u));
      toast("등급이 변경되었습니다", "success");
    } catch {
      toast("오류가 발생했습니다", "error");
    }
  };

  const toggleUserActive = async (userId: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, isActive: !isActive } : u));
        toast(isActive ? "계정이 비활성화되었습니다" : "계정이 활성화되었습니다", "success");
      }
    } catch {
      toast("오류가 발생했습니다", "error");
    }
  };

  const getReferralLink = (code: string) => `${window.location.origin}/auth/register?ref=${code}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-800">회원 관리</h2>
        <span className="text-sm text-stone-400">{users.length}명</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
            placeholder="이름 또는 이메일 검색"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 text-sm"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => { setFilterRole(e.target.value); }}
          className="px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 text-sm"
        >
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-orange-100 text-orange-600 font-medium hover:bg-orange-200 transition-colors text-sm"
        >
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-orange-50 text-xs font-semibold text-stone-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">회원</th>
                <th className="px-4 py-3 text-left">등급</th>
                <th className="px-4 py-3 text-left">포인트</th>
                <th className="px-4 py-3 text-left">추천</th>
                <th className="px-4 py-3 text-left">추천링크</th>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">가입일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {users.map((user) => {
                const gradeInfo = getGradeInfo(user.role as UserRole);
                return (
                  <tr key={user.id} className="hover:bg-orange-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-stone-700">{user.name}</p>
                      <p className="text-xs text-stone-400">{user.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 ${gradeInfo.bgColor} ${gradeInfo.color} cursor-pointer`}
                      >
                        {roleOptions.filter(o => o.value).map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-orange-500">
                      {user.totalPoints?.toLocaleString()}P
                    </td>
                    <td className="px-4 py-3 text-sm text-stone-500">
                      {user._count?.referrals || 0}명
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          const link = `${window.location.origin}/auth/register?ref=${user.referralCode}`;
                          navigator.clipboard.writeText(link);
                          toast("추천링크가 복사되었습니다!", "success");
                        }}
                        className="text-xs text-orange-500 hover:underline font-mono"
                      >
                        {user.referralCode}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleUserActive(user.id, user.isActive)}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          user.isActive ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-red-50 text-red-500 hover:bg-red-100"
                        } transition-colors`}
                      >
                        {user.isActive ? "활성" : "비활성"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-stone-400">
                      {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
