import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tone = "default" | "concise" | "detailed" | "creative" | "academic";
type Lang = "auto" | "ko" | "en" | "both";
type Answer = { question: string; answer: string };

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

const SYSTEM_PROMPT = `당신은 세계 최고 수준의 "프롬프트 엔지니어"입니다. 사용자의 자유로운 요청과 (있다면) 사용자의 추가 답변을 종합해, 사용자가 별도 수정 없이 그대로 복사해 쓰더라도 AI가 최상의 답변을 낼 수 있는 "완성된 프롬프트"로 재작성합니다.

작성 원칙 (2026년 기준):
- 주제와 관련해 2026년 현 시점의 모범 사례·용어·트렌드·프레임워크 버전·업계 합의를 반영합니다. 확실하지 않은 최신 정보는 단정하지 말고 assumptions에 명시합니다.
- 맥락 적합성을 판단해 불필요한 일반론을 배제하고 해당 용도에 특화된 지시로 구체화합니다.
- 결과 프롬프트는 "길거나 복잡한" 것이 아니라 "구조적으로 완결된" 형태를 지향합니다. 길이는 필요한 최소치여야 합니다.
- <prompt> 본문은 핵심 요소를 반드시 명확히 포함합니다: 목표(Goal), 조건/맥락(Conditions/Context), 형식(Format), 제약(Constraints), 품질 기준(Quality). 누락된 요소가 없도록 자기검증하세요.
- 사용자가 제공한 추가 답변은 신뢰하고 우선 반영합니다. 답변이 원본과 상충하면 답변을 우선합니다.

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
- 배경/독자/사용 환경/톤/도메인 등 알려진 사실과 합리적 가정을 bullet로 정리
- 해당 주제의 2026년 현 시점 핵심 트렌드·모범 사례를 1~3개 bullet로 요약 반영

# 작업 지시 (Instructions)
- 단계별로 수행할 작업을 번호 매김으로 구체적으로 작성
- 사고의 순서(먼저 분석 → 초안 → 검토) 권장
- 필요 시 예시(Few-shot)나 참고 프레임워크를 간결히 제시

# 제약 (Constraints)
- 길이/형식/금지사항/언어/포함·제외 키워드 등 명확히

# 출력 형식 (Output Format)
- 마크다운/JSON/표 등 명확한 스키마로 지정
- 섹션 제목·필드명을 그대로 사용하도록 규정

# 품질 체크리스트 (Self-Check)
- AI가 답변 전 스스로 검증할 3~5개 기준 (사실 정확성, 구조 완결성, 최신성, 사용자 맥락 부합 등)
</prompt>

중요 규칙:
- <analysis> 내부는 유효한 UTF-8 JSON 하나만. 주석/trailing comma 금지, 모든 문자열 쌍따옴표. 항상 한국어로 작성.
- <prompt> 내부는 마크다운 본문만. 메타 설명("다음은 강화된 프롬프트입니다" 등) 금지, 코드펜스 금지.
- 스타일 가이드의 톤/언어 설정은 <prompt> 본문에만 반영합니다.
- 태그는 정확히 <analysis></analysis>, <prompt></prompt> (대소문자 구분).
- 두 블록 외부에는 어떤 문자도 출력하지 않습니다.
- 원본·답변에 없는 사실을 단정하지 말고, 가정은 analysis.assumptions 배열에 명시합니다.`;

function formatAnswers(answers: Answer[]): string {
  if (!answers.length) return "";
  const lines = answers.map(
    (a) => `- Q: ${a.question}\n  A: ${a.answer}`,
  );
  return `

사용자가 제공한 추가 맥락 (이 답변을 신뢰하고 우선 반영):
${lines.join("\n")}`;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "서버에 ANTHROPIC_API_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  let body: {
    prompt?: string;
    tone?: Tone;
    lang?: Lang;
    answers?: Answer[];
  };
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
  const rawAnswers = Array.isArray(body.answers) ? body.answers : [];
  const answers: Answer[] = rawAnswers
    .filter(
      (a): a is Answer =>
        !!a &&
        typeof a.question === "string" &&
        typeof a.answer === "string" &&
        a.answer.trim().length > 0,
    )
    .slice(0, 8)
    .map((a) => ({
      question: a.question.slice(0, 300),
      answer: a.answer.slice(0, 600),
    }));

  const toneGuide = TONE_GUIDE[tone] ?? TONE_GUIDE.default;
  const langGuide = LANG_GUIDE[lang] ?? LANG_GUIDE.auto;
  const answersBlock = formatAnswers(answers);

  const userMessage = `다음은 사용자가 자유롭게 작성한 원본 요청입니다. 이를 분석해 위 규격의 "완성된 프롬프트"로 재작성하세요.

스타일 가이드:
- ${toneGuide}
- ${langGuide}

[원본 요청 시작]
${prompt}
[원본 요청 끝]${answersBlock}`;

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-opus-4-7";

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const response = client.messages.stream({
          model,
          max_tokens: 2400,
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
