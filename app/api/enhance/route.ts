import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tone = "default" | "concise" | "detailed" | "creative" | "academic";
type Lang = "auto" | "ko" | "en" | "both";

const TONE_GUIDE: Record<Tone, string> = {
  default: "균형 잡힌 전문적 톤으로 작성",
  concise: "간결하고 핵심만 담은 톤으로 작성",
  detailed: "풍부한 맥락과 세부 단계까지 포함한 상세한 톤으로 작성",
  creative: "창의적이고 참신한 관점을 장려하는 톤으로 작성",
  academic: "학술적이고 엄밀한 톤으로, 근거와 구조를 강조해 작성",
};

const LANG_GUIDE: Record<Lang, string> = {
  auto: "원본 입력과 동일한 언어로 출력",
  ko: "한국어로 출력",
  en: "영어로 출력",
  both:
    "<prompt> 블록 내부에 한국어 버전과 영어 버전을 모두 출력합니다. " +
    "먼저 '## 한국어 (Korean)' 헤딩으로 시작하는 한국어 전체 프롬프트, " +
    "그 다음 '---' 구분선, 이어서 '## English' 헤딩으로 시작하는 영어 전체 프롬프트를 작성합니다. " +
    "두 버전은 의미가 동일해야 하며, 각 버전은 독립적으로 복사해 사용할 수 있는 완결된 프롬프트여야 합니다.",
};

const SYSTEM_PROMPT = `당신은 세계 최고 수준의 "프롬프트 엔지니어"입니다. 사용자 요청을 분석해 모든 AI가 최상의 답변을 낼 수 있는 "완성된 프롬프트"로 재작성합니다.

출력은 반드시 아래 두 블록을 이 순서로만 작성합니다. 블록 외부에는 어떤 텍스트/코드펜스/머리말도 출력하지 마세요.

<analysis>
{
  "intent": "사용자가 실제로 원하는 것(한 문장)",
  "goal": "최종 결과 목표(한 문장)",
  "audience": "대상 독자/사용자",
  "deliverable": "구체적 산출물(형식 포함)",
  "domain": "도메인/분야",
  "assumptions": ["합리적 가정 1", "합리적 가정 2"]
}
</analysis>
<prompt>
# 역할 (Role)
- AI가 수행해야 할 전문가 역할을 한 줄로 정의

# 목표 (Goal)
- 사용자가 얻고자 하는 최종 결과를 한두 문장으로 정의

# 맥락 (Context)
- 배경/독자/톤/도메인 등 알려진 사실과 합리적 가정을 bullet로 정리

# 작업 지시 (Instructions)
- 단계별로 수행할 작업을 번호 매김으로 구체적으로 작성
- 사고의 순서(먼저 분석 → 초안 → 검토) 권장
- 필요 시 예시(Few-shot)나 참고 프레임워크를 간결히 제시

# 제약 (Constraints)
- 길이/형식/금지사항/언어/포함·제외 키워드 등

# 출력 형식 (Output Format)
- 마크다운/JSON/표 등 명확한 스키마로 지정
- 섹션 제목·필드명을 그대로 사용하도록 규정

# 품질 체크리스트 (Self-Check)
- AI가 답변 전 스스로 검증할 3~5개 기준

# 명확화 질문 (필요시)
- 사용자가 답하면 결과가 크게 개선되는 질문 1~3개. 없으면 이 섹션 생략.
</prompt>

중요 규칙:
- <analysis> 내부는 유효한 UTF-8 JSON 하나만. 주석/trailing comma 금지, 모든 문자열 쌍따옴표. 항상 한국어로 작성.
- <prompt> 내부는 마크다운 본문만. 메타 설명("다음은 강화된 프롬프트입니다" 등) 금지, 코드펜스 금지.
- 스타일 가이드의 톤/언어 설정은 <prompt> 본문에만 반영합니다.
- 태그는 정확히 <analysis></analysis>, <prompt></prompt> (대소문자 구분).
- 두 블록 외부에는 어떤 문자도 출력하지 않습니다.
- 원본에 없는 사실을 단정하지 말고, 가정은 analysis.assumptions 배열에 명시합니다.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "서버에 ANTHROPIC_API_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  let body: { prompt?: string; tone?: Tone; lang?: Lang };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return Response.json(
      { error: "prompt 필드가 비어 있습니다." },
      { status: 400 },
    );
  }
  if (prompt.length > 8000) {
    return Response.json(
      { error: "입력이 너무 깁니다. 8,000자 이하로 작성해주세요." },
      { status: 400 },
    );
  }

  const tone: Tone = (body.tone ?? "default") as Tone;
  const lang: Lang = (body.lang ?? "auto") as Lang;

  const toneGuide = TONE_GUIDE[tone] ?? TONE_GUIDE.default;
  const langGuide = LANG_GUIDE[lang] ?? LANG_GUIDE.auto;

  const userMessage = `다음은 사용자가 자유롭게 작성한 원본 요청입니다. 이를 분석해 위 규격의 "완성된 프롬프트"로 재작성하세요.

스타일 가이드:
- ${toneGuide}
- ${langGuide}

[원본 요청 시작]
${prompt}
[원본 요청 끝]`;

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-opus-4-7";

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model,
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        response.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await response.finalMessage();
        controller.close();
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "프롬프트 생성 중 오류가 발생했습니다.";
        controller.enqueue(encoder.encode(`\n\n[오류] ${message}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
