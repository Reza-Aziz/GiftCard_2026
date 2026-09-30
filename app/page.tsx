import Bouquet from "@/components/Bouquet";
import Doodle from "@/components/Doodle";
import Envelope from "@/components/Envelope";
import FinaleLetter from "@/components/FinaleLetter";
import FlipCard from "@/components/FlipCard";
import Floaty from "@/components/Floaty";
import Flower from "@/components/Flower";
import GalleryRail from "@/components/GalleryRail";
import HeartsOnTap from "@/components/HeartsOnTap";
import HeroEntrance from "@/components/HeroEntrance";
import Meadow from "@/components/Meadow";
import MusicGate from "@/components/MusicGate";
import Parallax from "@/components/Parallax";
import Petals from "@/components/Petals";
import Reveal from "@/components/Reveal";
import Story from "@/components/Story";
import Typewriter from "@/components/Typewriter";
import Vine from "@/components/Vine";
import {
  finaleHead,
  finaleLines,
  finaleSign,
  herName,
  heroKicker,
  heroPoem,
  letter,
  photoChapters,
} from "@/lib/content";

function SceneHead({ no, title, sub }: { no: string; title: string; sub: string }) {
  return (
    <div className="mb-4 text-center">
      <span className="stamp inline-block -rotate-2 px-3 py-1 text-[11px] font-bold tracking-widest">{no}</span>
      <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-1 max-w-xs text-sm italic leading-relaxed opacity-70">{sub}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="grain">
      <Doodle />
      <HeartsOnTap />
      <MusicGate />
      <Story>
        {/* CH. 1 — COVER: one childhood photo */}
        <header id="hero" className="relative flex flex-col justify-center overflow-hidden px-5 pb-16 pt-20 md:px-8">
          <Petals />
          <Meadow className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full" />
          <div className="relative mx-auto w-full max-w-md lg:max-w-2xl">
            <HeroEntrance>
              <p data-enter="kicker" className="text-center text-sm italic opacity-70">{heroKicker}</p>
              <h1 data-enter="title" className="font-display mt-1 text-center text-5xl leading-[1.02] sm:text-6xl">
                RIZKI OKY
                <span className="mt-1 flex items-center justify-center gap-2 text-4xl sm:text-5xl">
                  <Floaty className="h-7 w-7 sm:h-9 sm:w-9" amount={4} duration={2}>
                    <Flower className="h-full w-full" />
                  </Floaty>
                  TRIYANI
                  <Floaty className="h-7 w-7 sm:h-9 sm:w-9" amount={4} duration={2.6}>
                    <Flower className="h-full w-full" />
                  </Floaty>
                </span>
              </h1>
              <p data-enter="poem" className="mx-auto mt-2 max-w-xs text-center text-[15px] italic opacity-80">
                <Typewriter text={heroPoem} />
              </p>
              <div data-enter="card" className="mt-4">
                <Vine />
                <Parallax speed={-36}>
                  <div className="mx-auto mt-4 w-fit">
                    <FlipCard name={herName} />
                  </div>
                </Parallax>
              </div>
            </HeroEntrance>
          </div>
        </header>

        {/* CH. 2 — LETTER */}
        <section id="letter" aria-label="Letter for cuking" className="flex scroll-mt-6 flex-col justify-center px-5 py-20 md:px-8">
          <div className="mx-auto w-full max-w-md lg:max-w-xl">
            <Reveal>
              <SceneHead no="CH. TWO · LETTER" title="a letter for you" sub="read it slowly, no skipping allowed" />
              <Vine />
            </Reveal>
            <Reveal delay={120}>
              <Parallax speed={36}>
                <div className="relative mt-3">
                  <Bouquet className="absolute -top-10 right-2 z-10 h-16 w-16" />
                  <Envelope lines={letter} />
                </div>
              </Parallax>
            </Reveal>
          </div>
        </section>

        {/* CH. 3 — GALLERY */}
        <section id="gallery" aria-label={`Photo gallery of ${herName}`} className="flex flex-col justify-center py-20">
          <div className="mx-auto w-full max-w-md px-5 md:px-8 lg:max-w-2xl">
            <Reveal>
              <SceneHead no="CH. THREE · GALLERY" title="eight chapters of you" sub="swipe sideways, every photo is a chapter" />
            </Reveal>
          </div>
          <Reveal delay={120}>
            <GalleryRail photos={photoChapters} />
          </Reveal>
        </section>

        {/* CH. 4 — 22ND WISH FINALE */}
        <section id="finale" aria-label="Letter for the 22nd birthday" className="flex flex-col justify-center px-5 py-20 md:px-8">
          <div className="mx-auto w-full max-w-md lg:max-w-xl">
            <Reveal>
              <SceneHead no="CH. FOUR · FINALE" title={finaleHead} sub="the last page, but never the end" />
              <Vine />
            </Reveal>
            <Reveal delay={120}>
              <Parallax speed={-32}>
                <FinaleLetter
                  lines={finaleLines}
                  sign={finaleSign}
                  signature={
                    <>
                      Your{" "}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/logo-dti.png"
                        alt="IT"
                        width={200}
                        height={200}
                        className="mx-0.5 inline h-[1.1em] w-auto align-[-0.2em]"
                      />{" "}
                      Lover Boy ❤️
                    </>
                  }
                />
              </Parallax>
            </Reveal>
            <p className="mt-6 text-center text-[11px] leading-relaxed tracking-widest opacity-50">
              HAPPY 21ST {herName.toUpperCase()} ♥ SEE YOU AT 22
            </p>
          </div>
        </section>
      </Story>
    </div>
  );
}
