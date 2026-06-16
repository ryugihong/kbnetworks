# KOBIS GLOBAL — Korea–Mexico Business Execution Platform

프랜차이즈 운영 · 부동산 개발 · 프로젝트 관리 · 무역 · 현지 파트너십을 하나로 묶은
한국–멕시코 비즈니스 실행 플랫폼 **KOBIS GLOBAL**의 공식 웹사이트입니다.

기존 정적 HTML 사이트를 **Next.js 14 (App Router) · TypeScript · Tailwind CSS**
기반의 컴포넌트 아키텍처로 재구축하고, **"Premium Dopamine" 디자인 시스템**을 적용했습니다.

## 기술 스택

- **Next.js 14** (App Router, 정적 export `output: "export"`)
- **React 18 · TypeScript** (strict)
- **Tailwind CSS 3** — 커스텀 디자인 토큰 (`tailwind.config.ts`)
- 모션: **CSS 애니메이션 + IntersectionObserver** (`Reveal`) — 외부 모션 라이브러리 미사용
- 폰트: **Inter**

## 실행

```bash
npm install
npm run dev        # 개발 서버 (http://localhost:3000)
npm run build      # 정적 빌드 → ./out
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npx serve out      # 빌드 결과 미리보기
```

## 구조

```
app/                     # 라우트 (App Router)
  layout.tsx             # 루트 레이아웃 · 메타데이터 · Header/Footer
  page.tsx               # 홈 (/)
  about|brands|market|process|pricing|faq|contact/page.tsx
  globals.css            # Tailwind 레이어 · 디자인 토큰 · 유틸리티
components/
  layout/                # Header · Footer · AnnouncementBar
  sections/              # HeroSection · BusinessAreasSection · CTASection · PageHero ·
                         # StatsSection · ProcessSection · FAQSection · ContactForm
  ui/                    # GradientButton · GlassCard · SectionHeader · GradientBadge ·
                         # AnimatedBackground · BusinessCard · StatCard · PricingCard ·
                         # ProcessStep · FAQAccordion · PremiumField · KobisMark · Reveal
lib/                     # navigation · site-data · business-areas · faqs · pricing · accents
.github/workflows/       # nextjs.yml — GitHub Pages 배포 (정적 export)
legacy-static/           # 이전 정적 HTML 사이트 (보존)
legacy-prompt-enhancer/  # 별개 prompt-enhancer 앱 (보존)
```

## Premium Dopamine 디자인 시스템

다크 베이스(#050816) + 비비드 그라데이션 액센트 + 글래스모피즘 + 절제된 네온 글로우.

| 토큰 | 값 |
|---|---|
| Base Dark | `#050816` |
| Text Cream | `#F8F5E9` |
| Electric Blue | `#2F7BFF` |
| Neon Cyan | `#00E5FF` |
| Acid Lime | `#B6FF00` |
| Hot Coral | `#FF4D6D` |
| Vivid Violet | `#8B5CF6` |
| Orange (brand) | `#FF7A00` |

- 헤드라인·CTA는 정제된 그라데이션 텍스트(`.text-gradient`)
- 카드는 `.glass` + accent별 hover 글로우 (정적 클래스 맵 `lib/accents.ts`)
- 배경은 마스킹된 서브틀 그리드 + 플로팅 그라데이션 blob
- `prefers-reduced-motion` 존중, 모바일 blur 완화

## 라우팅 / 기존 .html 경로

정적 export가 `about.html`, `brands.html` … 형태로 출력되므로, `/about` 와
`/about.html` 모두 동일한 페이지를 서빙합니다(기존 링크 보존). 내부 링크·네비게이션은
클린 URL(`/about`)을 사용합니다.

## 배포 (GitHub Pages)

`.github/workflows/nextjs.yml`이 이 브랜치 push 시 `next build`(정적 export) 후
`./out`을 Pages로 배포합니다. 최초 1회 저장소 **Settings → Pages → Source: GitHub Actions**
설정이 필요합니다. 배포 URL: `https://ryugihong.github.io/kbnetworks/`.

## 콘텐츠 / 데이터

시장 데이터(K-Food 수출 $13.62B, 멕시코 외식시장 CAGR 8.58%, FIFA 2026 몬테레이 등)는
공개 출처(농림축산식품부 · Mordor Intelligence · FIFA) 기준이며 참고용입니다. 개별 매장·사업
실적을 보장하지 않습니다. 환율(1 MXN ≈ 80 KRW)·IVA(16%) 별도. 문의 폼은 프런트엔드 데모이며
실제 발송되지 않습니다(백엔드 연동 시 `data-demo` 핸들러 교체).
