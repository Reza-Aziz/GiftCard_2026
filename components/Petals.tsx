"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/gsap";

const PETALS = [
  { l: "6%", durn: 7, s: 14, c: "#F9C5D5", delay: 0 },
  { l: "18%", durn: 9, s: 10, c: "#E9D5FF", delay: 1.2 },
  { l: "32%", durn: 8, s: 12, c: "#FFD02F", delay: 0.6 },
  { l: "48%", durn: 10, s: 9, c: "#F9C5D5", delay: 2 },
  { l: "63%", durn: 7.5, s: 13, c: "#E9D5FF", delay: 0.3 },
  { l: "76%", durn: 9.5, s: 10, c: "#FFD02F", delay: 1.6 },
  { l: "88%", durn: 8.5, s: 12, c: "#F9C5D5", delay: 0.9 },
  { l: "94%", durn: 10.5, s: 9, c: "#E9D5FF", delay: 2.4 },
];

// Petals drifting down the hero — GSAP infinite loop, 8 pieces.
export default function Petals() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced()) return;
    const tls = Array.from(wrap.children).map((el, i) => {
      const p = PETALS[i % PETALS.length];
      const tl = gsap.timeline({ repeat: -1, delay: p.delay });
      tl.fromTo(el, { y: "-8vh", rotation: 0 }, { y: "108vh", rotation: 300, duration: p.durn, ease: "none" }, 0)
        .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 0.9, duration: 1, ease: "sine.in" }, 0)
        .to(el, { autoAlpha: 0, duration: 1, ease: "sine.out" }, Math.max(0.1, p.durn - 1));
      return tl;
    });
    return () => {
      tls.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: p.l, width: p.s, height: p.s * 1.25, background: p.c }}
        />
      ))}
    </div>
  );
}
