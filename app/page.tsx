"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type Tone = "default" | "concise" | "detailed" | "creative" | "academic";
type Lang = "auto" | "ko" | "en" | "both";
type Phase = "idle" | "analyzing" | "prompting" | "done";

type Analysis = {
  intent?: string;
  goal?: string;
  audience?: string;
  deliverable?: string;
  domain?: string;
  assumptions?: string[];
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
  {
    icon: "✎",
    label: "블로그",
    text: "블로그 글을 써줘. 주제는 ",
  },
  {
    icon: "✉",
    label: "이메일",
    text: "이메일 초안을 작성해줘. 목적: ",
  },
  {
    icon: "⟐",
    label: "요약",
    text: "다음 내용을 요약해줘:\n\n",
  },
  {
    icon: "◆",
    label: "코드 리뷰",
    text: "이 코드를 리뷰해줘. 개선점과 이유를 알려줘:\n\n```\n\n```",
  },
  {
    icon: "⊹",
    label: "분석",
    text: "다음 데이터를 분석해줘:\n\n",
  },
];

const PHASE_HINTS: Record<Phase, string> = {
  idle: "준비 완료",
  analyzing: "원본의 의도·독자·산출물을 파악하고 있습니다",
  prompting: "완성된 프롬프트를 구조화해 작성하고 있습니다",
  done: "완료 — 결과를 확인하고 복사해 사용하세요",
};

export default function Home() {
  const [input, setInput] = useState("");
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

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const resetResults = useCallback(() => {
    setAnalysisText("");
    setAnalysis(null);
    setAnalysisParseFailed(false);
    setPromptText("");
    setPhase("idle");
  }, []);

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

  const enhance = useCallback(async () => {
    if (!canSubmit) return;
    setError(null);
    resetResults();
    setCopied(false);
    setPhase("analyzing");
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, tone, lang }),
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
  }, [canSubmit, input, tone, lang, parseStream, resetResults]);

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

  const insertPreset = useCallback(
    (text: string) => {
      setInput((prev) => (prev ? prev + "\n\n" + text : text));
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.focus();
        const pos = el.value.length;
        el.setSelectionRange(pos, pos);
        el.scrollTop = el.scrollHeight;
      });
    },
    [],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void enhance();
    }
    if (e.key === "Escape" && loading) {
      e.preventDefault();
      stop();
    }
  };

  const stepState = (idx: 1 | 2): "pending" | "active" | "done" => {
    if (idx === 1) {
      if (phase === "analyzing") return "active";
      if (phase === "prompting" || phase === "done") return "done";
      return "pending";
    }
    if (phase === "prompting") return "active";
    if (phase === "done") return "done";
    return "pending";
  };

  const hasAnyResult = !!analysisText || !!promptText;

  return (
    <>
      {loading && <div className="progress-rail" aria-hidden="true" />}

      <main className="container">
        <header className="header">
          <h1>Prompt Enhancer</h1>
          <p>
            자유롭게 작성한 요청의 의도를 분석해 AI가 최적의 답변을 낼 수 있는
            프롬프트로 다듬습니다. 의도 분석 → 프롬프트 강화 2단계로 과정을
            투명하게 보여드려요.
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
                onClick={enhance}
                disabled={!canSubmit}
                aria-busy={loading || undefined}
              >
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    강화 중
                  </>
                ) : (
                  "프롬프트 강화하기"
                )}
              </button>
              {loading ? (
                <button type="button" onClick={stop} aria-label="생성 중단">
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
                    : "좌측에 원본을 입력하고 ‘프롬프트 강화하기’를 눌러주세요.")}
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
          Powered by Anthropic Claude · 결과는 그대로 복사해 다른 AI 도구에
          붙여넣어 사용할 수 있습니다.
        </p>

        <span className="sr-only" role="status" aria-live="polite">
          {PHASE_HINTS[phase]}
        </span>
      </main>

      <nav className="bottom-bar" aria-label="모바일 주요 동작">
        <button
          type="button"
          className="btn-primary"
          onClick={enhance}
          disabled={!canSubmit}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              강화 중
            </>
          ) : (
            "프롬프트 강화하기"
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
      </nav>
    </>
  );
}

function Stepper({
  s1,
  s2,
  phase,
  error,
}: {
  s1: "pending" | "active" | "done";
  s2: "pending" | "active" | "done";
  phase: Phase;
  error: boolean;
}) {
  const connectorDone = s1 === "done";
  return (
    <nav
      className="stepper"
      aria-label="강화 진행 단계"
      aria-current={
        phase === "analyzing"
          ? "step"
          : phase === "prompting"
            ? "step"
            : undefined
      }
    >
      <div className={`step ${s1}`} aria-label={`1단계 의도 분석 ${s1}`}>
        <span className="num" aria-hidden="true">
          {s1 === "done" ? "✓" : "1"}
        </span>
        <span>의도 분석</span>
      </div>
      <span
        className={`step-connector${connectorDone ? " done" : ""}`}
        aria-hidden="true"
      />
      <div className={`step ${s2}`} aria-label={`2단계 프롬프트 강화 ${s2}`}>
        <span className="num" aria-hidden="true">
          {s2 === "done" ? "✓" : "2"}
        </span>
        <span>프롬프트 강화</span>
      </div>
      {error && (
        <span className="status error" role="alert" style={{ marginLeft: 4 }}>
          오류 발생
        </span>
      )}
    </nav>
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
            ? "원본 요청의 의도를 파악하고 있습니다…"
            : "요청을 제출하면 감지된 의도가 이곳에 표시됩니다."}
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
