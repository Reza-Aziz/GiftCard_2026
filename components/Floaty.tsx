"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Gentle infinite float for stickers/flowers. GSAP yoyo.
export default function Floaty({
  children,
  className = "",
  amount = 6,
  duration = 2.5,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const tween = gsap.to(el, {
      y: -amount,
      rotation: 4,
      duration,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [amount, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
