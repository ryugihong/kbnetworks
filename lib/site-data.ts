export const SITE = {
  name: "KOBIS GLOBAL",
  legal: "KOBIS GLOBAL SA DE CV",
  korea: "KBNETWORKS",
  tagline: "Korea to Mexico, built for execution.",
  slogan: "Great begins here.",
  title: "KOBIS GLOBAL | Korea–Mexico Business Execution Platform",
  description:
    "KOBIS GLOBAL은 프랜차이즈 운영, 부동산 개발, 프로젝트 관리, 무역, 현지 파트너십을 하나로 묶은 한국–멕시코 비즈니스 실행 플랫폼입니다.",
  url: "https://www.kobisglobal.com",
} as const;

export const CONTACT = {
  email: "ryugihong@gmail.com",
  phone: "+52 811 634 6773",
  phoneHref: "tel:+528116346773",
  phonePerson: "Brawn Yun",
  web: "www.kobisglobal.com",
  webHref: "https://www.kobisglobal.com",
  address: "Plaza Puntacero, Av. Fundidora 200, Monterrey",
  partnership: {
    name: "Gihong Ryu (류기홍)",
    role: "Partnership Development · KOBIS GLOBAL / KBNETWORKS",
    initials: "RG",
  },
} as const;

export const REGIONS = [
  "Monterrey",
  "CDMX",
  "Guadalajara",
  "Cancún",
  "Mérida",
] as const;

export const HERO = {
  badge: "MONTERREY · CDMX · GUADALAJARA — MEXICO 2026",
  headline: ["Korea to Mexico,", "built for execution."],
  sub: "KOBIS GLOBAL은 프랜차이즈 운영 · 부동산 개발 · 프로젝트 관리 · 무역 · 현지 파트너십을 하나의 실행 중심 플랫폼으로 연결해, 한국 기업의 멕시코 시장 진출을 처음부터 끝까지 함께합니다.",
  primaryCta: { label: "파트너십 상담하기", href: "/contact" },
  secondaryCta: { label: "사업 영역 보기", href: "#business-areas" },
  panel: [
    { k: "Execution Platform", v: "Korea → Mexico" },
    { k: "Live Operation", v: "YUN'S SAMYONG FOOD" },
    { k: "Base", v: "Monterrey · CDMX · GDL" },
    { k: "Entity", v: "KOBIS GLOBAL SA DE CV" },
  ],
};

// Market-proof stats — sourced figures (see /market for citations).
export type Stat = { value: string; label: string; accent?: AccentKey };

export const STATS: Stat[] = [
  { value: "$13.62B", label: "K-Food+ 글로벌 수출액 · 2025 사상 최고 (10년 연속 증가)", accent: "cyan" },
  { value: "$157B", label: "멕시코 외식시장 2031년 전망 · CAGR 8.58%", accent: "electric" },
  { value: "55.45%", label: "멕시코 외식시장 내 QSR 점유율 · 2025", accent: "violet" },
  { value: "2M+", label: "FIFA Fan Festival 몬테레이 · Parque Fundidora 39일 방문 전망", accent: "lime" },
];

export const STATS_SOURCE =
  "출처: 한국 농림축산식품부 · Mordor Intelligence · FIFA · 2026.01–06. 시장 지표는 조사기관별 방법론에 따라 상이할 수 있으며 참고용이고, 개별 매장·사업 실적을 보장하지 않습니다.";

export type AccentKey = "electric" | "cyan" | "lime" | "coral" | "violet" | "orange";
