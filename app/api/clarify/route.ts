import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `당신은 사용자의 자유 요청을 받아, 답변 품질을 크게 개선할 "명확화 질문"을 생성하는 프롬프트 엔지니어입니다.

규칙:
- 0~4개의 질문만 생성합니다. 원본에 이미 답이 있으면 묻지 않습니다. 원본이 매우 구체적이면 빈 배열도 허용됩니다.
- 결과 품질에 가장 큰 영향을 주는 것부터 우선합니다 (용도/사용 맥락, 대상 독자, 원하는 산출물 형식, 톤, 길이, 제약 조건, 성공 기준).
- 각 질문은 짧고 구체적입니다 (가능하면 15단어 이내, 닫힌 질문 선호).
- 각 질문에는 2~5개의 "suggestions"을 포함합니다. 사용자가 클릭 한 번으로 답할 수 있도록 현실적이고 상호 배타적인 선택지로 구성합니다.
- suggestions 외에 자유 서술도 가능함을 전제로 작성합니다.
- "why"는 왜 이 질문이 결과를 개선하는지 한 줄로 설명합니다.

출력은 아래 JSON 하나만. 설명/머리말/코드펜스 금지.

{
  "questions": [
    {
      "id": "snake_case_식별자",
      "question": "한국어 질문문장",
      "why": "왜 이 질문이 중요한지 한 줄",
      "suggestions": ["선택지 1", "선택지 2", "선택지 3"]
    }
  ]
}`;

type QuestionOut = {
  id: string;
  question: string;
  why?: string;
  suggestions?: string[];
};

function extractJson(text: string): { questions: QuestionOut[] } | null {
  const tryParse = (s: string) => {
    try {
      return JSON.parse(s) as { questions?: QuestionOut[] };
    } catch {
      return null;
    }
  };
  const direct = tryParse(text.trim());
  if (direct?.questions) return { questions: direct.questions };
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    const parsed = tryParse(match[0]);
    if (parsed?.questions) return { questions: parsed.questions };
  }
  return null;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "서버에 ANTHROPIC_API_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  let body: { prompt?: string };
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

  const client = new Anthropic({ apiKey });
  const model = process.env.ANTHROPIC_MODEL || "claude-opus-4-7";

  try {
    const resp = await client.messages.create({
      model,
      max_tokens: 900,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `다음 원본 요청을 분석해 명확화 질문을 생성하세요.

[원본 요청 시작]
${prompt}
[원본 요청 끝]`,
        },
      ],
    });

    const text = resp.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    const parsed = extractJson(text);
    if (!parsed) {
      return Response.json({ questions: [] });
    }

    const questions = (parsed.questions || [])
      .filter(
        (q): q is QuestionOut =>
          typeof q?.id === "string" && typeof q?.question === "string",
      )
      .slice(0, 4)
      .map((q, idx) => ({
        id: q.id || `q_${idx}`,
        question: q.question,
        why: typeof q.why === "string" ? q.why : undefined,
        suggestions: Array.isArray(q.suggestions)
          ? q.suggestions.filter((s) => typeof s === "string").slice(0, 5)
          : undefined,
      }));

    return Response.json({ questions });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "명확화 질문 생성 중 오류가 발생했습니다.";
    return Response.json({ error: message }, { status: 500 });
  }
}
