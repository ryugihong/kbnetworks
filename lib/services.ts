import type { AccentKey } from "./site-data";

/**
 * Service content model.
 *
 * Each service detail page (/services/[slug]) is rendered from one entry below.
 * Sections are a small discriminated union so the dynamic template can render
 * every page from the same data with a consistent tone and layout.
 */
export type ServiceSection =
  | { kind: "intro"; eyebrow: string; title: string; body: string; items: string[] }
  | { kind: "prose"; eyebrow: string; title: string; body?: string; note?: string }
  | { kind: "steps"; eyebrow: string; title: string; steps: string[] }
  | { kind: "list"; eyebrow: string; title: string; body?: string; items: string[] }
  | { kind: "chips"; eyebrow: string; title: string; body?: string; items: string[] }
  | { kind: "cards"; eyebrow: string; title: string; body?: string; items: { label: string; desc: string }[] };

export type Service = {
  slug: string;
  titleEn: string;
  titleKo: string;
  /** Portfolio card / overview summary. */
  summary: string;
  icon: string;
  accent: AccentKey;
  hero: { eyebrow: string; title: string; lede: string };
  sections: ServiceSection[];
  cta: { title: string; button: string };
  /** Metadata title prefix — layout template appends " | KOBIS GLOBAL". */
  seoTitle: string;
  seoDescription: string;
};

export const serviceHref = (slug: string) => `/services/${slug}`;

export const SERVICES: Service[] = [
  {
    slug: "franchise",
    titleEn: "Franchise Business",
    titleKo: "프랜차이즈 사업",
    summary:
      "K-Food 및 외식 브랜드를 중심으로 브랜드 기획, 매장 운영 시스템, 가맹점 모집, 교육, 오픈 준비, 운영 관리까지 가맹사업 전 과정을 지원합니다.",
    icon: "◆",
    accent: "orange",
    hero: {
      eyebrow: "Franchise Business",
      title: "브랜드의 가능성을 현지 시장에서 작동하는 가맹 모델로 만듭니다",
      lede: "KOBIS GLOBAL은 K-Food 및 외식 프랜차이즈 브랜드를 중심으로 브랜드 기획, 매장 운영 시스템 구축, 가맹점 모집, 교육, 오픈 준비, 운영 관리까지 가맹사업 전 과정을 지원합니다. 단순히 매장을 늘리는 것이 아니라, 현지 소비자 수요와 상권 특성, 운영 효율성, 원가 구조, 고객 경험을 함께 고려하여 지속 가능한 확장 모델을 설계합니다.",
    },
    sections: [
      {
        kind: "intro",
        eyebrow: "What We Do",
        title: "초기 기획부터 운영 표준화까지, 실무 중심으로 구축합니다",
        body: "KOBIS GLOBAL은 브랜드가 새로운 시장에서 안정적으로 자리 잡을 수 있도록 초기 기획부터 운영 표준화까지 실무 중심의 가맹 시스템을 구축합니다. 메뉴 구성, 매장 동선, 운영 매뉴얼, 교육 체계, 가맹 상담 프로세스, 오픈 준비 체크리스트 등 실제 매장을 운영하는 데 필요한 요소를 체계적으로 정리합니다.",
        items: [
          "브랜드 콘셉트 및 시장 포지셔닝",
          "메뉴 및 상품 구성 검토",
          "매장 운영 프로세스 설계",
          "가맹점 모집 및 상담 구조 구축",
          "상권 검토 및 입지 전략 지원",
          "교육 매뉴얼 및 운영 매뉴얼 구성",
          "오픈 준비 및 초기 운영 안정화 지원",
          "가맹점주 커뮤니케이션 체계 구축",
        ],
      },
      {
        kind: "prose",
        eyebrow: "For Franchise Partners",
        title: "과장된 수익이 아니라, 실제 운영 기준을 보여드립니다",
        body: "예비 가맹점주는 브랜드의 경쟁력, 창업 절차, 비용 구조, 본사 지원 범위를 명확히 이해해야 합니다. KOBIS GLOBAL은 가맹 희망자가 과장된 수익 정보가 아니라 실제 운영에 필요한 기준과 절차를 확인할 수 있도록 투명한 안내 체계를 지향합니다.",
        note: "확인되지 않은 매출이나 수익을 약속하지 않습니다. 실제 운영 결과는 상권, 임대료, 인건비, 운영시간, 배달 비중, 점주의 운영 역량에 따라 달라질 수 있습니다.",
      },
      {
        kind: "steps",
        eyebrow: "Franchise Development Process",
        title: "상담에서 오픈, 그리고 운영까지",
        steps: [
          "브랜드 상담 및 사업 방향 검토",
          "현지 시장 및 상권 분석",
          "가맹 모델 및 비용 구조 설계",
          "매장 운영 시스템 및 교육 체계 구성",
          "가맹점 모집 및 상담 진행",
          "점포 선정 및 오픈 준비",
          "오픈 이후 운영 관리 및 개선",
        ],
      },
      {
        kind: "prose",
        eyebrow: "Why KOBIS GLOBAL",
        title: "영업이 아니라, 사업 개발로 접근합니다",
        body: "KOBIS GLOBAL은 브랜드 운영, 해외 시장 이해, 현지 파트너십, 프로젝트 실행 경험을 바탕으로 프랜차이즈 사업을 단순한 영업 활동이 아닌 하나의 사업 개발 과정으로 접근합니다. 브랜드와 가맹점주가 장기적으로 함께 성장할 수 있도록 운영 안정성, 고객 경험, 비용 구조, 확장 가능성을 함께 검토합니다.",
      },
    ],
    cta: { title: "가맹사업을 준비하고 있거나 브랜드 확장을 검토 중이신가요?", button: "가맹 상담 문의" },
    seoTitle: "Franchise Business",
    seoDescription:
      "KOBIS GLOBAL은 K-Food 및 외식 프랜차이즈 브랜드의 기획, 가맹점 모집, 운영 시스템, 교육, 오픈 준비를 지원합니다.",
  },
  {
    slug: "global-business-development",
    titleEn: "Global Business Development",
    titleKo: "글로벌 사업개발",
    summary:
      "한국과 해외 시장을 연결하여 현지 진출 전략, 파트너 발굴, 사업 구조 설계, 시장 검토, 실행 로드맵을 제공합니다.",
    icon: "◎",
    accent: "violet",
    hero: {
      eyebrow: "Global Business Development",
      title: "한국과 해외 시장을 연결하는 실질적인 사업개발 파트너",
      lede: "KOBIS GLOBAL은 기업과 브랜드가 해외 시장에 진출할 때 필요한 시장 검토, 파트너 발굴, 사업 구조 설계, 현지 실행 전략을 지원합니다. 단순한 소개나 연결을 넘어, 현지 시장에서 실제로 작동할 수 있는 사업 모델을 만들고 실행 가능한 로드맵으로 구체화합니다.",
    },
    sections: [
      {
        kind: "intro",
        eyebrow: "Market Entry Strategy",
        title: "제품 경쟁력만으로는 시장에 진입할 수 없습니다",
        body: "새로운 시장에 진입하기 위해서는 제품이나 브랜드 경쟁력만으로는 충분하지 않습니다. 현지 소비자, 규제 환경, 유통 구조, 가격 체계, 파트너 역량, 운영 방식이 함께 검토되어야 합니다. KOBIS GLOBAL은 이러한 요소를 종합적으로 분석하여 고객사가 실행 가능한 진출 전략을 수립할 수 있도록 지원합니다.",
        items: [
          "해외 시장 진입 전략 수립",
          "현지 사업성 검토",
          "경쟁사 및 유사 모델 분석",
          "파트너 후보 발굴 및 검토",
          "현지 운영 구조 설계",
          "진출 로드맵 및 실행 일정 구성",
          "초기 사업개발 자료 작성",
        ],
      },
      {
        kind: "prose",
        eyebrow: "Business Bridge",
        title: "이해관계자를 협업 가능한 구조로 연결합니다",
        body: "KOBIS GLOBAL은 한국 기업, 해외 현지 법인, 운영 파트너, 투자자, 시행사, 건설사, 유통 파트너를 연결하는 비즈니스 브릿지 역할을 수행합니다. 각 이해관계자의 목표와 리스크를 조율하고, 협업이 가능한 구조로 정리하는 것이 핵심입니다.",
      },
      {
        kind: "steps",
        eyebrow: "From Opportunity to Execution",
        title: "기회 발굴에서 실행까지",
        steps: [
          "사업 기회 발굴",
          "시장 및 수요 검토",
          "현지 파트너 후보 탐색",
          "사업 구조 및 역할 분담 설계",
          "계약·운영·투자 조건 검토",
          "실행 로드맵 구성",
          "프로젝트 관리 및 후속 지원",
        ],
      },
      {
        kind: "list",
        eyebrow: "Who Needs This Service",
        title: "이런 분들에게 필요한 서비스입니다",
        items: [
          "해외 진출을 준비하는 한국 기업",
          "멕시코 및 중남미 시장 진출을 검토하는 브랜드",
          "한국 파트너를 찾는 해외 기업",
          "현지 운영 파트너가 필요한 프랜차이즈 본사",
          "프로젝트 기반 사업개발이 필요한 시행사 및 투자자",
        ],
      },
    ],
    cta: { title: "새로운 시장 진출을 검토하고 계신가요?", button: "글로벌 사업개발 문의" },
    seoTitle: "Global Business Development",
    seoDescription:
      "KOBIS GLOBAL은 한국과 해외 시장을 연결하여 시장 진입 전략, 파트너 발굴, 사업 구조 설계, 실행 로드맵을 지원합니다.",
  },
  {
    slug: "real-estate-development",
    titleEn: "Real Estate Development",
    titleKo: "부동산 개발 및 프로젝트 시행",
    summary:
      "산업단지, 호텔, 리테일, 레저, 의료·요양 시설 등 복합개발 프로젝트의 기획, 시행, 사업성 검토, 파트너십 구조를 설계합니다.",
    icon: "▣",
    accent: "cyan",
    hero: {
      eyebrow: "Real Estate Development & Project Execution",
      title: "토지와 아이디어를 실행 가능한 개발 사업으로 구조화합니다",
      lede: "KOBIS GLOBAL은 부동산 개발, 복합개발, 산업단지, 호텔, 리테일, 레저, 의료·요양 시설 등 다양한 자산군을 결합한 프로젝트의 기획과 시행을 지원합니다. 시장성, 수익 구조, 인허가, 파트너십, 금융 조달 가능성을 함께 검토하여 개발 사업이 실제 실행 가능한 구조로 발전할 수 있도록 돕습니다.",
    },
    sections: [
      {
        kind: "intro",
        eyebrow: "Development Planning",
        title: "좋은 입지만으로 개발 사업이 완성되지 않습니다",
        body: "개발 사업은 좋은 입지나 대규모 부지만으로 완성되지 않습니다. 어떤 수요를 대상으로 어떤 시설을 배치할 것인지, 어떤 수익원이 사업을 지탱할 것인지, 어떤 단계로 개발할 것인지, 어떤 파트너와 실행할 것인지가 함께 설계되어야 합니다. KOBIS GLOBAL은 이러한 핵심 요소를 종합적으로 검토합니다.",
        items: [
          "개발 콘셉트 및 마스터플랜 기획",
          "토지 및 입지 활용 방향 검토",
          "수익 모델 및 자산 구성 설계",
          "산업단지·호텔·리테일·레저·의료시설 등 복합개발 구조 검토",
          "개발 단계별 phasing 전략 수립",
          "시행 구조 및 파트너십 모델 설계",
          "사업성 검토 및 투자자 설명 자료 구성",
        ],
      },
      {
        kind: "prose",
        eyebrow: "Mixed-Use Development",
        title: "여러 수익원을 결합해 사업 안정성을 높입니다",
        body: "KOBIS GLOBAL은 단일 자산 개발이 아니라 여러 수익원을 결합한 복합개발 모델에 강점을 가지고 있습니다. 산업 임대, 호텔 운영, 리테일, 레저, 의료·요양 서비스 등 서로 다른 기능을 결합하면 시장 변동성을 분산하고 장기적인 사업 안정성을 높일 수 있습니다.",
      },
      {
        kind: "prose",
        eyebrow: "Project Example",
        title: "멕시코를 중심으로 한 복합개발 검토",
        body: "KOBIS GLOBAL은 멕시코 시장을 중심으로 산업, 호텔, 레저, 리테일, 의료 기능을 결합한 복합개발 프로젝트를 검토·추진하고 있습니다. 이러한 프로젝트는 현지 산업 수요, 글로벌 공급망 재편, 관광·레저 수요, 장기 체류 및 의료 서비스 수요를 함께 고려하여 설계됩니다.",
        note: "공개 페이지에서는 구체적인 투자 금액, 금융 조건, 담보 조건, 미확정 파트너 정보는 다루지 않습니다. 세부 자료는 별도의 검토 절차와 비밀유지 합의를 통해 공유됩니다.",
      },
      {
        kind: "steps",
        eyebrow: "Development Process",
        title: "기회 검토에서 단계별 실행까지",
        steps: [
          "토지 및 프로젝트 기회 검토",
          "시장 수요 및 개발 방향 분석",
          "개발 콘셉트 및 프로그램 구성",
          "수익 모델 및 사업성 검토",
          "인허가 및 실행 리스크 검토",
          "파트너십 및 금융 구조 설계",
          "단계별 개발 실행 및 관리",
        ],
      },
    ],
    cta: { title: "개발 프로젝트의 구조화가 필요하신가요?", button: "프로젝트 검토 요청" },
    seoTitle: "Real Estate Development",
    seoDescription:
      "KOBIS GLOBAL은 산업단지, 호텔, 리테일, 레저, 의료시설 등 복합개발 프로젝트의 기획, 시행, 사업성 검토를 지원합니다.",
  },
  {
    slug: "project-management",
    titleEn: "Project Management",
    titleKo: "프로젝트 매니지먼트",
    summary:
      "개발 프로젝트의 초기 기획부터 인허가, 일정, 예산, 협력사, 리스크, 투자자 커뮤니케이션까지 실행 전반을 관리합니다.",
    icon: "◈",
    accent: "electric",
    hero: {
      eyebrow: "Project Management",
      title: "복잡한 프로젝트를 계획, 조율, 실행 가능한 일정으로 관리합니다",
      lede: "KOBIS GLOBAL은 개발 프로젝트와 글로벌 사업개발 과정에서 필요한 PM 서비스를 제공합니다. 초기 기획부터 인허가, 일정, 예산, 협력사, 리스크, 보고 체계, 투자자 커뮤니케이션까지 프로젝트 실행 전반을 관리하여 복잡한 사업이 목표한 방향으로 진행될 수 있도록 지원합니다.",
    },
    sections: [
      {
        kind: "intro",
        eyebrow: "Execution-Focused PM",
        title: "리스크는 기획보다 실행에서 발생합니다",
        body: "프로젝트는 기획보다 실행에서 더 많은 리스크가 발생합니다. 일정이 지연되고, 비용이 증가하고, 파트너 간 역할이 불명확해지고, 인허가나 금융 조건이 변경되면 사업 전체의 안정성이 흔들릴 수 있습니다. KOBIS GLOBAL은 이러한 리스크를 사전에 정리하고, 이해관계자가 같은 기준으로 의사결정할 수 있는 관리 체계를 구축합니다.",
        items: [
          "프로젝트 실행 계획 수립",
          "일정 및 milestone 관리",
          "예산 및 cost tracking",
          "인허가 진행 현황 관리",
          "협력사 및 파트너 커뮤니케이션",
          "리스크 관리 및 이슈 로그 운영",
          "투자자·대주단 보고 자료 정리",
          "회의체 및 의사결정 구조 운영",
        ],
      },
      {
        kind: "prose",
        eyebrow: "Governance & Reporting",
        title: "명확한 의사결정 구조와 보고 체계를 설계합니다",
        body: "KOBIS GLOBAL은 프로젝트별로 필요한 의사결정 구조와 보고 체계를 설계합니다. 주간 실무 회의, 월간 steering meeting, 단계별 gate review, 이슈 관리, 문서 관리, 변경 관리 등을 통해 프로젝트 진행 상황을 명확하게 파악하고 관리할 수 있도록 합니다.",
      },
      {
        kind: "cards",
        eyebrow: "Key Management Areas",
        title: "여섯 개의 핵심 관리 영역",
        items: [
          { label: "Scope", desc: "프로젝트 범위와 산출물 관리" },
          { label: "Schedule", desc: "주요 일정과 milestone 관리" },
          { label: "Cost", desc: "예산, 비용, 변경 사항 추적" },
          { label: "Risk", desc: "인허가, 금융, 시공, 운영 리스크 관리" },
          { label: "Stakeholder", desc: "투자자, 파트너, 시공사, 운영사 커뮤니케이션" },
          { label: "Documentation", desc: "계약, 보고서, 회의록, 데이터룸 자료 관리" },
        ],
      },
      {
        kind: "prose",
        eyebrow: "Why PM Matters",
        title: "PM은 사업성과 실행 가능성을 지키는 핵심 기능입니다",
        body: "대규모 프로젝트에서 PM은 단순한 일정 관리가 아닙니다. 프로젝트의 사업성, 투자 안정성, 파트너 신뢰도, 실행 가능성을 유지하는 핵심 기능입니다. KOBIS GLOBAL은 프로젝트가 기획서에 머무르지 않고 실제 결과로 연결될 수 있도록 실행 중심의 PM 체계를 제공합니다.",
      },
    ],
    cta: { title: "프로젝트 실행 관리가 필요하신가요?", button: "PM 서비스 문의" },
    seoTitle: "Project Management",
    seoDescription:
      "KOBIS GLOBAL은 개발 프로젝트의 일정, 예산, 인허가, 협력사, 리스크, 투자자 커뮤니케이션을 관리합니다.",
  },
  {
    slug: "finance-structuring",
    titleEn: "Investment & Finance Structuring",
    titleKo: "투자·금융 구조화 지원",
    summary:
      "프로젝트 파이낸싱, 브릿지론, 투자자 자료, 수익모델, 담보 구조, 리스크 분석 등 투자 검토에 필요한 금융 문서화와 구조 설계를 지원합니다.",
    icon: "⬡",
    accent: "lime",
    hero: {
      eyebrow: "Investment & Finance Structuring",
      title: "투자자가 이해할 수 있는 구조로 프로젝트를 정리합니다",
      lede: "KOBIS GLOBAL은 개발 프로젝트와 사업 확장 과정에서 필요한 투자·금융 구조화 지원 서비스를 제공합니다. 프로젝트 파이낸싱, 브릿지론, 투자자 자료, 수익모델, 리스크 분석, 담보 구조, capital stack 구성 등 투자 검토에 필요한 핵심 자료와 구조를 정리합니다.",
    },
    sections: [
      {
        kind: "intro",
        eyebrow: "Finance Structuring Support",
        title: "금액 제시만으로는 투자 검토가 이뤄지지 않습니다",
        body: "투자와 금융 조달은 단순히 필요한 금액을 제시하는 것으로 충분하지 않습니다. 자금의 사용 목적, 상환 구조, 수익원, 리스크, 담보, 파트너 역할, 실행 일정이 명확해야 투자자와 금융기관이 프로젝트를 검토할 수 있습니다. KOBIS GLOBAL은 이러한 요소를 구조화하여 투자 검토가 가능한 형태로 정리합니다.",
        items: [
          "투자 구조 및 capital stack 설계 지원",
          "프로젝트 파이낸싱 구조 검토",
          "브릿지론 및 단기 금융 구조 검토",
          "투자자용 Information Memorandum 구성",
          "수익모델 및 cash flow 구조 정리",
          "리스크 요인 및 mitigation plan 정리",
          "담보 및 보증 구조 검토 지원",
          "due diligence 자료 목록 및 데이터룸 구성 지원",
        ],
      },
      {
        kind: "chips",
        eyebrow: "Investor-Ready Documentation",
        title: "투자자 관점에서 자료를 재구성합니다",
        body: "투자자는 숫자만 보는 것이 아니라 프로젝트의 논리, 실행 가능성, 리스크 관리 체계, 상환 가능성을 함께 검토합니다. KOBIS GLOBAL은 프로젝트의 핵심 내용을 투자자 관점에서 재구성하여, 의사결정에 필요한 문서와 설명 구조를 준비합니다.",
        items: [
          "Company Profile",
          "Project Overview",
          "Investment Memorandum",
          "Financial Summary",
          "Risk Matrix",
          "Sources & Uses",
          "Project Timeline",
          "Due Diligence Checklist",
          "Partner & Governance Structure",
        ],
      },
      {
        kind: "prose",
        eyebrow: "Risk-Based Approach",
        title: "긍정적 요소만 강조하지 않습니다",
        body: "KOBIS GLOBAL은 투자 유치를 위한 긍정적 요소만 강조하지 않습니다. 인허가 지연, 금융 조달 지연, 수요 변동, 환율 및 금리 변동, 시공비 증가, 파트너 리스크 등 프로젝트별 핵심 리스크를 함께 정리하고, 이에 대한 대응 방안을 문서화합니다. 이는 투자자 신뢰를 높이고 협상 과정에서 불확실성을 줄이는 데 중요합니다.",
      },
      {
        kind: "prose",
        eyebrow: "Important Notice",
        title: "투자 수익이나 금융 조건을 보장하지 않습니다",
        note: "KOBIS GLOBAL의 투자·금융 구조화 지원은 투자 수익을 보장하거나 특정 금융 조건을 확약하는 서비스가 아닙니다. 모든 투자 조건, 금융 조건, 담보 구조, 계약 조건은 프로젝트별 실사와 법률·세무·재무 검토를 거쳐 확정되어야 합니다.",
      },
    ],
    cta: { title: "투자자 검토가 가능한 자료 구조가 필요하신가요?", button: "금융 구조화 문의" },
    seoTitle: "Investment & Finance Structuring",
    seoDescription:
      "KOBIS GLOBAL은 프로젝트 파이낸싱, 브릿지론, 투자자 자료, 수익모델, 리스크 분석, capital stack 구성을 지원합니다.",
  },
  {
    slug: "trade-partnership",
    titleEn: "Trade & Global Partnership",
    titleKo: "무역 및 글로벌 파트너십",
    summary:
      "상품, 브랜드, 자본, 운영 노하우가 해외 시장에서 실행될 수 있도록 유통 구조, 현지 파트너십, 시장 진입 방안을 함께 설계합니다.",
    icon: "✦",
    accent: "coral",
    hero: {
      eyebrow: "Trade & Global Partnership",
      title: "상품, 브랜드, 파트너를 연결해 해외 시장의 실행 기회를 만듭니다",
      lede: "KOBIS GLOBAL은 한국과 해외 시장 간 상품, 브랜드, 자본, 운영 노하우의 이동을 지원합니다. 단순한 수출입이나 소개를 넘어, 현지 시장에 맞는 유통 구조, 파트너십, 운영 방식, 브랜드 확장 가능성을 함께 검토하여 실행 가능한 글로벌 비즈니스 기회를 설계합니다.",
    },
    sections: [
      {
        kind: "intro",
        eyebrow: "Trade Beyond Distribution",
        title: "제품을 보내는 것만으로 무역은 완성되지 않습니다",
        body: "해외 시장에서 성공적인 무역과 유통은 제품을 보내는 것만으로 완성되지 않습니다. 현지 소비자 수요, 가격 경쟁력, 유통 파트너의 역량, 브랜드 메시지, 판매 채널, 사후 운영 구조가 함께 맞아야 합니다. KOBIS GLOBAL은 이러한 요소를 종합적으로 검토하여 상품과 브랜드가 현지 시장에서 자리 잡을 수 있도록 지원합니다.",
        items: [
          "상품 및 브랜드 해외 진출 검토",
          "현지 유통 파트너 발굴",
          "수출입 및 공급 구조 협의 지원",
          "브랜드 현지화 방향 검토",
          "판매 채널 및 운영 방식 설계",
          "파트너십 조건 검토",
          "프랜차이즈·리테일·프로젝트 연계 가능성 검토",
        ],
      },
      {
        kind: "prose",
        eyebrow: "Partnership Development",
        title: "단기 거래보다 장기 파트너십을 설계합니다",
        body: "KOBIS GLOBAL은 단기 거래보다 장기적인 파트너십 구축을 중요하게 생각합니다. 공급사, 운영사, 유통사, 투자자, 시행사, 브랜드 본사 등 다양한 이해관계자가 명확한 역할과 목표를 가지고 협력할 수 있도록 구조를 설계합니다.",
      },
      {
        kind: "list",
        eyebrow: "Business Areas",
        title: "주요 사업 영역",
        items: [
          "K-Food 및 외식 브랜드",
          "식품 및 소비재",
          "프랜차이즈 운영 상품",
          "리테일 및 유통 파트너십",
          "프로젝트 기반 공급 및 협력",
          "한국 기업의 해외 시장 진출 지원",
          "해외 기업의 한국 파트너십 지원",
        ],
      },
      {
        kind: "steps",
        eyebrow: "How We Support",
        title: "상품 검토에서 후속 확장까지",
        steps: [
          "상품 및 브랜드 검토",
          "시장 적합성 분석",
          "파트너 후보 발굴",
          "공급 및 유통 구조 협의",
          "계약 조건 및 역할 정리",
          "현지 실행 및 운영 지원",
          "후속 확장 가능성 검토",
        ],
      },
    ],
    cta: { title: "해외 파트너십 또는 유통 구조가 필요하신가요?", button: "파트너십 문의" },
    seoTitle: "Trade & Global Partnership",
    seoDescription:
      "KOBIS GLOBAL은 상품, 브랜드, 유통, 현지 파트너십을 연결하여 해외 시장 진출과 글로벌 비즈니스 확장을 지원합니다.",
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
