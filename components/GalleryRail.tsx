"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/gsap";
import Flower from "./Flower";

type Photo = { src: string; chapter: string; caption: string; ratio?: string };

// Slow zoom-in per card, ScrollTrigger-driven + reversible.
function RailCard({ p, i }: { p: Photo; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    const card = ref.current;
    if (!img || !card || reduced()) return;
    const tween = gsap.fromTo(
      img,
      { scale: 1.08 },
      {
        scale: 1,
        duration: 1.2,
        ease: "sine.out",
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={ref} className="w-[78%] shrink-0 sm:w-[320px]">
      <figure className={`brutal-card bg-white p-3 pb-4 ${i % 2 ? "rotate-2" : "-rotate-2"}`}>
        <span className="stamp mx-auto mb-2 block w-fit px-3 py-0.5 text-[11px] font-bold tracking-widest">
          {p.chapter.toUpperCase()}
        </span>
        <div className={`relative overflow-hidden rounded-lg border-[3px] border-cocoa bg-lilac-soft ${p.ratio === "4/3" ? "aspect-[4/3]" : "aspect-[3/4]"}`}>
          {missing ? (
            <div className="flex h-full flex-col items-center justify-center gap-1 p-4 text-center">
              <Flower className="h-12 w-12" />
              <p className="text-xs font-bold">drop your photo here</p>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={p.src}
              alt={`${p.caption} — Rizki Oky Triyani`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setMissing(true)}
            />
          )}
        </div>
        <figcaption className="font-hand pt-2 text-center text-2xl font-medium leading-snug">{p.caption}</figcaption>
      </figure>
    </div>
  );
}

const STEP = 336; // 320px card + 16px gap

export default function GalleryRail({ photos }: { photos: readonly Photo[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [swiped, setSwiped] = useState(false);
  const [idx, setIdx] = useState(0);
  const max = photos.length - 1;

  const go = (d: number) => setIdx((i) => Math.min(max, Math.max(0, i + d)));

  // desktop paged view: slide the track (GSAP, buttons only — no swipe)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (reduced()) {
      gsap.set(el, { x: -idx * STEP });
      return;
    }
    gsap.to(el, { x: -idx * STEP, duration: 0.6, ease: "power3.out", overwrite: true });
  }, [idx ]);

  // mobile nudge: slide right-left once when the chapter enters
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          setTimeout(() => el.scrollTo({ left: 90, behavior: "smooth" }), 600);
          setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 1400);
        }),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // mobile arrow beckons sideways (GSAP)
  useEffect(() => {
    const el = arrowRef.current;
    if (!el || reduced()) return;
    const tween = gsap.to(el, { x: 6, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);

  // mobile spotlight: card nearest center pops, rest dim
  const spotlight = () => {
    const rail = railRef.current;
    if (!rail || reduced()) return;
    const center = rail.scrollLeft + rail.clientWidth / 2;
    Array.from(rail.children).forEach((child) => {
      const el = child as HTMLElement;
      const c = el.offsetLeft + el.offsetWidth / 2;
      const near = Math.abs(c - center) < el.offsetWidth / 2;
      gsap.to(el, {
        scale: near ? 1 : 0.93,
        autoAlpha: near ? 1 : 0.7,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  return (
    <div className="relative">
      {/* mobile: swipe rail (untouched) */}
      <div className="md:hidden">
        <div
          ref={railRef}
          onScroll={(e) => {
            if ((e.target as HTMLDivElement).scrollLeft > 30) setSwiped(true);
            spotlight();
          }}
          className="rail -mx-5 flex gap-4 overflow-x-auto px-5 py-6 md:-mx-8 md:px-8"
        >
          {photos.map((p, i) => (
            <RailCard key={p.src} p={{ ...p }} i={i} />
          ))}
        </div>
        {!swiped && (
          <span ref={arrowRef} className="absolute right-1 top-1/3 grid h-10 w-10 place-items-center rounded-full border-[3px] border-cocoa bg-sun text-lg font-bold shadow-[3px_3px_0_var(--color-cocoa)]" aria-hidden>
            →
          </span>
        )}
        <p className="mt-2 text-center text-xs font-bold tracking-widest opacity-60">
          {swiped ? "ONE PHOTO, ONE CHAPTER ♥" : "SWIPE → GO ON, TRY IT ♥"}
        </p>
      </div>

      {/* desktop: buttons only, no swipe */}
      <div className="hidden md:block">
        <div className="relative mx-auto w-[400px] max-w-full">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={idx === 0}
            aria-label="Previous photo"
            className="brutal-btn absolute left-0 top-1/3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-bold disabled:opacity-30"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={idx === max}
            aria-label="Next photo"
            className="brutal-btn absolute right-0 top-1/3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-xl font-bold disabled:opacity-30"
          >
            →
          </button>
          <div className="overflow-hidden px-10 py-6">
            <div ref={trackRef} className="flex w-max gap-4">
              {photos.map((p, i) => (
                <RailCard key={p.src} p={{ ...p }} i={i} />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-xs font-bold tracking-widest opacity-60">
          {idx + 1} / {photos.length} ♥ CLICK ← → TO BROWSE
        </p>
      </div>
    </div>
  );
}
