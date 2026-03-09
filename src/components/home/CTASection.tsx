import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-400 via-rose-400 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-5 left-10 text-8xl">🌸</div>
        <div className="absolute top-10 right-20 text-6xl">⭐</div>
        <div className="absolute bottom-5 left-1/3 text-7xl">🌿</div>
        <div className="absolute bottom-10 right-10 text-5xl">💝</div>
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          지금 바로 시작해보세요!
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto">
          MK Mom World 회원이 되면 다양한 캠페인 참여 기회와
          특별한 혜택이 기다리고 있어요. 🎁
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-white text-orange-500 font-bold px-8 py-3.5 rounded-full hover:shadow-xl hover:shadow-black/20 transition-all hover:-translate-y-0.5"
          >
            무료 회원가입
          </Link>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 font-bold px-8 py-3.5 rounded-full hover:bg-white/30 transition-all"
          >
            캠페인 둘러보기
          </Link>
        </div>
        <p className="mt-5 text-sm text-white/70">
          회원가입 시 추천인 코드를 입력하면 추가 혜택이 있어요!
        </p>
      </div>
    </section>
  );
}
