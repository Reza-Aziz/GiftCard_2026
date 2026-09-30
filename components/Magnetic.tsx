"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Magnetic CTA: leans toward the finger/cursor, snaps back elastic.
// Mouse only — touch scrolling stays untouched.
export default function Magnetic({
  children,
  className = "",
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(gsap.utils.clamp(-strength, strength, e.clientX - (r.left + r.width / 2)) * 0.4);
      yTo(gsap.utils.clamp(-strength, strength, e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const back = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: true });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", back);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", back);
    };
  }, [strength ]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
