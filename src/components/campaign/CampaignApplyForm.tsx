"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Phone, Mail, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { toast } from "@/components/ui/Toaster";

interface ApplyForm {
  name: string;
  phone: string;
  email: string;
  campaignName: string;
  message: string;
}

interface CampaignApplyFormProps {
  campaignId: string;
  campaignTitle: string;
}

export function CampaignApplyForm({ campaignId, campaignTitle }: CampaignApplyFormProps) {
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplyForm>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      campaignName: campaignTitle,
    },
  });

  const onSubmit = async (data: ApplyForm) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        toast(json.error || "신청에 실패했습니다", "error");
        return;
      }

      setSubmitted(true);
      toast("캠페인 신청이 완료되었습니다! 🎉", "success");
      reset();
    } catch {
      toast("서버 오류가 발생했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center border border-green-100">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-stone-800 mb-2">신청 완료!</h3>
        <p className="text-stone-500">캠페인 신청이 성공적으로 접수되었습니다.</p>
        <p className="text-sm text-stone-400 mt-2">검토 후 연락드리겠습니다.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 px-6 py-2.5 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors text-sm"
        >
          다시 신청하기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-orange-50 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-6 text-white">
        <h2 className="text-xl font-bold">캠페인 신청하기</h2>
        <p className="text-white/80 text-sm mt-1">아래 정보를 입력하고 캠페인에 참여해보세요</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">이름 *</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              {...register("name", { required: "이름을 입력해주세요" })}
              placeholder="홍길동"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
            />
          </div>
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">전화번호 *</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              {...register("phone", {
                required: "전화번호를 입력해주세요",
                minLength: { value: 10, message: "올바른 전화번호를 입력해주세요" },
              })}
              placeholder="010-0000-0000"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">이메일 *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "올바른 이메일을 입력해주세요" },
              })}
              type="email"
              placeholder="hello@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Campaign name */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">신청 캠페인명 *</label>
          <input
            {...register("campaignName", { required: "신청 캠페인명을 입력해주세요" })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all"
          />
          {errors.campaignName && <p className="text-xs text-red-500 mt-1">{errors.campaignName.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-stone-600 mb-1.5">
            메시지 <span className="text-stone-300 font-normal">(선택)</span>
          </label>
          <div className="relative">
            <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-stone-400" />
            <textarea
              {...register("message")}
              placeholder="신청 동기나 하고 싶은 말씀을 자유롭게 적어주세요"
              rows={3}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm transition-all resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-orange-300/50 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> 신청 중...</> : "🎀 캠페인 신청하기"}
        </button>
      </form>
    </div>
  );
}
