import { Link } from "@tanstack/react-router";

type VantaLogoProps = {
  href?: boolean;
  compact?: boolean;
  className?: string;
};

export function VantaLogo({ href = true, compact = false, className = "" }: VantaLogoProps) {
  const mark = (
    <svg viewBox="0 0 100 58" aria-hidden="true" className={compact ? "h-9 w-auto" : "h-11 w-auto"}>
      <path d="M8 10 L25 10 L42 39 L76 5 L92 5 L46 53 Z" fill="currentColor" />
      <path d="M46 53 L42 39 L76 5 L92 5 L52 48 Z" fill="currentColor" opacity="0.92" />
    </svg>
  );

  const content = (
    <span className={`inline-flex items-center gap-2 text-current ${className}`}>
      <span className="shrink-0">{mark}</span>
      {!compact && (
        <span className="font-display text-[25px] font-extrabold leading-none tracking-[0.24em]">VANTA</span>
      )}
    </span>
  );

  return href ? <Link to="/" aria-label="VANTA — início">{content}</Link> : content;
}
