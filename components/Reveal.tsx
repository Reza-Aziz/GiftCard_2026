"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Reversible scroll reveal, GSAP-driven. Scroll back up → hides again.
// `delay` staggers siblings.
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      gsap.set(el, { clearProps: "all" });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { y: 32, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        delay: delay / 1000,
        ease: "sine.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
