"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, reduced } from "@/lib/gsap";
import Expand from "@/components/Expand";
import Magnetic from "@/components/Magnetic";

// Retro love letter, ONE persistent DOM. Flap spins + paper expands
// via GSAP. Smooth both ways.
export default function Envelope({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(false);
  const flapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flap = flapRef.current;
    if (!flap) return;
    if (reduced()) return;
    gsap.to(flap, {
      rotationX: open ? 160 : 0,
      transformPerspective: 600,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  }, [open ]);

  return (
    <div className="airmail-wrap">
      <div className="letter-paper relative rounded-lg p-4 sm:p-5">
        <span className="absolute -top-1 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-sm bg-blush/80" aria-hidden />

        <div
          ref={flapRef}
          className="flap-origin -mx-1 rounded-lg border-[3px] border-cocoa bg-lilac px-4 py-2.5 text-center"
        >
          <span className="text-sm font-bold tracking-widest">✉ WITH LOVE ✉</span>
        </div>

        <div className="flex min-h-28 flex-col items-center justify-center py-4 text-center">
          {!open && <p className="mb-3 text-sm italic opacity-70">a letter is waiting for you…</p>}
          <Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="brutal-btn w-full rounded-full bg-cocoa px-4 py-3.5 text-base font-bold text-cream"
            >
              {open ? "fold it back ↑" : "open the letter ↓"}
            </button>
          </Magnetic>
        </div>

        <Expand open={open} label="Love letter">
          <div className="border-t-[3px] border-dashed border-cocoa/30 pt-5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-hand text-3xl font-medium">dear cuking,</p>
              <div className="flex shrink-0 items-center gap-1" aria-hidden>
                <span className="grid h-12 w-10 place-items-center border-2 border-dashed border-cocoa bg-lilac-soft font-display text-lg">
                  21
                </span>
                <span className="grid h-12 w-12 -rotate-12 place-items-center rounded-full border-2 border-gold text-[9px] font-bold leading-tight text-gold">
                  LOVE
                  <br />
                  POST
                </span>
              </div>
            </div>
            <div className="mt-3 space-y-0">
              {lines.map((p, i) => (
                <p key={i} className="max-w-prose">
                  {p}
                </p>
              ))}
            </div>
            <div className="relative mt-3 h-24 w-24">
              <Image
                src="/photos/cuking-2.jpg"
                alt="Little photo of Rizki Oky Triyani inside the letter"
                fill
                className="rounded-md border-[3px] border-cocoa object-cover"
                sizes="96px"
              />
              <span className="absolute -right-2 -top-2 rotate-12 rounded-full border-2 border-cocoa bg-sun px-2 py-0.5 text-[10px] font-bold">
                us ♥
              </span>
            </div>
            <p className="font-hand mt-2 text-right text-2xl font-medium">— yours ♥</p>
          </div>
        </Expand>
      </div>
    </div>
  );
}
