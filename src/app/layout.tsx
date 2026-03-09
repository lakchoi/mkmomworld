import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "MK Mom World - 엄마들의 특별한 세상",
  description: "MK Mom World에서 다양한 캠페인, 특별 혜택, 그리고 엄마들의 이야기를 만나보세요.",
  keywords: "MK Mom World, 엄마 커뮤니티, 캠페인, 육아, 뷰티, 건강",
  openGraph: {
    title: "MK Mom World",
    description: "엄마들의 특별한 세상",
    url: "https://mkmomworld.com",
    siteName: "MK Mom World",
    images: [{ url: "https://mkmomworld.com/og-image.jpg" }],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-orange-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
