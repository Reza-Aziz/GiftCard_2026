"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Illustrated meadow for the hero: rolling hills, smiling sun, tulips.
// Stems sway gently (GSAP); static + graceful when reduced-motion.
export default function Meadow({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || reduced()) return;
    const stems = svg.querySelectorAll(".sway");
    const tweens = Array.from(stems).map((s, i) =>
      gsap.to(s, {
        rotation: i % 2 ? 5 : -5,
        transformOrigin: "bottom center",
        duration: 2.2 + (i % 3) * 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      })
    );
    const sun = svg.querySelector(".sun-spin");
    if (sun) {
      tweens.push(gsap.to(sun, { rotation: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "center" }));
    }
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  const tulip = (x: number, s: number, petal: string, delay = 0) => (
    <g key={x} className="sway" transform={`translate(${x} 0) scale(${s})`} style={{ animationDelay: `${delay}s` }}>
      <path d="M0 0 C -2 -22 2 -34 0 -48" stroke="#5C8A5A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="-8" cy="-24" rx="8" ry="4" fill="#7FB069" transform="rotate(-25 -8 -24)" />
      <path
        d="M-12 -48 C -12 -62 -6 -66 -6 -56 C -6 -66 0 -70 0 -60 C 0 -70 6 -66 6 -56 C 6 -66 12 -62 12 -48 C 12 -38 -6 -36 -12 -48 Z"
        fill={petal}
        stroke="#4A3730"
        strokeWidth="2.5"
      />
    </g>
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 160"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
      fill="none"
    >
      <g className="sun-spin">
        <circle cx="330" cy="42" r="24" fill="#FFD02F" stroke="#4A3730" strokeWidth="3" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={330 + Math.cos(a) * 30}
              y1={42 + Math.sin(a) * 30}
              x2={330 + Math.cos(a) * 38}
              y2={42 + Math.sin(a) * 38}
              stroke="#4A3730"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <path d="M0 120 C 80 100 140 132 200 118 C 270 102 330 128 400 112 L400 160 L0 160 Z" fill="#BEE3B0" stroke="#4A3730" strokeWidth="3" />
      <path d="M0 140 C 90 128 170 148 260 138 C 320 132 360 142 400 136 L400 160 L0 160 Z" fill="#8ECB8A" />
      {tulip(50, 1, "#F9C5D5")}
      {tulip(110, 0.8, "#E9D5FF")}
      {tulip(180, 1.1, "#FF90E8")}
      {tulip(255, 0.85, "#FFD02F")}
      {tulip(310, 1, "#F9C5D5")}
    </svg>
  );
}
