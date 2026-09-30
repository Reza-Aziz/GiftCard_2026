"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Hero entrance choreography: plays ONCE when the gate opens
// (MusicGate dispatches "site:entered"). Kicker → title → poem →
// card springs in → CTA. Nothing plays hidden behind the gate.
export default function HeroEntrance({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced()) return;
    const q = (sel: string) => root.querySelectorAll(`[data-enter="${sel}"]`);
    gsap.set(q("kicker"), { y: 44, autoAlpha: 0 });
    gsap.set(q("title"), { y: 44, autoAlpha: 0 });
    gsap.set(q("poem"), { y: 44, autoAlpha: 0 });
    gsap.set(q("card"), { y: 44, autoAlpha: 0, scale: 0.7 });
    gsap.set(q("cta"), { y: 44, autoAlpha: 0 });
    const tl = gsap.timeline({ paused: true, defaults: { ease: "sine.out" } });
    tl.to(q("kicker"), { y: 0, autoAlpha: 1, duration: 0.7 }, 0)
      .to(q("title"), { y: 0, autoAlpha: 1, duration: 0.9 }, 0.15)
      .to(q("poem"), { y: 0, autoAlpha: 1, duration: 0.7 }, 0.45)
      .to(q("card"), { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.1)" }, 0.6);
    const play = () => tl.play();
    if (!document.querySelector(".gate")) {
      play();
      return;
    }
    window.addEventListener("site:entered", play);
    return () => {
      window.removeEventListener("site:entered", play);
      tl.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
