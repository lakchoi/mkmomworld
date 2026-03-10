import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#2dd4bf" }}
              >
                <span className="font-bold text-lg" style={{ color: "#0f172a" }}>M</span>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: "#f1f5f9" }}>MK MOMWORLD</p>
                <p className="text-xs" style={{ color: "#2dd4bf" }}>2000년대 감성, 함께하는 세상</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-5" style={{ color: "#64748b" }}>
              맘월드는 치안·먹거리·환경·사회경제·안전동행 5대 캠페인을 통해
              시민이 배우고 함께 움직이는 실행 플랫폼입니다.
            </p>
            <a
              href="mailto:mk.momworld@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#2dd4bf] transition-colors"
            >
              <Mail size={15} />
              mk.momworld@gmail.com
            </a>
          </div>

          {/* 5대 캠페인 */}
          <div>
            <h3 className="font-bold mb-4 text-sm" style={{ color: "#e2e8f0" }}>5대 캠페인</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/campaigns/safety-campaign", label: "🛡️ 치안 캠페인" },
                { href: "/campaigns/food-campaign", label: "🥗 먹거리 캠페인" },
                { href: "/campaigns/environment-campaign", label: "🌿 환경 캠페인" },
                { href: "/campaigns/social-economy-campaign", label: "📈 사회경제 캠페인" },
                { href: "/campaigns/hospital-companion-campaign", label: "🏥 병원동행 캠페인" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-slate-500 hover:text-[#2dd4bf] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 서비스 */}
          <div>
            <h3 className="font-bold mb-4 text-sm" style={{ color: "#e2e8f0" }}>서비스</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/auth/register", label: "회원가입" },
                { href: "/auth/login", label: "로그인" },
                { href: "/campaigns", label: "캠페인" },
                { href: "/#faq", label: "FAQ" },
                { href: "/#contact", label: "참여하기" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-slate-500 hover:text-[#2dd4bf] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderColor: "#334155" }}
        >
          <p className="text-xs text-slate-600">© 2026 MK MOMWORLD. 2000년대 감성, 함께하는 세상.</p>
          <p className="text-xs text-slate-600">📍 대한민국 서울시</p>
        </div>
      </div>
    </footer>
  );
}
