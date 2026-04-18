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
  }, [resetResults]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void enhance();
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
    <main className="container">
      <header className="header">
        <h1>Prompt Enhancer</h1>
        <p>
          자유롭게 작성한 요청의 의도를 분석해 AI가 최적의 답변을 낼 수 있는
          완벽한 프롬프트로 자동 변환합니다. 의도 분석 → 프롬프트 강화 2단계로
          결과를 확인할 수 있습니다.
        </p>
      </header>

      <section className="options" aria-label="옵션">
        <OptionGroup
          label="톤"
          options={Object.keys(TONE_LABELS) as Tone[]}
          labels={TONE_LABELS}
          value={tone}
          onChange={(v) => setTone(v as Tone)}
        />
        <OptionGroup
          label="언어"
          options={Object.keys(LANG_LABELS) as Lang[]}
          labels={LANG_LABELS}
          value={lang}
          onChange={(v) => setLang(v as Lang)}
        />
      </section>

      <Stepper s1={stepState(1)} s2={stepState(2)} />

      <section className="grid grid-stack">
        <div className="card">
          <div className="card-head">
            <h2>원본 입력</h2>
            <span className="status">{input.length.toLocaleString()}자</span>
          </div>
          <textarea
            placeholder={
              "예) 블로그 글을 써줘. 주제는 AI 트렌드.\n" +
              "예) 신규 서비스 출시 이메일 작성해줘.\n\n" +
              "Cmd/Ctrl + Enter 로 실행"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
          />
          <div className="toolbar">
            <button
              className="btn-primary"
              onClick={enhance}
              disabled={!canSubmit}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  강화 중...
                </>
              ) : (
                "프롬프트 강화하기"
              )}
            </button>
            {loading ? (
              <button className="btn-ghost" onClick={stop}>
                중단
              </button>
            ) : (
              <button
                className="btn-ghost"
                onClick={clearAll}
                disabled={!input && !hasAnyResult}
              >
                초기화
              </button>
            )}
            {error && <span className="status error">{error}</span>}
          </div>
        </div>

        <div className="stack">
          <AnalysisCard
            analysis={analysis}
            raw={analysisText}
            failed={analysisParseFailed}
            phase={phase}
          />

          <div className="card">
            <div className="card-head">
              <h2>강화된 프롬프트</h2>
              <span className="status">
                {promptText.length.toLocaleString()}자
              </span>
            </div>
            <div className={`output${promptText ? "" : " empty"}`}>
              {promptText ||
                (phase === "prompting"
                  ? "프롬프트 생성 중..."
                  : "좌측에 원본을 입력하고 ‘프롬프트 강화하기’를 눌러주세요.")}
            </div>
            <div className="toolbar">
              <button
                className="btn-primary"
                onClick={copy}
                disabled={!promptText || loading}
              >
                {copied ? "복사됨 ✓" : "복사"}
              </button>
              <button
                className="btn-ghost"
                onClick={() => {
                  if (!promptText) return;
                  setInput(promptText);
                }}
                disabled={!promptText || loading}
              >
                입력으로 옮기기
              </button>
            </div>
          </div>
        </div>
      </section>

      <p className="footer">
        Powered by Anthropic Claude · 결과는 그대로 복사해 다른 AI 도구에
        붙여넣어 사용할 수 있습니다.
      </p>
    </main>
  );
}

function Stepper({
  s1,
  s2,
}: {
  s1: "pending" | "active" | "done";
  s2: "pending" | "active" | "done";
}) {
  return (
    <nav className="stepper" aria-label="진행 단계">
      <div className={`step ${s1}`}>
        <span className="num">{s1 === "done" ? "✓" : "1"}</span>
        <span>의도 분석</span>
      </div>
      <div className={`step ${s2}`}>
        <span className="num">{s2 === "done" ? "✓" : "2"}</span>
        <span>프롬프트 강화</span>
      </div>
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
  const showRawFallback = failed || (!analysis && raw.length > 0);
  const empty = !raw && !analysis;

  return (
    <div className="card analysis-card">
      <div className="card-head">
        <h2>의도 분석</h2>
        {phase === "analyzing" && (
          <span className="status">
            <span className="spinner spinner-muted" />
            분석 중
          </span>
        )}
      </div>
      {empty ? (
        <div className="output empty analysis-empty">
          {phase === "analyzing"
            ? "원본 요청의 의도를 파악하고 있습니다..."
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
          {showRawFallback && failed
            ? `${raw}\n\n(JSON 파싱에 실패했습니다. 원문을 표시합니다.)`
            : raw}
        </pre>
      )}
    </div>
  );
}

function OptionGroup<T extends string>({
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
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{label}</span>
      {options.map((opt) => (
        <label
          key={opt}
          className={`chip${value === opt ? " active" : ""}`}
          onClick={() => onChange(opt)}
        >
          <input
            type="radio"
            name={label}
            checked={value === opt}
            onChange={() => onChange(opt)}
            style={{ display: "none" }}
          />
          {labels[opt]}
        </label>
      ))}
    </div>
  );
}
