"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Scroll-linked parallax: drifts at its own speed (scrub).
// Nest OUTSIDE Reveal (different elements) so tweens never fight.
export default function Parallax({
  children,
  speed = -40,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const tween = gsap.to(el, {
      y: speed,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
