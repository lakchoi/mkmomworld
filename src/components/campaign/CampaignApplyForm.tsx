"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Phone, Mail, MessageSquare, Loader2, CheckCircle, ChevronDown } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

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
      if (!res.ok) { toast(json.error || "신청에 실패했습니다", "error"); return; }
      setSubmitted(true);
      setIsOpen(true);
      toast("캠페인 신청이 완료되었습니다! 🎉", "success");
      reset();
    } catch {
      toast("서버 오류가 발생했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full pl-10 pr-4 py-3 rounded-xl border border-[#ccfbf1] bg-white focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm transition-all text-slate-800 placeholder:text-slate-400";

  return (
    <div className="rounded-3xl overflow-hidden border border-[#ccfbf1] bg-white shadow-sm">
      {/* 아코디언 헤더 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f0fdfa] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2dd4bf] flex items-center justify-center text-white text-lg font-bold shadow-sm">
            ✍️
          </div>
          <div>
            <p className="font-bold text-slate-800 text-base">캠페인 참여 신청</p>
            <p className="text-xs text-slate-500 mt-0.5">버튼을 눌러 신청서를 작성하세요</p>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full bg-[#f0fdfa] border border-[#ccfbf1] flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={18} className="text-[#2dd4bf]" />
        </div>
      </button>

      {/* 아코디언 컨텐츠 */}
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: isOpen ? "800px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <div className="px-6 pb-6 border-t border-[#ccfbf1]">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="w-16 h-16 bg-[#f0fdfa] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#2dd4bf]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">신청 완료!</h3>
              <p className="text-slate-500 text-sm">캠페인 신청이 성공적으로 접수되었습니다.</p>
              <p className="text-slate-500 text-xs mt-1">검토 후 연락드리겠습니다.</p>
              <button
                onClick={() => { setSubmitted(false); setIsOpen(true); }}
                className="mt-5 px-6 py-2 rounded-full bg-[#2dd4bf] hover:bg-[#14b8a6] text-white font-semibold text-sm transition-colors"
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-5">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">이름 *</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register("name", { required: "이름을 입력해주세요" })} placeholder="홍길동" className={inputCls} />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">전화번호 *</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register("phone", { required: "전화번호를 입력해주세요", minLength: { value: 10, message: "올바른 전화번호를 입력해주세요" } })}
                    placeholder="010-0000-0000" className={inputCls} />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">이메일 *</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input {...register("email", { required: "이메일을 입력해주세요", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "올바른 이메일을 입력해주세요" } })}
                    type="email" placeholder="hello@example.com" className={inputCls} />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">신청 캠페인명 *</label>
                <input {...register("campaignName", { required: "캠페인명을 입력해주세요" })}
                  className="w-full px-4 py-3 rounded-xl border border-[#ccfbf1] bg-white focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm text-slate-800" />
                {errors.campaignName && <p className="text-xs text-red-500 mt-1">{errors.campaignName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                  메시지 <span className="text-slate-400 font-normal">(선택)</span>
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <textarea {...register("message")} placeholder="신청 동기나 하고 싶은 말씀을 자유롭게 적어주세요"
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#ccfbf1] bg-white focus:outline-none focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 text-sm text-slate-800 resize-none placeholder:text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#2dd4bf] hover:bg-[#14b8a6] text-white font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2dd4bf]/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> 신청 중...</> : "참여 신청하기"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
