type Props = {
  /** show the masked grid overlay */
  grid?: boolean;
  /** blob intensity preset */
  variant?: "hero" | "section";
  className?: string;
};

/** Decorative dark backdrop: subtle grid + floating gradient blobs. Purely CSS. */
export function AnimatedBackground({ grid = true, variant = "section", className = "" }: Props) {
  const isHero = variant === "hero";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {grid && <div className="absolute inset-0 grid-bg" />}
      <div
        className="blob animate-float"
        style={{
          width: isHero ? 460 : 340,
          height: isHero ? 460 : 340,
          top: isHero ? "-8%" : "-12%",
          right: "6%",
          background: "radial-gradient(circle at 30% 30%, #2F7BFF, transparent 65%)",
        }}
      />
      <div
        className="blob animate-float-slow"
        style={{
          width: isHero ? 380 : 280,
          height: isHero ? 380 : 280,
          bottom: "-10%",
          left: "2%",
          background: "radial-gradient(circle at 50% 50%, #8B5CF6, transparent 65%)",
        }}
      />
      {isHero && (
        <div
          className="blob animate-float"
          style={{
            width: 300,
            height: 300,
            top: "30%",
            left: "42%",
            background: "radial-gradient(circle at 50% 50%, #00E5FF, transparent 70%)",
            opacity: 0.35,
          }}
        />
      )}
    </div>
  );
}
