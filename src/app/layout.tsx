import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "MK Mom World - 배우고 연결되고 함께 움직이는 실행 플랫폼",
  description: "맘월드는 치안·먹거리·환경·사회경제·안전동행 5대 캠페인을 통해 시민이 배우고 안전동행으로 함께 움직이는 실행 플랫폼입니다.",
  keywords: "MK Mom World, 맘월드, 치안캠페인, 먹거리안전, 환경, 사회경제, 병원동행, 시민참여",
  openGraph: {
    title: "MK Mom World",
    description: "배우고 연결되고 함께 움직이는 실행 플랫폼",
    url: "https://mkmomworld.com",
    siteName: "MK Mom World",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: "#1e293b", color: "#e2e8f0" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
