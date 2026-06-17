export function KobisMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="3.6" strokeLinecap="round">
        <circle cx="50" cy="50" r="44" />
        <ellipse cx="50" cy="50" rx="17" ry="44" />
        <ellipse cx="50" cy="50" rx="44" ry="17" />
        <line x1="50" y1="6" x2="50" y2="94" />
        <line x1="6" y1="50" x2="94" y2="50" />
      </g>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        <line x1="50" y1="40" x2="50" y2="60" />
        <line x1="40" y1="50" x2="60" y2="50" />
      </g>
    </svg>
  );
}
