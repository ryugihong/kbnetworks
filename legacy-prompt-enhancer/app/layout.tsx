import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompt Enhancer — AI 프롬프트 자동 최적화",
  description:
    "자유롭게 작성한 요청을 AI가 최상의 답변을 낼 수 있는 완벽한 프롬프트로 자동 변환합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
