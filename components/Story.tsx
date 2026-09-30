"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, reduced } from "@/lib/gsap";
import { sceneLabels } from "@/lib/content";

const SCENE_IDS = ["hero", "letter", "gallery", "finale"];
const SCENE_BG = ["#FFF9F0", "#F3EAFB", "#FBE9EE", "#FBF3DF"];

// Background eases per chapter via ScrollTrigger. No top nav.
export default function Story({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (reduced()) {
      wrap.style.backgroundColor = SCENE_BG[0];
      return;
    }
    const triggers = SCENE_IDS.map((id, i) => {
      const sec = document.getElementById(id);
      if (!sec) return null;
      return gsap.to(wrap, {
        backgroundColor: SCENE_BG[i],
        duration: 0.8,
        ease: "sine.out",
        overwrite: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 55%",
          end: "bottom 55%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => {
      triggers.forEach((t) => {
        t?.scrollTrigger?.kill();
        t?.kill();
      });
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ backgroundColor: SCENE_BG[0] }}>
      {children}
    </div>
  );
}

export { sceneLabels };
