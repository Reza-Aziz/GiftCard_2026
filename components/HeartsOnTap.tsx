"use client";

import { useEffect } from "react";
import { gsap, reduced } from "@/lib/gsap";

// Every tap blooms a little heart (GSAP float-up). Capped node count,
// disabled for reduced-motion.
export default function HeartsOnTap() {
  useEffect(() => {
    if (reduced()) return;
    const colors = ["#F6C9D4", "#C9A8E0", "#E9B44C", "#E58AA0"];
    let n = 0;
    const onTap = (e: PointerEvent) => {
      if (document.querySelectorAll(".tap-heart").length > 12) return;
      const s = document.createElement("span");
      s.className = "tap-heart";
      s.textContent = "♥";
      s.style.left = `${e.clientX}px`;
      s.style.top = `${e.clientY}px`;
      s.style.color = colors[n % colors.length];
      s.style.fontSize = `${14 + ((n * 7) % 10)}px`;
      n += 1;
      document.body.appendChild(s);
      gsap.fromTo(
        s,
        { xPercent: -50, yPercent: -50, scale: 0.4, autoAlpha: 0, rotation: 0 },
        {
          y: -170,
          scale: 1.25,
          rotation: 12,
          autoAlpha: 1,
          duration: 1,
          ease: "power1.out",
          onComplete: () => s.remove(),
        }
      );
    };
    window.addEventListener("pointerdown", onTap);
    return () => window.removeEventListener("pointerdown", onTap);
  }, []);
  return null;
}
