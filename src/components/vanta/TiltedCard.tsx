import { useRef, useState, type CSSProperties, type MouseEvent } from "react";

type TiltedCardProps = {
  imageSrc: string;
  altText: string;
  captionText?: string;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
};

export default function TiltedCard({
  imageSrc,
  altText,
  captionText,
  className = "",
  rotateAmplitude = 12,
  scaleOnHover = 1.05,
  showTooltip = true,
  displayOverlayContent = false,
  overlayContent,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const rotateY = (percentX - 0.5) * rotateAmplitude * 2;
    const rotateX = (0.5 - percentY) * rotateAmplitude * 2;

    setTransform(
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`,
    );
    setGlare({ x: percentX * 100, y: percentY * 100, opacity: 0.22 });
  };

  const reset = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
    setGlare((current) => ({ ...current, opacity: 0 }));
  };

  const cardStyle: CSSProperties = {
    transform,
    transformStyle: "preserve-3d",
  };

  return (
    <div
      ref={cardRef}
      className={`group/tilt relative w-full overflow-hidden bg-black ${className}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      <img
        src={imageSrc}
        alt={altText}
        width={900}
        height={900}
        loading="lazy"
        draggable={false}
        className="aspect-square w-full object-cover select-none"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/tilt:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, rgba(255,255,255,0.06) 22%, transparent 52%)`,
        }}
      />

      {displayOverlayContent && overlayContent ? (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10">
          {overlayContent}
        </div>
      ) : null}

      {showTooltip && captionText ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full border border-white/15 bg-black/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/tilt:translate-y-0 group-hover/tilt:opacity-100">
          {captionText}
        </div>
      ) : null}
    </div>
  );
}
