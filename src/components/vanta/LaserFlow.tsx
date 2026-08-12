import { useEffect, useRef } from "react";

type LaserFlowProps = {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
  horizontalSizing?: number;
  verticalSizing?: number;
  wispDensity?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowSpeed?: number;
  flowStrength?: number;
  fogIntensity?: number;
  fogScale?: number;
  fogFallSpeed?: number;
  decay?: number;
  falloffStart?: number;
};

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const number = Number.parseInt(normalized, 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

export default function LaserFlow({
  horizontalBeamOffset = 0,
  verticalBeamOffset = 0,
  color = "#d8dde5",
  horizontalSizing = 0.7,
  verticalSizing = 1.2,
  wispDensity = 1,
  wispSpeed = 10,
  wispIntensity = 2,
  flowSpeed = 0.35,
  flowStrength = 0.25,
  fogIntensity = 0.35,
  fogScale = 0.5,
  fogFallSpeed = 0.35,
  decay = 1.1,
  falloffStart = 1.1,
}: LaserFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const rgb = hexToRgb(color);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const draw = () => {
      frame += 0.008 * (wispSpeed / 10);
      context.clearRect(0, 0, width, height);

      const cx = width * (0.5 + horizontalBeamOffset * 0.35);
      const cy = height * (0.5 + verticalBeamOffset * 0.35);
      const min = Math.min(width, height);
      const beamWidth = Math.max(70, min * 0.18 * horizontalSizing);
      const beamHeight = Math.max(90, min * 0.38 * verticalSizing);

      context.save();
      context.globalCompositeOperation = "screen";

      const glow = context.createRadialGradient(cx, cy, 0, cx, cy, min * 0.78);
      glow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.11 * fogIntensity})`);
      glow.addColorStop(0.38, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.045 * fogIntensity})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < Math.ceil(8 * wispDensity); i += 1) {
        const phase = frame * flowSpeed + i * 0.91;
        const y = cy + Math.sin(phase * 1.7 + i) * beamHeight * 0.8;
        const x = ((phase * 110 * flowStrength + i * 83) % (width + beamWidth * 2)) - beamWidth;
        const length = beamWidth * (0.7 + ((i * 17) % 7) / 10);
        const alpha = (0.025 + ((i * 13) % 8) / 100) * wispIntensity;
        const gradient = context.createLinearGradient(x - length, y, x + length, y);
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(alpha, 0.2)})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = gradient;
        context.fillRect(x - length, y - 1.5, length * 2, 3);
      }

      const beam = context.createLinearGradient(cx - beamWidth, 0, cx + beamWidth, 0);
      const coreAlpha = Math.min(0.16, 0.07 + flowStrength * 0.08);
      beam.addColorStop(0, "rgba(0,0,0,0)");
      beam.addColorStop(Math.max(0.05, falloffStart * 0.2), `rgba(${rgb.r},${rgb.g},${rgb.b},${coreAlpha * 0.2})`);
      beam.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${coreAlpha})`);
      beam.addColorStop(Math.min(0.95, 1 - decay * 0.05), `rgba(${rgb.r},${rgb.g},${rgb.b},${coreAlpha * 0.25})`);
      beam.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = beam;
      context.fillRect(cx - beamWidth, 0, beamWidth * 2, height);

      const fog = context.createRadialGradient(cx, cy, min * 0.03, cx, cy, min * (0.45 + fogScale));
      fog.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.055 * fogIntensity})`);
      fog.addColorStop(0.65, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.018 * fogIntensity})`);
      fog.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = fog;
      context.fillRect(0, 0, width, height);

      context.restore();
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [color, decay, falloffStart, flowSpeed, flowStrength, fogFallSpeed, fogIntensity, fogScale, horizontalBeamOffset, horizontalSizing, verticalBeamOffset, verticalSizing, wispDensity, wispIntensity, wispSpeed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
