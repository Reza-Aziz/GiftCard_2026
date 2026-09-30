"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/gsap";
import Floaty from "./Floaty";
import Flower from "./Flower";

// Whole-card flip polaroid: front = little her, tap → the ENTIRE card
// spins in 3D → back = grown her. Badge sits in normal flow above the
// card, so nothing ever overlaps. Wiggle-on-load invites the tap.
export default function FlipCard({ name }: { name: string }) {
  const [flipped, setFlipped] = useState(false);
  const [broken, setBroken] = useState({ front: false, back: false });
  const cardRef = useRef<HTMLSpanElement>(null);

  // flip follows state
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (reduced()) {
      gsap.set(el, { rotationY: flipped ? 180 : 0 });
      return;
    }
    gsap.to(el, { rotationY: flipped ? 180 : 0, duration: 0.8, ease: "back.out(1.2)", overwrite: true });
  }, [flipped ]);

  // one-time "hey, tap me" wiggle shortly after mount
  useEffect(() => {
    const el = cardRef.current;
    if (!el || reduced()) return;
    const wiggle = gsap.fromTo(
      el,
      { rotation: 0 },
      { rotation: -3, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 3, delay: 1 }
    );
    return () => {
      wiggle.kill();
    };
  }, []);

  const front = "block [backface-visibility:hidden]";
  const back = "absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]";
  const photo = (src: string, alt: string, side: "front" | "back", brokenSide: boolean, caption: string) => (
    <span className="brutal-card block h-full w-full bg-white p-2.5 pb-3">
      <span className="block aspect-[3/4] overflow-hidden rounded-lg border-[3px] border-cocoa bg-lilac-soft">
        {brokenSide ? (
          <span className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <Flower className="h-14 w-14" />
            <span className="text-sm font-bold">photo missing</span>
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            onError={() => setBroken((b) => ({ ...b, [side]: true }))}
            className="h-full w-full object-cover"
            draggable={false}
          />
        )}
      </span>
      <span className="block pt-2 text-center text-sm font-bold">{caption}</span>
    </span>
  );

  return (
    <div className="flex flex-col items-center">
      <Floaty className="sticker z-10 -mb-3 rotate-2 bg-sun" amount={3} duration={1.4}>
        tap me! ⇄
      </Floaty>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={flipped ? "Flip back to little her" : "Flip to see her grown up"}
        className="block cursor-pointer [perspective:1200px]"
      >
        <span ref={cardRef} className="relative block w-52 [transform-style:preserve-3d] sm:w-60">
          <span className={front}>{photo("/photos/little-her.jpg", `Little ${name}`, "front", broken.front, "little you ♥")}</span>
          <span className={back}>
            {photo("/photos/grown-her.jpg", `${name} all grown up`, "back", broken.back, "grown up ♥")}
          </span>
        </span>
      </button>
      <p className="mt-3 text-center text-[11px] font-bold tracking-widest opacity-50">TAP THE CARD TO FLIP ⇄</p>
    </div>
  );
}
