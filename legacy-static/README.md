# KOBIS GLOBAL — Website

멕시코 K-Food 프랜차이즈 플랫폼 **KOBIS GLOBAL** (YUN'S SAMYONG FOOD · YUN'S BUFFET)의
다중 페이지 정적 웹사이트입니다. 기존 단일 페이지(`kobisglobalwebsite_2.html`)의 각 섹션을
독립된 페이지로 분리하고, 각 페이지를 더 길고 상세하게 재구성했습니다.

## 구조

```
kobisglobal/
├── index.html        # 홈 — 각 섹션 요약 + 전 페이지로 연결
├── about.html        # 회사 소개 · 철학 · 4대 운영 원칙 · 리더십
├── brands.html       # 브랜드 & 케이스 (SAMYONG QSR · BUFFET · 2호점 · 복합 허브 · 공급망)
├── market.html       # 시장 인텔리전스 (K-Food · 멕시코 외식시장 · FIFA 2026 · 몬테레이)
├── process.html      # 오픈 6단계 로드맵 · 본사 지원 · 성장 경로
├── pricing.html      # 투자 & 가맹 패키지 · 비용 구조 · 로열티 · ROI 변수
├── faq.html          # 자주 묻는 질문 (12문항)
├── contact.html      # 파트너십 문의 (폼 · 연락처 · 거점)
└── assets/
    ├── css/style.css # 공유 디자인 시스템
    ├── js/main.js    # FAQ 아코디언 · 모바일 메뉴 · 스크롤 리빌 · 폼
    └── img/          # 로고(SVG) + 사진 (아래 안내 참고)
```

## 로컬 미리보기

별도 빌드 과정이 없습니다. 폴더에서 정적 서버를 띄우면 됩니다.

```bash
cd kobisglobal
npx serve .        # 또는: python3 -m http.server 8080
```

## 이미지 안내 (중요)

로고는 **SVG로 직접 재현**되어 있어 별도 파일 없이 항상 선명하게 표시됩니다
(`assets/img/kobis-mark.svg`, 각 페이지의 네비게이션·푸터에 인라인 삽입).

사진은 `assets/img/` 에 아래 파일명으로 넣으면 자동 반영됩니다. **파일이 없으면**
브랜드 컬러 그라데이션 플레이스홀더가 표시되도록 설계되어 있어, 사진이 없어도
레이아웃이 깨지지 않습니다 (`onerror` 폴백).

| 파일명 | 용도 | 제공 사진 |
|---|---|---|
| `restaurant-interior.jpg` | YUN'S BUFFET 한식 BBQ 인테리어 | ✅ 첨부됨 (구리 그릇 BBQ 매장 내부) |
| `golf-monterrey.jpg` | 몬테레이 프리미엄 시장 / 라이프스타일 | ✅ 첨부됨 (골프장 항공샷) |
| `container-ship.jpg` | 한국→멕시코 공급망 / 물류 | ✅ 첨부됨 (컨테이너선) |
| `samyong-storefront.jpg` | YUN'S SAMYONG FOOD QSR | (선택) 없으면 그라데이션 |
| `expansion.jpg` | 2호점 확장 | (선택) 없으면 그라데이션 |
| `fundidora.jpg` | FIFA Fan Festival / Parque Fundidora | (선택) 없으면 그라데이션 |

> 첨부해 주신 3장의 사진(레스토랑 내부·골프장·컨테이너선)을 위 파일명으로 저장하면
> 즉시 사이트에 반영됩니다. 권장 크기: 가로 1600px 내외, JPG/WebP.

## 시장 데이터 출처 (2025–2026 기준, market.html)

- 한국 농림축산식품부 — K-Food+ 수출 **$13.62B** (2025, 사상 최고), 라면 $1.5B, 2030 목표 $21B
- Mordor Intelligence — 멕시코 외식시장 **$157.26B (2031), CAGR 8.58%**, QSR 점유율 55.45%
- FIFA — 2026 월드컵 몬테레이 Estadio BBVA 4경기(대한민국 6/22), Fan Festival @ Parque Fundidora 39일(6/11–7/19), 200만+ 방문 전망
- 몬테레이 구매력 — 멕시코 1인당 최부유 도시, PPP 1인당 GDP ~$35,500
- 한-멕시코 물류 — 2025년 한국/중국발 멕시코 서안 직항 해상 노선 신설, 니어쇼어링

> 시장 지표는 조사기관별 방법론에 따라 상이할 수 있으며 참고용입니다.
> 개별 매장의 실적을 보장하지 않습니다. 환율(1 MXN ≈ 80 KRW, 2026.06)·IVA(16%) 별도.

## 비고

- 폰트: Google Fonts (Playfair Display · Inter)
- 디자인: 다크 럭셔리 테마, 골드 액센트, KOBIS 오렌지 로고
- 반응형: 데스크톱 / 태블릿 / 모바일 (햄버거 메뉴)
- 문의 폼은 데모(프런트엔드)이며 백엔드 연동 시 `data-demo-form` 핸들러를 교체하세요.
