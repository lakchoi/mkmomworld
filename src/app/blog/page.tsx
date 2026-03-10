import Link from "next/link";
import { BookOpen, PenLine } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <p className="text-[#2dd4bf] font-semibold text-sm mb-2">📝 이야기 나누기</p>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800">블로그</h1>
        <p className="text-stone-500 mt-2">엄마들의 소중한 이야기와 유용한 정보를 나눠요</p>
      </div>

      <div className="flex items-center justify-center py-20 flex-col gap-4">
        <div className="w-24 h-24 rounded-3xl bg-[#ffffff] flex items-center justify-center">
          <BookOpen size={40} className="text-[#14b8a6]" />
        </div>
        <h2 className="text-xl font-bold text-stone-600">블로그 준비 중이에요</h2>
        <p className="text-stone-400 text-center max-w-sm">
          곧 다양한 이야기와 유용한 정보로 찾아올게요. 조금만 기다려주세요! 🌸
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2.5 rounded-full bg-[#ffffff]0 text-slate-800 font-semibold hover:bg-[#14b8a6] transition-colors text-sm"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
