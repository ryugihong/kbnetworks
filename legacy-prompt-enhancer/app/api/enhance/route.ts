import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tone = "default" | "concise" | "detailed" | "creative" | "academic";
type Lang = "auto" | "ko" | "en";

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
};

const SYSTEM_PROMPT = `당신은 세계 최고 수준의 "프롬프트 엔지니어"입니다.
사용자가 자유롭게 작성한 요청을, 모든 AI(Claude/GPT/Gemini 등)가 최상의 답변을 낼 수 있는 "완성된 프롬프트"로 재작성하는 것이 당신의 임무입니다.

반드시 다음 절차를 내부적으로 수행하세요(결과에 과정은 노출하지 않음):
1. 원본의 근본 의도(Goal)와 최종 산출물(Deliverable)을 파악한다.
2. 대상 독자/사용 맥락/도메인을 추론한다. 누락된 정보는 합리적 기본값을 가정하되, 필요한 경우 "명확화 질문"을 마지막 섹션에 1~3개만 덧붙인다.
3. 모호함/중의성을 제거하고, 품질을 끌어올릴 제약·평가 기준을 추가한다.

출력은 아래 구조의 "완성된 프롬프트" 하나로 작성합니다. 설명/머리말/맺음말, 코드펜스 없이 프롬프트 본문만 출력합니다.

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

중요 규칙:
- 프롬프트 본문만 그대로 복사해 다른 AI에게 붙여넣어 사용할 수 있어야 함
- 메타 설명(예: "다음은 강화된 프롬프트입니다") 금지
- 원본에 없는 사실을 단정하지 말고, 가정은 "가정:"이라고 명시
- 코드 블록으로 감싸지 말 것`;

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
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

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
