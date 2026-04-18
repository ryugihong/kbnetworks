"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Tone = "default" | "concise" | "detailed" | "creative" | "academic";
type Lang = "auto" | "ko" | "en" | "both";
type Phase =
  | "idle"
  | "clarifying"
  | "awaiting"
  | "analyzing"
  | "prompting"
  | "done";

type Analysis = {
  intent?: string;
  goal?: string;
  audience?: string;
  deliverable?: string;
  domain?: string;
  assumptions?: string[];
};

type Question = {
  id: string;
  question: string;
  why?: string;
  suggestions?: string[];
};

const TONE_LABELS: Record<Tone, string> = {
  default: "기본",
  concise: "간결",
  detailed: "상세",
  creative: "창의",
  academic: "학술",
};

const LANG_LABELS: Record<Lang, string> = {
  both: "한/영",
  auto: "자동",
  ko: "한국어",
  en: "English",
};

const ANALYSIS_FIELDS: { key: keyof Analysis; label: string }[] = [
  { key: "intent", label: "의도" },
  { key: "goal", label: "목표" },
  { key: "audience", label: "독자" },
  { key: "deliverable", label: "산출물" },
  { key: "domain", label: "도메인" },
];

const PRESETS: { icon: string; label: string; text: string }[] = [
  { icon: "✎", label: "블로그", text: "블로그 글을 써줘. 주제는 " },
  { icon: "✉", label: "이메일", text: "이메일 초안을 작성해줘. 목적: " },
  { icon: "⟐", label: "요약", text: "다음 내용을 요약해줘:\n\n" },
  {
    icon: "◆",
    label: "코드 리뷰",
    text: "이 코드를 리뷰해줘. 개선점과 이유를 알려줘:\n\n```\n\n```",
  },
  { icon: "⊹", label: "분석", text: "다음 데이터를 분석해줘:\n\n" },
];

const PHASE_HINTS: Record<Phase, string> = {
  idle: "준비 완료",
  clarifying: "핵심 의도를 파악할 질문을 구성하고 있습니다",
  awaiting: "답변을 반영하면 더 정확한 프롬프트를 만들 수 있어요",
  analyzing: "원본과 답변을 종합해 의도를 분석하고 있습니다",
  prompting: "2026년 트렌드와 맥락을 반영해 프롬프트를 구조화하고 있습니다",
  done: "완료 — 결과를 확인하고 복사해 사용하세요",
};

export default function Home() {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysisText, setAnalysisText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [analysisParseFailed, setAnalysisParseFailed] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<Tone>("default");
  const [lang, setLang] = useState<Lang>("both");

  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const firstAnswerRef = useRef<HTMLTextAreaElement | null>(null);

  const canStart = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const resetResults = useCallback(() => {
    setQuestions([]);
    setAnswers({});
    setAnalysisText("");
    setAnalysis(null);
    setAnalysisParseFailed(false);
    setPromptText("");
    setPhase("idle");
  }, []);

  // If user edits input while questions are open, invalidate them
  useEffect(() => {
    if (phase === "awaiting" && questions.length > 0) {
      setQuestions([]);
      setAnswers({});
      setPhase("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    if (phase === "awaiting") {
      requestAnimationFrame(() => firstAnswerRef.current?.focus());
    }
  }, [phase]);

  const parseStream = useCallback((acc: string) => {
    const aClosed = acc.match(/<analysis>([\s\S]*?)<\/analysis>/);
    const aOpen = acc.match(/<analysis>([\s\S]*)$/);
    if (aClosed) {
      const txt = aClosed[1].trim();
      setAnalysisText(txt);
      try {
        const parsed = JSON.parse(txt) as Analysis;
        setAnalysis(parsed);
        setAnalysisParseFailed(false);
      } catch {
        setAnalysis(null);
        setAnalysisParseFailed(true);
      }
    } else if (aOpen) {
      setAnalysisText(aOpen[1]);
      setAnalysis(null);
      setAnalysisParseFailed(false);
    }

    const pMatch = acc.match(/<prompt>([\s\S]*?)(?:<\/prompt>|$)/);
    setPromptText(pMatch ? pMatch[1].replace(/^\s+/, "") : "");

    if (!acc.includes("</analysis>")) setPhase("analyzing");
    else if (!acc.includes("</prompt>")) setPhase("prompting");
    else setPhase("done");
  }, []);

  const runEnhance = useCallback(
    async (passedAnswers: Record<string, string>) => {
      setPhase("analyzing");
      setAnalysisText("");
      setAnalysis(null);
      setAnalysisParseFailed(false);
      setPromptText("");

      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);

      try {
        const answerPayload = questions
          .filter((q) => !!passedAnswers[q.id]?.trim())
          .map((q) => ({
            question: q.question,
            answer: passedAnswers[q.id].trim(),
          }));

        const res = await fetch("/api/enhance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: input,
            tone,
            lang,
            answers: answerPayload,
          }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `요청 실패 (${res.status})`);
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          parseStream(acc);
        }
      } catch (e: unknown) {
        if ((e as { name?: string }).name === "AbortError") {
          setPhase((prev) => (prev === "done" ? "done" : "idle"));
          return;
        }
        setError((e as Error).message || "알 수 없는 오류가 발생했습니다.");
        setPhase("idle");
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [input, tone, lang, questions, parseStream],
  );

  const start = useCallback(async () => {
    if (!canStart) return;
    setError(null);
    resetResults();
    setCopied(false);
    setPhase("clarifying");

    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);

    try {
      const res = await fetch("/api/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `요청 실패 (${res.status})`);
      }
      const data: { questions?: Question[] } = await res.json();
      const qs = (data.questions || []).slice(0, 4);
      setQuestions(qs);
      setAnswers({});
      abortRef.current = null;
      setLoading(false);

      if (qs.length === 0) {
        await runEnhance({});
      } else {
        setPhase("awaiting");
      }
    } catch (e: unknown) {
      if ((e as { name?: string }).name === "AbortError") {
        setPhase("idle");
        setLoading(false);
        abortRef.current = null;
        return;
      }
      setError((e as Error).message || "알 수 없는 오류가 발생했습니다.");
      setPhase("idle");
      setLoading(false);
      abortRef.current = null;
    }
  }, [canStart, input, resetResults, runEnhance]);

  const submitAnswers = useCallback(() => {
    void runEnhance(answers);
  }, [answers, runEnhance]);

  const skipAnswers = useCallback(() => {
    void runEnhance({});
  }, [runEnhance]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const copy = useCallback(async () => {
    if (!promptText) return;
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("클립보드 복사에 실패했습니다.");
    }
  }, [promptText]);

  const clearAll = useCallback(() => {
    setInput("");
    resetResults();
    setError(null);
    setCopied(false);
    textareaRef.current?.focus();
  }, [resetResults]);

  const insertPreset = useCallback((text: string) => {
    setInput((prev) => (prev ? prev + "\n\n" + text : text));
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      const pos = el.value.length;
      el.setSelectionRange(pos, pos);
      el.scrollTop = el.scrollHeight;
    });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void start();
    }
    if (e.key === "Escape" && loading) {
      e.preventDefault();
      stop();
    }
  };

  const stepState = (idx: 1 | 2 | 3): "pending" | "active" | "done" => {
    if (idx === 1) {
      if (phase === "clarifying" || phase === "awaiting") return "active";
      if (
        phase === "analyzing" ||
        phase === "prompting" ||
        phase === "done"
      )
        return "done";
      return "pending";
    }
    if (idx === 2) {
      if (phase === "analyzing") return "active";
      if (phase === "prompting" || phase === "done") return "done";
      return "pending";
    }
    if (phase === "prompting") return "active";
    if (phase === "done") return "done";
    return "pending";
  };

  const hasAnyResult = !!analysisText || !!promptText || questions.length > 0;
  const primaryDisabled = !canStart || phase === "awaiting";
  const primaryLabel =
    phase === "clarifying"
      ? "질문 생성 중"
      : phase === "analyzing" || phase === "prompting"
        ? "강화 중"
        : "프롬프트 강화하기";

  return (
    <>
      {loading && <div className="progress-rail" aria-hidden="true" />}

      <main className="container">
        <header className="header">
          <h1>Prompt Enhancer</h1>
          <p>
            자유롭게 작성한 요청을 AI가 먼저 이해하고, 필요한 것만 되물어
            맞춤화합니다. 2026년 최신 맥락·트렌드를 반영해 목표·조건·형식·제약이
            명확한 프롬프트로 다듬어 드려요.
          </p>
        </header>

        <section className="options" aria-label="스타일 옵션">
          <ChipGroup
            label="톤"
            options={Object.keys(TONE_LABELS) as Tone[]}
            labels={TONE_LABELS}
            value={tone}
            onChange={(v) => setTone(v as Tone)}
          />
          <ChipGroup
            label="언어"
            options={Object.keys(LANG_LABELS) as Lang[]}
            labels={LANG_LABELS}
            value={lang}
            onChange={(v) => setLang(v as Lang)}
          />
        </section>

        <Stepper
          s1={stepState(1)}
          s2={stepState(2)}
          s3={stepState(3)}
          phase={phase}
          error={!!error}
        />

        <section className="grid" aria-label="입력과 결과">
          <article className="glass card" aria-label="원본 입력">
            <div className="card-head">
              <h2>원본 입력</h2>
              <span className="status" aria-live="polite">
                {input.length.toLocaleString()}자
              </span>
            </div>

            <div
              className="presets"
              aria-label="자주 쓰는 시작 템플릿"
              role="group"
            >
              {PRESETS.map((p) => (
                <button
                  type="button"
                  key={p.label}
                  className="preset"
                  onClick={() => insertPreset(p.text)}
                  aria-label={`${p.label} 템플릿 삽입`}
                >
                  <span className="preset-icon" aria-hidden="true">
                    {p.icon}
                  </span>
                  {p.label}
                </button>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              placeholder={
                "예) 블로그 글을 써줘. 주제는 AI 트렌드.\n" +
                "예) 신규 서비스 출시 이메일 작성해줘.\n\n" +
                "Cmd/Ctrl + Enter 로 실행 · Esc 로 중단"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              aria-label="원본 프롬프트"
              aria-describedby="kbd-hint"
            />

            <div className="toolbar">
              <button
                type="button"
                className="btn-primary"
                onClick={start}
                disabled={primaryDisabled}
                aria-busy={loading || undefined}
              >
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    {primaryLabel}
                  </>
                ) : (
                  primaryLabel
                )}
              </button>
              {loading ? (
                <button type="button" onClick={stop} aria-label="중단">
                  중단
                </button>
              ) : (
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={!input && !hasAnyResult}
                >
                  초기화
                </button>
              )}
              <span className="phase-hint" id="kbd-hint">
                {PHASE_HINTS[phase]}
              </span>
              {error && (
                <span className="status error" role="alert">
                  {error}
                </span>
              )}
            </div>
          </article>

          <div className="stack">
            {phase === "awaiting" && questions.length > 0 && (
              <ClarifyCard
                questions={questions}
                answers={answers}
                onChange={(id, v) =>
                  setAnswers((prev) => ({ ...prev, [id]: v }))
                }
                onSubmit={submitAnswers}
                onSkip={skipAnswers}
                firstAnswerRef={firstAnswerRef}
              />
            )}

            <AnalysisCard
              analysis={analysis}
              raw={analysisText}
              failed={analysisParseFailed}
              phase={phase}
            />

            <article
              className="glass card"
              aria-label="강화된 프롬프트"
              aria-live="polite"
              aria-atomic="false"
            >
              <div className="card-head">
                <h2>강화된 프롬프트</h2>
                <span className="status">
                  {promptText.length.toLocaleString()}자
                </span>
              </div>
              <div
                className={`output${promptText ? "" : " empty"}`}
                role="region"
                aria-label="강화된 프롬프트 결과"
              >
                {promptText ||
                  (phase === "prompting"
                    ? "프롬프트를 생성하고 있습니다…"
                    : "질문에 답하면 맞춤 프롬프트가 이곳에 스트리밍됩니다.")}
              </div>
              <div className="toolbar">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={copy}
                  disabled={!promptText || loading}
                  aria-label={copied ? "복사됨" : "프롬프트 복사"}
                >
                  {copied ? "복사됨 ✓" : "복사"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!promptText) return;
                    setInput(promptText);
                    requestAnimationFrame(() =>
                      textareaRef.current?.focus(),
                    );
                  }}
                  disabled={!promptText || loading}
                >
                  입력으로 옮기기
                </button>
              </div>
            </article>
          </div>
        </section>

        <p className="footer">
          Powered by Anthropic Claude · 2026년 기준 지식 및 트렌드를 반영해
          작성되며, 결과는 그대로 복사해 다른 AI 도구에 붙여넣어 사용할 수
          있습니다.
        </p>

        <span className="sr-only" role="status" aria-live="polite">
          {PHASE_HINTS[phase]}
        </span>
      </main>

      <nav className="bottom-bar" aria-label="모바일 주요 동작">
        {phase === "awaiting" ? (
          <>
            <button
              type="button"
              className="btn-primary"
              onClick={submitAnswers}
            >
              답변 반영해 강화
            </button>
            <button type="button" onClick={skipAnswers}>
              건너뛰기
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn-primary"
              onClick={start}
              disabled={primaryDisabled}
            >
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  {primaryLabel}
                </>
              ) : (
                primaryLabel
              )}
            </button>
            {loading ? (
              <button type="button" onClick={stop}>
                중단
              </button>
            ) : (
              <button
                type="button"
                onClick={copy}
                disabled={!promptText || loading}
              >
                {copied ? "복사됨 ✓" : "복사"}
              </button>
            )}
          </>
        )}
      </nav>
    </>
  );
}

function Stepper({
  s1,
  s2,
  s3,
  phase,
  error,
}: {
  s1: "pending" | "active" | "done";
  s2: "pending" | "active" | "done";
  s3: "pending" | "active" | "done";
  phase: Phase;
  error: boolean;
}) {
  return (
    <nav
      className="stepper"
      aria-label="강화 진행 단계"
      aria-current={
        phase === "clarifying" ||
        phase === "awaiting" ||
        phase === "analyzing" ||
        phase === "prompting"
          ? "step"
          : undefined
      }
    >
      <div className={`step ${s1}`} aria-label={`1단계 의도 질의 ${s1}`}>
        <span className="num" aria-hidden="true">
          {s1 === "done" ? "✓" : "1"}
        </span>
        <span>의도 질의</span>
      </div>
      <span
        className={`step-connector${s1 === "done" ? " done" : ""}`}
        aria-hidden="true"
      />
      <div className={`step ${s2}`} aria-label={`2단계 의도 분석 ${s2}`}>
        <span className="num" aria-hidden="true">
          {s2 === "done" ? "✓" : "2"}
        </span>
        <span>의도 분석</span>
      </div>
      <span
        className={`step-connector${s2 === "done" ? " done" : ""}`}
        aria-hidden="true"
      />
      <div className={`step ${s3}`} aria-label={`3단계 프롬프트 강화 ${s3}`}>
        <span className="num" aria-hidden="true">
          {s3 === "done" ? "✓" : "3"}
        </span>
        <span>프롬프트 강화</span>
      </div>
      {error && (
        <span
          className="status error"
          role="alert"
          style={{ marginLeft: 4 }}
        >
          오류 발생
        </span>
      )}
    </nav>
  );
}

function ClarifyCard({
  questions,
  answers,
  onChange,
  onSubmit,
  onSkip,
  firstAnswerRef,
}: {
  questions: Question[];
  answers: Record<string, string>;
  onChange: (id: string, v: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  firstAnswerRef: React.RefObject<HTMLTextAreaElement>;
}) {
  const answeredCount = questions.filter(
    (q) => (answers[q.id] || "").trim().length > 0,
  ).length;

  return (
    <article className="glass card clarify-card" aria-label="명확화 질문">
      <div className="card-head">
        <h2>의도 질의 · {questions.length}개</h2>
        <span className="status">
          {answeredCount}/{questions.length} 답변
        </span>
      </div>

      <p className="clarify-intro">
        더 정확한 결과를 위해 몇 가지만 확인할게요. 원하는 것만 답하시거나
        건너뛸 수 있습니다.
      </p>

      <div className="clarify-list">
        {questions.map((q, idx) => {
          const value = answers[q.id] || "";
          return (
            <div className="clarify-item" key={q.id}>
              <label className="clarify-q" htmlFor={`q_${q.id}`}>
                <span className="clarify-num" aria-hidden="true">
                  Q{idx + 1}
                </span>
                {q.question}
              </label>
              {q.why && <p className="clarify-why">{q.why}</p>}
              {q.suggestions && q.suggestions.length > 0 && (
                <div className="clarify-suggestions" role="group">
                  {q.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`preset${value === s ? " active" : ""}`}
                      onClick={() => onChange(q.id, s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <textarea
                id={`q_${q.id}`}
                ref={idx === 0 ? firstAnswerRef : null}
                className="clarify-input"
                placeholder="직접 답변 (비워두고 건너뛸 수 있습니다)"
                value={value}
                onChange={(e) => onChange(q.id, e.target.value)}
                rows={2}
                spellCheck={false}
              />
            </div>
          );
        })}
      </div>

      <div className="toolbar">
        <button type="button" className="btn-primary" onClick={onSubmit}>
          답변 반영해 강화
        </button>
        <button type="button" onClick={onSkip}>
          건너뛰기
        </button>
      </div>
    </article>
  );
}

function AnalysisCard({
  analysis,
  raw,
  failed,
  phase,
}: {
  analysis: Analysis | null;
  raw: string;
  failed: boolean;
  phase: Phase;
}) {
  const empty = !raw && !analysis;

  return (
    <article
      className="glass card analysis-card"
      aria-label="감지된 의도 분석"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="card-head">
        <h2>의도 분석</h2>
        {phase === "analyzing" && (
          <span className="status">
            <span className="spinner" aria-hidden="true" />
            분석 중
          </span>
        )}
      </div>

      {empty ? (
        <div className="analysis-empty">
          {phase === "analyzing"
            ? "원본과 답변을 바탕으로 의도를 파악하고 있습니다…"
            : "감지된 의도가 이곳에 표시됩니다."}
        </div>
      ) : analysis ? (
        <dl className="analysis-dl">
          {ANALYSIS_FIELDS.map(({ key, label }) =>
            analysis[key] ? (
              <div className="analysis-row" key={key}>
                <dt>{label}</dt>
                <dd>{analysis[key] as string}</dd>
              </div>
            ) : null,
          )}
          {analysis.assumptions && analysis.assumptions.length > 0 && (
            <div className="analysis-row">
              <dt>가정</dt>
              <dd>
                <ul>
                  {analysis.assumptions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      ) : (
        <pre className="analysis-raw">
          {failed
            ? `${raw}\n\n(JSON 파싱에 실패해 원문을 표시합니다.)`
            : raw}
        </pre>
      )}
    </article>
  );
}

function ChipGroup<T extends string>({
  label,
  options,
  labels,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  labels: Record<T, string>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="chip-group" role="radiogroup" aria-label={label}>
      <span className="chip-group-label">{label}</span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          className={`chip${value === opt ? " active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {labels[opt]}
        </button>
      ))}
    </div>
  );
}
