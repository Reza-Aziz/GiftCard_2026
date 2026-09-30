"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, reduced } from "@/lib/gsap";
import Expand from "@/components/Expand";
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

// Gate: ONE persistent envelope. Tap → flap spins + letter slides up
// → badge + enter button expand in → tap → gate fades to main page.
// All motion GSAP. Fallback mp3 if embed is blocked.
export default function MusicGate() {
  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const playerRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const gateRef = useRef<HTMLDivElement>(null);
  const enterArrowRef = useRef<HTMLSpanElement>(null);
  const flapRef = useRef<HTMLSpanElement>(null);
  const peekRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  // flap + peek follow `open`
  useEffect(() => {
    if (reduced()) return;
    gsap.to(flapRef.current, {
      rotationX: open ? 160 : 0,
      transformPerspective: 600,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(peekRef.current, {
      yPercent: open ? 0 : 38,
      duration: 0.65,
      delay: open ? 0.2 : 0,
      ease: "power3.out",
      overwrite: true,
    });
  }, [open ]);

  // volume badge pulse + enter arrow beckon
  useEffect(() => {
    const badge = badgeRef.current;
    const arrow = enterArrowRef.current;
    if (reduced()) return;
    const tweens: { kill(): void }[] = [];
    if (badge) {
      tweens.push(gsap.to(badge, { scale: 1.05, duration: 0.7, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    }
    if (arrow) {
      tweens.push(gsap.to(arrow, { y: 5, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: -1 }));
    }
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

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
    setEntered(true);
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
    if (!entered) return;
    const t = setTimeout(() => {
      if (!playerRef.current && !fallback) startFallback();
    }, 6000);
    return () => clearTimeout(t);
  }, [entered]);

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
        <div ref={gateRef} className="gate fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-cream px-6 py-10">
          <div className="brutal-card w-full max-w-xs p-6 text-center">
            <p className="text-xs font-bold tracking-[0.3em] opacity-60">FOR</p>
            <p className="font-display mt-1 text-3xl leading-tight">{herName}</p>

            <button
              type="button"
              onClick={() => !open && setOpen(true)}
              aria-label={open ? "Envelope is open" : "Tap the envelope to open it"}
              aria-expanded={open}
              className="mx-auto mt-5 block w-52 cursor-pointer py-2"
            >
              <span className="block overflow-hidden rounded-xl border-[3px] border-cocoa bg-lilac-soft">
                <span ref={flapRef} className="flap-origin block border-b-[3px] border-cocoa bg-lilac px-2 py-2 text-xs font-bold">
                  ✉ FOR YOU ♥
                </span>
                <span className="relative block h-28">
                  <span ref={peekRef} className="absolute inset-x-3 top-2 bottom-0 rounded-t-lg border-[3px] border-b-0 border-cocoa bg-[#fffdf5] p-2 text-left">
                    <span className="font-display block text-sm">for cuking ♥</span>
                    <span className="mt-1 block h-1.5 rounded bg-cocoa/15" />
                    <span className="mt-1.5 block h-1.5 w-4/5 rounded bg-cocoa/15" />
                    <span className="mt-1.5 block h-1.5 w-3/5 rounded bg-cocoa/15" />
                  </span>
                </span>
              </span>
            </button>

            {!open && <p className="mt-3 text-[11px] opacity-50">psst… tap the envelope ↑</p>}

            <Expand open={open} label="Enter the site">
              <div className="pt-4">
                <span ref={badgeRef} className="mx-auto flex w-fit items-center gap-2 rounded-full border-[3px] border-cocoa bg-sun px-4 py-2 text-sm font-bold shadow-[4px_4px_0_var(--color-cocoa)]">
                  <Floaty amount={2} duration={0.9}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
                      <path d="M15 9a4 4 0 0 1 0 6 M18 6a8 8 0 0 1 0 12" strokeLinecap="round" />
                    </svg>
                  </Floaty>
                  turn your volume up!
                </span>
                <Magnetic>
                  <button
                    type="button"
                    onClick={enter}
                    className="brutal-btn mt-4 w-full rounded-full bg-bubble px-6 py-3.5 font-bold text-cocoa"
                  >
                    step into your world{" "}
                    <span ref={enterArrowRef} className="inline-block">
                      ↓
                    </span>
                  </button>
                </Magnetic>
              </div>
            </Expand>
          </div>
        </div>
      )}

      {entered && (
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
