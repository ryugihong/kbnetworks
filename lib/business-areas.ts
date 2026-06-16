import type { AccentKey } from "./site-data";

export type BusinessArea = {
  slug: string;
  title: string;
  titleKo: string;
  description: string;
  points: string[];
  accent: AccentKey;
  icon: string; // inline emoji/glyph used as a lightweight visual accent
  href: string;
};

export const BUSINESS_AREAS: BusinessArea[] = [
  {
    slug: "franchise",
    title: "Franchise Operation",
    titleKo: "프랜차이즈 운영",
    description:
      "검증된 한식 브랜드와 본사 운영 시스템을 멕시코 현지에 이식합니다. 원팩 레시피·이원화 교육·QSC 품질관리로 첫날부터 일관된 품질을 구현합니다.",
    points: ["YUN'S SAMYONG FOOD · YUN'S BUFFET", "원팩 레시피 & QSC", "이원화 교육 아카데미"],
    accent: "orange",
    icon: "◆",
    href: "/brands",
  },
  {
    slug: "real-estate",
    title: "Real Estate & Location",
    titleKo: "부동산 · 입지 개발",
    description:
      "상권 분석부터 임대 조건 협의, 점포 설계·시공까지 입지 개발 전 과정을 지원합니다. 보호 상권 기준으로 파트너의 영업권을 함께 설계합니다.",
    points: ["상권 실사 & 입지 검토", "임대 협의 · 인허가", "인테리어 설계 · 시공 관리"],
    accent: "cyan",
    icon: "▣",
    href: "/process",
  },
  {
    slug: "project-management",
    title: "Project Management",
    titleKo: "프로젝트 관리",
    description:
      "상담에서 그랜드 오픈까지 체계적인 단계별 실행 관리. 일정·예산·품질·인허가를 본사 매뉴얼 기반으로 통합 관리해 시행착오를 최소화합니다.",
    points: ["6단계 실행 로드맵", "일정 · 예산 · 품질 통합 관리", "본사 슈퍼바이저 현장 지원"],
    accent: "electric",
    icon: "◈",
    href: "/process",
  },
  {
    slug: "trading",
    title: "Trading & Supply",
    titleKo: "무역 · 공급망",
    description:
      "한국 본사와 검증된 현지 유통망을 잇는 이원화 공급망. 한–멕시코 직항 해상 노선 확대와 니어쇼어링 흐름을 활용해 원가·공급 안정성을 높입니다.",
    points: ["이원화 공급망 (한국 + 현지)", "핵심 소스 · 원자재 수급", "원가 · 환율 리스크 분산"],
    accent: "lime",
    icon: "⬡",
    href: "/market",
  },
  {
    slug: "partnership",
    title: "Global Partnership",
    titleKo: "글로벌 파트너십",
    description:
      "한국의 브랜드·시스템과 멕시코 현지의 실행력을 연결합니다. 빠른 계약보다 올바른 출발 — 함께 오래 운영할 파트너를 찾고 구조를 함께 만듭니다.",
    points: ["한국 ↔ 멕시코 가교", "현지 파트너 매칭", "장기 동반 성장 설계"],
    accent: "violet",
    icon: "◎",
    href: "/about",
  },
  {
    slug: "market-entry",
    title: "Mexico Market Entry",
    titleKo: "멕시코 시장 진출",
    description:
      "법인 설립 환경, 상권, 소비 시장 데이터에 기반한 진출 전략. 몬테레이·CDMX·과달라하라를 중심으로 거점 진입 시나리오를 함께 설계합니다.",
    points: ["진출 전략 · 시장 데이터", "거점 도시 우선 진입", "리스크 · 규제 검토"],
    accent: "coral",
    icon: "✦",
    href: "/market",
  },
];
