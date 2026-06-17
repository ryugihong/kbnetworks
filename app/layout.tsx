import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | KOBIS GLOBAL",
  },
  description: SITE.description,
  keywords: [
    "KOBIS GLOBAL",
    "한국 멕시코 진출",
    "K-Food 프랜차이즈",
    "멕시코 시장 진출",
    "프로젝트 관리",
    "무역",
    "부동산 개발",
    "Monterrey",
    "YUN'S SAMYONG FOOD",
  ],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    url: SITE.url,
    siteName: "KOBIS GLOBAL",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-dark focus:px-4 focus:py-2 focus:text-paper"
        >
          본문 바로가기
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
