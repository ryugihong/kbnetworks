export function AnnouncementBar() {
  return (
    <div className="relative z-[60] bg-dopamine bg-[length:200%_100%] animate-gradient-pan text-[#03121a]">
      <div className="container-x flex items-center justify-center gap-2.5 py-2 text-center text-[12px] font-semibold tracking-tight">
        <span className="relative hidden h-1.5 w-1.5 sm:inline-flex">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#03121a]/50" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#03121a]" />
        </span>
        <span className="truncate">
          2026 FIFA 월드컵 — 대한민국 대표팀 6/22 몬테레이 Estadio BBVA · Parque Fundidora Fan Festival · KOBIS GLOBAL 1호점 직접 수혜
        </span>
      </div>
    </div>
  );
}
