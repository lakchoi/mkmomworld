"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, Crown, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/lib/store";

const navLinks = [
  { href: "/#dream", label: "우리의 꿈" },
  { href: "/campaigns", label: "캠페인" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "참여하기" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "rgba(30,41,59,0.97)" : "rgba(15,25,39,0.92)",
        borderBottom: "1px solid #334155",
        boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.35)" : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#2dd4bf" }}
            >
              <span className="font-bold text-sm" style={{ color: "#0f172a" }}>M</span>
            </div>
            <span className="font-bold text-base tracking-wide" style={{ color: "#f1f5f9" }}>
              MK MOMWORLD
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-slate-300 hover:text-[#2dd4bf] hover:bg-[#2dd4bf]/10"
                style={pathname === link.href ? { color: "#2dd4bf", backgroundColor: "rgba(45,212,191,0.12)" } : {}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors"
                  style={{ borderColor: "#334155" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: "rgba(45,212,191,0.15)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.3)" }}
                  >
                    {user.name?.[0] || "U"}
                  </div>
                  <span className="text-sm font-medium hidden sm:block max-w-20 truncate" style={{ color: "#cbd5e1" }}>
                    {user.name}
                  </span>
                  <ChevronDown size={14} style={{ color: "#64748b" }} />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-2xl border overflow-hidden"
                    style={{ backgroundColor: "#293548", borderColor: "#334155" }}
                  >
                    <div className="p-4 border-b" style={{ backgroundColor: "#1e293b", borderColor: "#334155" }}>
                      <p className="font-bold text-sm" style={{ color: "#f1f5f9" }}>{user.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#2dd4bf" }}>{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/mypage" onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-slate-300 hover:text-[#2dd4bf] hover:bg-[#2dd4bf]/10">
                        <User size={15} />마이페이지
                      </Link>
                      {user.role === "ADMIN" && (
                        <Link href="/admin" onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#2dd4bf] hover:bg-[#2dd4bf]/10 transition-colors">
                          <Crown size={15} />관리자 대시보드
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <LogOut size={15} />로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login"
                  className="text-sm font-medium px-3 py-1.5 text-slate-300 hover:text-[#2dd4bf] transition-colors">
                  로그인
                </Link>
                <Link href="/#contact"
                  className="text-sm font-bold px-5 py-1.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: "#2dd4bf", color: "#0f172a", boxShadow: "0 2px 12px rgba(45,212,191,0.3)" }}>
                  참여하기 →
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 text-slate-400 hover:text-[#2dd4bf] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t mt-1" style={{ borderColor: "#334155" }}>
            <nav className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-[#2dd4bf] hover:bg-[#2dd4bf]/10 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {isUserMenuOpen && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setIsUserMenuOpen(false)} />
      )}
    </header>
  );
}
