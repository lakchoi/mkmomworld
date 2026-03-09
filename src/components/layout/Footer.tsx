import Link from "next/link";
import { Heart, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-orange-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xl">🌸</span>
              </div>
              <div>
                <p className="font-bold text-lg bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  MK Mom World
                </p>
                <p className="text-xs text-orange-400">엄마들의 특별한 세상</p>
              </div>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
              MK Mom World는 엄마들을 위한 특별한 커뮤니티입니다.
              다양한 캠페인과 혜택으로 더 행복한 일상을 만들어드립니다.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-400 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-400 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                <Youtube size={16} />
              </a>
              <a href="mailto:hello@mkmomworld.com" className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-400 hover:bg-orange-100 hover:text-orange-500 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-stone-700 mb-4">서비스</h3>
            <ul className="space-y-2">
              {[
                { href: "/campaigns", label: "캠페인" },
                { href: "/shop", label: "쇼핑" },
                { href: "/blog", label: "블로그" },
                { href: "/auth/register", label: "회원가입" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-stone-700 mb-4">회사정보</h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "회사 소개" },
                { href: "/terms", label: "이용약관" },
                { href: "/privacy", label: "개인정보처리방침" },
                { href: "/contact", label: "문의하기" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-orange-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-orange-50 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-stone-400">
            © 2024 MK Mom World. All rights reserved.
          </p>
          <p className="text-xs text-stone-400 flex items-center gap-1">
            Made with <Heart size={12} className="text-pink-400" /> for all moms
          </p>
        </div>
      </div>
    </footer>
  );
}
