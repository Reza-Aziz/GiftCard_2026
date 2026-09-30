"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Typewriter: starts typing once the gate is dismissed
// (MusicGate dispatches "site:entered"). Caret blinks via GSAP.
export default function Typewriter({ text, speed = 45 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const caretRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced()) {
      setN(text.length);
      return;
    }
    const begin = () => setStarted(true);
    if (!document.querySelector(".gate")) {
      begin();
      return;
    }
    window.addEventListener("site:entered", begin);
    return () => window.removeEventListener("site:entered", begin);
  }, [text.length]);

  useEffect(() => {
    if (!started || n >= text.length) return;
    timer.current = setInterval(() => {
      setN((v) => {
        if (v >= text.length && timer.current) clearInterval(timer.current);
        return Math.min(text.length, v + 1);
      });
    }, speed);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [started, n, text, speed]);

  useEffect(() => {
    const el = caretRef.current;
    if (!el || reduced()) return;
    const tween = gsap.to(el, { autoAlpha: 0, duration: 0.45, ease: "steps(1)", yoyo: true, repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && (
        <span ref={caretRef} className="type-caret" aria-hidden />
      )}
    </span>
  );
}
