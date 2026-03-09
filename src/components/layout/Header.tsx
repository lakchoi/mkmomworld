"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, User, LogOut, Settings, Crown, Leaf } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import { getGradeInfo } from "@/lib/grades";
import { UserRole } from "@prisma/client";

const navLinks = [
  { href: "/", label: "홈" },
  { href: "/campaigns", label: "캠페인" },
  { href: "/shop", label: "쇼핑" },
  { href: "/blog", label: "블로그" },
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

  const gradeInfo = user ? getGradeInfo(user.role as UserRole) : null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md shadow-orange-100/50"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-orange-300/50 transition-shadow">
              <span className="text-white text-lg">🌸</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                MK Mom World
              </span>
              <span className="text-xs text-orange-400 font-medium -mt-0.5">엄마들의 특별한 세상</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  pathname === link.href
                    ? "bg-orange-100 text-orange-600"
                    : "text-stone-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/shop/cart"
                  className="relative p-2 text-stone-500 hover:text-orange-500 transition-colors"
                >
                  <ShoppingBag size={20} />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-sm">
                      {gradeInfo?.emoji}
                    </div>
                    <span className="text-sm font-medium text-stone-700 hidden sm:block max-w-20 truncate">
                      {user.name}
                    </span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-orange-100/50 border border-orange-100 overflow-hidden">
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-300 to-pink-400 flex items-center justify-center text-2xl">
                            {gradeInfo?.emoji}
                          </div>
                          <div>
                            <p className="font-bold text-stone-800">{user.name}</p>
                            <div className="flex items-center gap-1">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${gradeInfo?.bgColor} ${gradeInfo?.color}`}>
                                {gradeInfo?.name} 등급
                              </span>
                            </div>
                            <p className="text-xs text-orange-500 mt-0.5">
                              💰 {user.totalPoints?.toLocaleString()}P
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-stone-500">
                          추천코드: <span className="font-mono font-bold text-orange-500">{user.referralCode}</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/mypage"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors text-stone-600 hover:text-orange-500"
                        >
                          <User size={16} />
                          <span className="text-sm font-medium">마이페이지</span>
                        </Link>
                        {user.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-colors text-purple-600"
                          >
                            <Crown size={16} />
                            <span className="text-sm font-medium">관리자 대시보드</span>
                          </Link>
                        )}
                        <button
                          onClick={() => { logout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-colors text-stone-500 hover:text-red-500"
                        >
                          <LogOut size={16} />
                          <span className="text-sm font-medium">로그아웃</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-stone-600 hover:text-orange-500 transition-colors px-3 py-1.5"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm font-bold text-white bg-gradient-to-r from-orange-400 to-pink-500 px-4 py-1.5 rounded-full hover:shadow-lg hover:shadow-orange-300/50 transition-all"
                >
                  회원가입
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-stone-500 hover:text-orange-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-orange-100 mt-1">
            <nav className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-orange-100 text-orange-600"
                      : "text-stone-600 hover:bg-orange-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Overlay for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
