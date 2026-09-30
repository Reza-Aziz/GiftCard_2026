"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";
import Bouquet from "./Bouquet";

export default function FinaleLetter({
// Finale letter: cinematic reading + signature wipe.
  lines,
  sign,
  signature,
}: {
  lines: string[];
  sign: string;
  signature: ReactNode;
}) {
  const linesRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLSpanElement>(null);

  // cinematic reading: lines rise staggered, signature wipes like handwriting
  useEffect(() => {
    if (reduced()) return;
    const lines = linesRef.current;
    const sign = signRef.current;
    const kills: gsap.core.Tween[] = [];
    if (lines?.children.length) {
      const t = gsap.fromTo(
        lines.children,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: lines, start: "top 80%" },
        }
      );
      kills.push(t);
    }
    if (sign) {
      const t = gsap.fromTo(
        sign,
        { xPercent: -105 },
        {
          xPercent: 0,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sign, start: "top 90%" },
        }
      );
      kills.push(t);
    }
    return () => {
      kills.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);
  return (
    <div className="brutal-card relative p-5 sm:p-7">
      <Bouquet className="absolute -top-12 right-4 h-20 w-20" />
      <p className="stamp mx-auto w-fit px-3 py-1 text-[11px] font-bold tracking-widest">SEALED WITH A KISS ♥</p>
      <div ref={linesRef} className="mt-4 space-y-4">
        {lines.map((p, i) => (
          <p key={i} className="mx-auto max-w-prose leading-loose text-[15px]">
            {p}
          </p>
        ))}
      </div>
      <p className="mt-5 text-sm italic opacity-70">{sign}</p>
      <span className="mt-1 block overflow-hidden pb-1">
        <span ref={signRef} className="font-display block text-3xl">
          {signature}
        </span>
      </span>
      <p className="mt-4 text-center font-display text-2xl text-gold" aria-hidden>♥</p>
    </div>
  );
}
