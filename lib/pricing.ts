import type { AccentKey } from "./site-data";

export type PricingPlan = {
  tier: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
  accent: AccentKey;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    tier: "K-Food QSR",
    name: "YUN'S SAMYONG FOOD",
    description: "라면·김밥·떡볶이·만두 중심 퀵서비스. 100~200㎡ 규모. 매장·포장·배달 3채널 운영.",
    price: "₩285M+",
    priceNote: "예상 초기 개설비 (MXN ~3.56M+)",
    features: [
      "가맹비 · 교육비 · 계약보증금 포함",
      "인테리어 · 장비 · 초도 물품비",
      "POS / IT / 키오스크 세팅",
      "SNS 브랜드 채널 운영 지원",
      "공급망 안정 공급 시스템",
      "교육 아카데미 포함",
    ],
    cta: { label: "상담 신청하기", href: "/contact" },
    accent: "orange",
  },
  {
    tier: "Korean BBQ Buffet",
    name: "YUN'S BUFFET",
    description: "한국식 고기구이 무한리필 + 가라오케 룸. 200~300㎡ 규모. 프리미엄 가족·단체 상권 최적화.",
    price: "별도 견적",
    priceNote: "규모 · 입지 · 설비 조건 기반 산정",
    features: [
      "테이블 그릴 + 전용 환기 시스템 포함",
      "가라오케 룸 · 프리미엄 주류 운영",
      "YUN'S SAMYONG FOOD 동일 상권 시너지",
      "본사 슈퍼바이저 집중 지원",
      "복합 한식 허브 구조 구성 가능",
    ],
    cta: { label: "함께 논의하기", href: "/contact" },
    featured: true,
    badge: "추천 — Fundidora 직접 수혜",
    accent: "cyan",
  },
  {
    tier: "Custom",
    name: "복합 패키지",
    description: "YUN'S SAMYONG FOOD + YUN'S BUFFET 동일 상권 동시 입점. 교차 방문 유도 · 브랜드 인지도 극대화.",
    price: "미팅 후 결정",
    priceNote: "파트너 조건 맞춤 협의",
    features: [
      "두 브랜드 병행 운영 시너지",
      "FIFA 2026 월드컵 프로모션 우선 지원",
      "대형 복합 상권 특화 전략",
      "맞춤형 투자 · 운영 조건 협의",
    ],
    cta: { label: "미팅 일정 잡기", href: "/contact" },
    accent: "violet",
  },
];

export const PRICING_DISCLAIMER =
  "상기 금액은 예비 검토용 참고치이며, 실제 비용은 매장 규모·입지·임대조건·공사범위·환율·IVA·인허가에 따라 달라집니다. 참고 환율: 1 MXN ≈ 80 KRW (2026.06 기준). 최종 조건은 COF, 가맹계약서, 현장 실사 후 확정됩니다.";

// Process steps (shared by Home teaser + /process)
export type ProcessStep = {
  no: string;
  title: string;
  desc: string;
  duration: string;
  tasks?: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    no: "01",
    title: "브랜드 상담",
    desc: "브랜드 비전 공유, 예상 투자 규모 논의, 후보 지역 브레인스토밍. 파트너 적합성 1차 확인.",
    duration: "약 1주",
    tasks: ["브랜드 비전 · 운영 철학 공유", "예상 투자 규모 논의", "후보 지역 1차 검토"],
  },
  {
    no: "02",
    title: "상권 / 점포 검토",
    desc: "후보지 현장 실사, 배달 인프라 확인, 경쟁점 분석, 임대 조건 및 ROI 1차 검토.",
    duration: "2~3주",
    tasks: ["후보지 현장 실사", "배달 인프라 · 경쟁점 분석", "임대 조건 · ROI 1차 검토"],
  },
  {
    no: "03",
    title: "계약 협의 및 체결",
    desc: "점포 확정 후 가맹 조건 최종 협의, 상호 권리·의무 확인 후 계약 체결.",
    duration: "약 1주",
    tasks: ["가맹 조건 최종 협의", "권리 · 의무 확인", "계약 체결"],
  },
  {
    no: "04",
    title: "점포 공사 및 세팅",
    desc: "본사 매뉴얼 기반 인테리어 설계·시공, 주방기기 및 POS/IT 반입·세팅, 인허가 업무 병행.",
    duration: "4~6주",
    tasks: ["인테리어 설계 · 시공", "주방기기 · POS/IT 세팅", "인허가 업무 병행"],
  },
  {
    no: "05",
    title: "현장 교육 및 준비",
    desc: "점주·핵심 직원 조리·위생·서비스·POS 실무 교육, 식자재 초도 입고, Soft Opening 시뮬레이션.",
    duration: "약 2주",
    tasks: ["조리 · 위생 · 서비스 · POS 교육", "식자재 초도 입고", "Soft Opening 시뮬레이션"],
  },
  {
    no: "06",
    title: "그랜드 오픈",
    desc: "본사 슈퍼바이저 현장 지원, 오픈 프로모션 실행, 고객 반응 데이터 수집 및 리뷰 보완.",
    duration: "지속 지원",
    tasks: ["슈퍼바이저 현장 지원", "오픈 프로모션 실행", "데이터 수집 · 리뷰 보완"],
  },
];
