"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

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
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }

          return;
        }

        if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once]);

  const style = {
    "--reveal-delay": `${delay}s`,
    "--reveal-distance": `${distance}px`,
    contentVisibility: isVisible ? "visible" : delay > 0.04 ? "auto" : undefined,
    containIntrinsicSize: delay > 0.04 ? "1px 860px" : undefined,
  } as CSSProperties;

  return (
    <div
      ref={elementRef}
      id={id}
      className={`reveal-block ${once ? "reveal-once" : ""} ${
        isVisible ? "reveal-visible" : ""
      } ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
