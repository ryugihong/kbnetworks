"use client";

import { useCallback, useMemo, useRef, useState } from "react";

type Tone = "default" | "concise" | "detailed" | "creative" | "academic";
type Lang = "auto" | "ko" | "en";

const TONE_LABELS: Record<Tone, string> = {
  default: "기본",
  concise: "간결",
  detailed: "상세",
  creative: "창의",
  academic: "학술",
};

const LANG_LABELS: Record<Lang, string> = {
  auto: "자동",
  ko: "한국어",
  en: "English",
};

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<Tone>("default");
  const [lang, setLang] = useState<Lang>("auto");
  const abortRef = useRef<AbortController | null>(null);

  const canSubmit = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  const enhance = useCallback(async () => {
    if (!canSubmit) return;
    setError(null);
    setOutput("");
    setCopied(false);
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
        setOutput(acc);
      }
    } catch (e: unknown) {
      if ((e as { name?: string }).name === "AbortError") return;
      setError((e as Error).message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [canSubmit, input, tone, lang]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const copy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("클립보드 복사에 실패했습니다.");
    }
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setCopied(false);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void enhance();
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Prompt Enhancer</h1>
        <p>
          자유롭게 작성한 요청의 의도를 분석해 AI가 최적의 답변을 낼 수 있는
          완벽한 프롬프트로 자동 변환합니다. 역할, 맥락, 제약, 출력 형식까지
          구조화된 프롬프트로 다듬어드립니다.
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

      <section className="grid">
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
                disabled={!input && !output}
              >
                초기화
              </button>
            )}
            {error && <span className="status error">{error}</span>}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h2>강화된 프롬프트</h2>
            <span className="status">{output.length.toLocaleString()}자</span>
          </div>
          <div className={`output${output ? "" : " empty"}`}>
            {output ||
              "결과가 이곳에 표시됩니다. 좌측에 원본을 입력하고 ‘프롬프트 강화하기’를 눌러주세요."}
          </div>
          <div className="toolbar">
            <button
              className="btn-primary"
              onClick={copy}
              disabled={!output || loading}
            >
              {copied ? "복사됨 ✓" : "복사"}
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                if (!output) return;
                setInput(output);
              }}
              disabled={!output || loading}
            >
              입력으로 옮기기
            </button>
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
