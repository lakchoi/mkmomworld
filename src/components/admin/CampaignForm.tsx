"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { toast } from "@/components/ui/Toaster";

interface CampaignFormData {
  title: string;
  slug: string;
  summary: string;
  description: string;
  thumbnailImage: string;
  bannerImage: string;
  isActive: boolean;
  isDisplayed: boolean;
  displayOrder: number;
  maxParticipants: number;
  requiredGrade: string;
  tags: string;
  startDate: string;
  endDate: string;
}

interface CampaignFormProps {
  campaign?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export function CampaignForm({ campaign, onClose, onSuccess }: CampaignFormProps) {
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CampaignFormData>({
    defaultValues: campaign ? {
      title: campaign.title,
      slug: campaign.slug,
      summary: campaign.summary,
      description: campaign.description,
      thumbnailImage: campaign.thumbnailImage || "",
      bannerImage: campaign.bannerImage || "",
      isActive: campaign.isActive,
      isDisplayed: campaign.isDisplayed,
      displayOrder: campaign.displayOrder,
      maxParticipants: campaign.maxParticipants || "",
      requiredGrade: campaign.requiredGrade,
      tags: (() => { try { return JSON.parse(campaign.tags).join(", "); } catch { return ""; } })(),
      startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().slice(0, 10) : "",
      endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().slice(0, 10) : "",
    } : {
      isActive: true,
      isDisplayed: true,
      displayOrder: 0,
      requiredGrade: "GRADE1",
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    setLoading(true);
    try {
      const tags = data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
      const payload = {
        ...data,
        tags,
        maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : null,
        displayOrder: Number(data.displayOrder),
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      };

      const url = campaign ? `/api/campaigns/${campaign.id}` : "/api/campaigns";
      const method = campaign ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        toast(json.error || "저장에 실패했습니다", "error");
        return;
      }

      toast(campaign ? "캠페인이 수정되었습니다!" : "새 캠페인이 생성되었습니다!", "success");
      onSuccess();
    } catch {
      toast("서버 오류가 발생했습니다", "error");
    } finally {
      setLoading(false);
    }
  };

  const gradeOptions = [
    { value: "GRADE1", label: "🌱 씨앗 (1등급)" },
    { value: "GRADE2", label: "🌿 새싹 (2등급)" },
    { value: "GRADE3", label: "🌳 나무 (3등급)" },
    { value: "GRADE4", label: "🍎 열매 (4등급)" },
    { value: "GRADE5", label: "🌲 숲 (5등급)" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      <div className="flex items-center justify-between bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-4">
        <h3 className="text-white font-bold text-lg">
          {campaign ? "캠페인 수정" : "새 캠페인 추가"}
        </h3>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">캠페인 제목 *</label>
            <input
              {...register("title", { required: "제목을 입력해주세요" })}
              placeholder="캠페인 제목"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">슬러그 (URL)</label>
            <input
              {...register("slug")}
              placeholder="campaign-slug (자동생성)"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Display order */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">표시 순서</label>
            <input
              {...register("displayOrder")}
              type="number"
              placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Summary */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">짧은 설명 (썸네일용) *</label>
            <textarea
              {...register("summary", { required: "짧은 설명을 입력해주세요" })}
              placeholder="메인페이지에 표시될 짧은 설명"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm resize-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">상세 내용 *</label>
            <textarea
              {...register("description", { required: "상세 내용을 입력해주세요" })}
              placeholder="캠페인 상세 내용 (마크다운 지원)"
              rows={8}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm resize-none font-mono"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">썸네일 이미지 URL</label>
            <input
              {...register("thumbnailImage")}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Banner */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">배너 이미지 URL</label>
            <input
              {...register("bannerImage")}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Required grade */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">참여 조건 등급</label>
            <select
              {...register("requiredGrade")}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            >
              {gradeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Max participants */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">최대 참여자 수 (미입력 시 제한 없음)</label>
            <input
              {...register("maxParticipants")}
              type="number"
              placeholder="100"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Start date */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">시작일</label>
            <input
              {...register("startDate")}
              type="date"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* End date */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">종료일</label>
            <input
              {...register("endDate")}
              type="date"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-stone-600 mb-1.5">태그 (쉼표로 구분)</label>
            <input
              {...register("tags")}
              placeholder="스킨케어, 뷰티, 봄캠페인"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register("isActive")} type="checkbox" className="w-4 h-4 accent-orange-500" />
              <span className="text-sm font-medium text-stone-600">활성화</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input {...register("isDisplayed")} type="checkbox" className="w-4 h-4 accent-orange-500" />
              <span className="text-sm font-medium text-stone-600">메인 표시</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border-2 border-stone-200 text-stone-600 font-semibold hover:border-stone-300 transition-colors text-sm"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold hover:shadow-lg hover:shadow-orange-300/50 transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> 저장 중...</> : campaign ? "수정 완료" : "캠페인 생성"}
          </button>
        </div>
      </form>
    </div>
  );
}
