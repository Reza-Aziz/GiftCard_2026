"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/gsap";
import Floaty from "@/components/Floaty";
import Magnetic from "@/components/Magnetic";
import { herName, nowPlaying, videoId } from "@/lib/content";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const TARGET_VOL = 75;
const FALLBACK_VOL = 0.75;

// Gate in 2 taps: 1) volume alert → OK, 2) enter button → main page.
// Music starts instantly at full volume on the final tap.
// Fallback mp3 if the video blocks embedding.
export default function MusicGate() {
  const [step, setStep] = useState(0); // 0: volume alert, 1: enter, 2: gone-in
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const playerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const enterArrowRef = useRef<HTMLSpanElement>(null);

  // card swaps animate in on every step
  useEffect(() => {
    const el = cardRef.current;
    if (!el || reduced()) return;
    gsap.fromTo(
      el,
      { y: 26, autoAlpha: 0, scale: 0.97 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)", overwrite: true }
    );
  }, [step ]);

  // enter arrow beckons
  useEffect(() => {
    const el = enterArrowRef.current;
    if (!el || reduced()) return;
    const tween = gsap.to(el, { y: 5, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    return () => {
      tween.kill();
    };
  }, [step ]);

  const startYT = (player: any) => {
    player.setVolume(TARGET_VOL);
    player.playVideo();
    setPlaying(true);
  };

  const startAudio = async (a: HTMLAudioElement) => {
    a.volume = FALLBACK_VOL;
    try {
      await a.play();
    } catch {
      return;
    }
  };

  const startFallback = () => {
    setFallback(true);
    if (audioRef.current) void startAudio(audioRef.current);
  };

  const createPlayer = () => {
    try {
      playerRef.current = new window.YT.Player("yt-hidden", {
        videoId,
        playerVars: { autoplay: 1, loop: 1, playlist: videoId, controls: 0, disablekb: 1 },
        events: {
          onReady: (e: any) => startYT(e.target),
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.playVideo();
            } else if (e.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true);
              setReady(true);
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setPlaying(false);
            }
          },
          onError: () => {
            playerRef.current = null;
            startFallback();
          },
        },
      });
    } catch {
      startFallback();
    }
  };

  const enter = () => {
    setStep(2);
    window.dispatchEvent(new Event("site:entered"));
    if (reduced()) {
      setGone(true);
    } else {
      gsap.to(gateRef.current, { autoAlpha: 0, duration: 0.9, ease: "sine.out", onComplete: () => setGone(true) });
    }
    if (window.YT?.Player && !playerRef.current) {
      createPlayer();
      return;
    }
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script");
      s.id = "yt-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
    window.onYouTubeIframeAPIReady = () => createPlayer();
  };

  useEffect(() => {
    if (step !== 2) return;
    const t = setTimeout(() => {
      if (!playerRef.current && !fallback) startFallback();
    }, 6000);
    return () => clearTimeout(t);
  }, [step ]);

  const toggle = () => {
    if (fallback && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        void audioRef.current.play();
        setPlaying(true);
      }
      return;
    }
    const p = playerRef.current;
    if (!p) return;
    try {
      if (playing) {
        p.pauseVideo();
        setPlaying(false);
      } else {
        p.playVideo();
        setPlaying(true);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div id="yt-hidden" className="pointer-events-none fixed bottom-0 left-0 h-px w-px opacity-0" aria-hidden />
      <audio
        ref={audioRef}
        src="/music/ultah.mp3"
        loop
        preload="none"
        onPlaying={() => {
          setPlaying(true);
          setReady(true);
        }}
        onPause={() => setPlaying(false)}
      />

      {!gone && (
        <div ref={gateRef} className="gate fixed inset-0 z-[70] overflow-y-auto bg-cream">
          <div className="flex min-h-full items-start px-6 py-10">
            <div ref={cardRef} className="brutal-card m-auto w-full max-w-xs p-6 text-center">
              {step === 0 ? (
                <>
                  <Floaty amount={3} duration={1.6} className="mx-auto w-fit">
                    <span className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-cocoa bg-sun">
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
                        <path d="M15 9a4 4 0 0 1 0 6 M18 6a8 8 0 0 1 0 12" strokeLinecap="round" />
                      </svg>
                    </span>
                  </Floaty>
                  <p className="font-display mt-3 text-3xl leading-tight">Besarin Volume Nya Yakk!</p>
                  <p className="mt-1 text-sm italic opacity-70"></p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="brutal-btn mt-5 w-full rounded-full bg-cocoa px-6 py-3.5 font-bold text-cream"
                  >
                    DONE?
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs font-bold tracking-[0.3em] opacity-60">To My Beloved Girlfriend</p>
                  <p className="font-display mt-1 text-3xl leading-tight">{herName}</p>
                  <p className="mt-2 text-sm italic opacity-70">ready? your surprise is inside ♥</p>
                  <Magnetic>
                    <button
                      type="button"
                      onClick={enter}
                      className="brutal-btn mt-5 w-full rounded-full bg-bubble px-6 py-3.5 font-bold text-cocoa"
                    >
                      step into your world{" "}
                      <span ref={enterArrowRef} className="inline-block">
                        ↓
                      </span>
                    </button>
                  </Magnetic>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="fixed bottom-5 left-4 z-50 max-w-[60%] truncate rounded-full border-2 border-cocoa bg-white px-3 py-1.5 text-[11px] font-bold shadow-[3px_3px_0_var(--color-cocoa)]">
            {ready ? `♪ now playing: ${nowPlaying}` : "tuning our song…"}
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "pause music" : "play music"}
            className="brutal-btn fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-sun text-xl font-bold"
          >
            {playing ? "❚❚" : "♪"}
          </button>
        </>
      )}
    </>
  );
}
