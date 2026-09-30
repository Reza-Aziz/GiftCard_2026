"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Smooth expand/collapse, GSAP height tween. Reversible both ways.
export default function Expand({
  open,
  children,
  className = "",
  label,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      gsap.set(el, { height: open ? "auto" : 0, autoAlpha: open ? 1 : 0 });
      first.current = false;
      return;
    }
    if (first.current) {
      gsap.set(el, { height: 0, autoAlpha: 0, y: -6, scale: 0.98 });
      first.current = false;
      if (!open) return;
    }
    gsap.to(el, {
      height: open ? "auto" : 0,
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -6,
      scale: open ? 1 : 0.98,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  }, [open ]);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden={!open}
      aria-label={label}
      style={{ overflow: "hidden", height: 0 }}
    >
      {children}
    </div>
  );
}
