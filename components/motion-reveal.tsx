import type { CSSProperties, ReactNode } from "react";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  once?: boolean;
  id?: string;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  distance = 34,
  once = true,
  id,
}: MotionRevealProps) {
  const style = {
    animationDelay: `${delay}s`,
    "--reveal-distance": `${distance}px`,
    contentVisibility: delay > 0.04 ? "auto" : undefined,
    containIntrinsicSize: delay > 0.04 ? "1px 860px" : undefined,
  } as CSSProperties;

  return (
    <div
      id={id}
      className={`reveal-block ${once ? "reveal-once" : ""} ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
