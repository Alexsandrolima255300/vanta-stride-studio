import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface SpecularButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
}

const SpecularButton = React.forwardRef<HTMLButtonElement, SpecularButtonProps>(
  (
    {
      className,
      asChild = false,
      radius = 8,
      tint = "#ffffff",
      tintOpacity = 0.08,
      blur = 0,
      textColor,
      lineColor = "#ffffff",
      baseColor,
      intensity = 1,
      shineSize = 10,
      shineFade = 40,
      thickness = 1,
      speed = 0.35,
      followMouse = true,
      proximity = 250,
      autoAnimate = false,
      children,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLElement | null>(null);
    const [pointer, setPointer] = React.useState({ x: 50, y: 50, active: false });

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        innerRef.current = node;
        if (typeof ref === "function") ref(node as HTMLButtonElement | null);
        else if (ref) ref.current = node as HTMLButtonElement | null;
      },
      [ref],
    );

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setPointer({ x, y, active: true });
      onMouseMove?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      setPointer((current) => ({ ...current, active: false }));
      onMouseLeave?.(event);
    };

    React.useEffect(() => {
      if (!autoAnimate || followMouse) return;
      let frame = 0;
      const started = performance.now();
      const animate = (time: number) => {
        const progress = ((time - started) / 1000) * speed;
        setPointer({
          x: 50 + Math.cos(progress * Math.PI * 2) * 42,
          y: 50 + Math.sin(progress * Math.PI * 2) * 18,
          active: true,
        });
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }, [autoAnimate, followMouse, speed]);

    const componentStyle = {
      ...style,
      "--spec-radius": `${radius}px`,
      "--spec-tint": tint,
      "--spec-tint-opacity": tintOpacity,
      "--spec-blur": `${blur}px`,
      "--spec-text": textColor,
      "--spec-line": lineColor,
      "--spec-base": baseColor,
      "--spec-intensity": intensity,
      "--spec-shine-size": `${shineSize}%`,
      "--spec-shine-fade": `${shineFade}%`,
      "--spec-thickness": `${thickness}px`,
      "--spec-speed": `${speed}s`,
      "--spec-x": `${pointer.x}%`,
      "--spec-y": `${pointer.y}%`,
      "--spec-proximity": `${proximity}px`,
    } as React.CSSProperties;

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={setRefs as React.Ref<any>}
        className={cn("vanta-specular-button", className)}
        style={componentStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className="vanta-specular-button__content">{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "vanta-specular-button__shine",
            pointer.active && "vanta-specular-button__shine--active",
          )}
        />
      </Comp>
    );
  },
);

SpecularButton.displayName = "SpecularButton";

export default SpecularButton;
