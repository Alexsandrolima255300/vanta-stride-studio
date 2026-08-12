import type { CSSProperties } from "react";

type ShoeBrandOverlayProps = {
  tone?: "dark" | "light";
  compact?: boolean;
};

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 58" aria-hidden="true" className={className}>
      <path d="M8 10 L25 10 L42 39 L76 5 L92 5 L46 53 Z" fill="currentColor" />
      <path d="M46 53 L42 39 L76 5 L92 5 L52 48 Z" fill="currentColor" opacity="0.92" />
    </svg>
  );
}

export function ShoeBrandOverlay({ tone = "dark", compact = false }: ShoeBrandOverlayProps) {
  const light = tone === "light";
  const base = light ? "#111111" : "#f5f5f5";
  const shadow = light ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.78)";
  const highlight = light ? "rgba(255,255,255,0.24)" : "rgba(255,255,255,0.34)";

  const printedStyle: CSSProperties = {
    color: base,
    textShadow: `0 1px 0 ${shadow}, 0 -0.5px 0 ${highlight}`,
    filter: "drop-shadow(0 1px 1px rgba(0,0,0,.2))",
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none" aria-hidden="true">
      {/* Small heel/tongue mark */}
      <div
        className="absolute right-[14%] top-[12%] flex items-center justify-center"
        style={{
          width: compact ? "48px" : "64px",
          height: compact ? "48px" : "64px",
          transform: "rotate(-10deg)",
          opacity: 0.88,
          mixBlendMode: light ? "multiply" : "screen",
        }}
      >
        <Mark className="h-full w-full" />
      </div>

      {/* Larger side branding */}
      <div
        className="absolute right-[17%] top-[52%] flex items-center gap-1"
        style={{
          transform: "rotate(-5deg) skewX(-4deg)",
          opacity: light ? 0.72 : 0.9,
          mixBlendMode: light ? "multiply" : "screen",
        }}
      >
        <Mark className={compact ? "h-4 w-7" : "h-6 w-10"} />
        <span
          className={compact ? "text-[6px] tracking-[0.16em]" : "text-[8px] tracking-[0.18em]"}
          style={{ ...printedStyle, fontFamily: "var(--font-display)", fontWeight: 800 }}
        >
          VANTA
        </span>
      </div>

      {/* Subtle emboss edge */}
      <div
        className="absolute right-[16.6%] top-[51.8%] h-6 w-24 rounded-full blur-[2px]"
        style={{
          opacity: light ? 0.08 : 0.13,
          transform: "rotate(-5deg)",
          background: light
            ? "radial-gradient(circle, rgba(0,0,0,.45), transparent 68%)"
            : "radial-gradient(circle, rgba(255,255,255,.35), transparent 68%)",
        }}
      />
    </div>
  );
}
