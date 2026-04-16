import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { heroContent, serviceModes, siteConfig } from "@/lib/site-data";

export function HomeEditorialHero() {
  return (
    <MotionReveal className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:py-16">
      <section className="editorial-hero section-shell rounded-[2.8rem] px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="relative z-10">
            <div className="flex flex-wrap gap-3">
              <span className="signal-chip">Founded 2024</span>
              <span className="signal-chip">Cloud / Recovery / Visual</span>
            </div>

            <p className="eyebrow mt-10 text-xs sm:text-sm">{heroContent.eyebrow}</p>

            <div className="mt-8 max-w-4xl">
              <p className="editorial-copy text-balance text-[2.8rem] leading-[0.96] text-white/88 sm:text-[4rem] lg:text-[5.5rem]">
                <span className="editorial-copy-line">
                  Hey, I&apos;m{" "}
                  <span className="editorial-copy-strong">{siteConfig.founder}</span>,
                </span>
                <span className="editorial-copy-line">
                  a system-first creative operator who turns
                </span>
                <span className="editorial-copy-line">
                  cloud, recovery, and visual execution into
                </span>
                <span className="editorial-copy-line">
                  living digital systems.
                </span>
              </p>
            </div>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {heroContent.subheadline}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={heroContent.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black hover:bg-white"
              >
                {heroContent.primaryCta.label}
              </Link>
              <Link
                href={heroContent.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-7 py-3.5 text-sm font-medium text-white/84 hover:border-primary/40 hover:bg-white/4"
              >
                {heroContent.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <article className="panel rounded-[1.5rem] p-5">
                <p className="eyebrow text-[11px]">Operational Signature</p>
                <p className="mt-3 text-base leading-7 text-white/84">
                  Sistem tidak cukup hanya berjalan. Ia harus terasa hidup,
                  stabil, dan siap bertahan saat tekanan datang.
                </p>
              </article>

              <article className="panel rounded-[1.5rem] p-5">
                <p className="eyebrow text-[11px]">Current Focus</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {serviceModes.slice(0, 3).map((mode) => (
                    <span
                      key={mode}
                      className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/72"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <MotionReveal delay={0.12} distance={24} className="relative">
            <div className="hero-stage panel rounded-[2.2rem] p-4 sm:p-5">
              <div className="hero-stage-noise" />
              <div className="hero-stage-frame">
                <div className="hero-stage-window" />

                <div className="hero-stage-portrait-shell">
                  <div className="hero-stage-portrait-glow" />
                  <Image
                    src={heroContent.heroImage}
                    alt="Portrait Bendzanu Kamagifi"
                    width={680}
                    height={860}
                    priority
                    quality={76}
                    sizes="(min-width: 1280px) 420px, (min-width: 1024px) 38vw, 86vw"
                    className="hero-stage-portrait"
                  />
                </div>

                <svg
                  viewBox="0 0 620 760"
                  aria-hidden="true"
                  className="hero-stage-sketch"
                >
                  <rect x="42" y="54" width="536" height="684" rx="8" />
                  <line x1="42" y1="430" x2="578" y2="430" />
                  <line x1="42" y1="540" x2="578" y2="540" />
                  <line x1="62" y1="430" x2="62" y2="518" />
                  <line x1="84" y1="430" x2="84" y2="518" />
                  <line x1="106" y1="430" x2="106" y2="518" />
                  <line x1="128" y1="430" x2="128" y2="518" />
                  <line x1="150" y1="430" x2="150" y2="518" />
                  <line x1="172" y1="430" x2="172" y2="518" />
                  <line x1="194" y1="430" x2="194" y2="518" />
                  <line x1="216" y1="430" x2="216" y2="518" />
                  <line x1="238" y1="430" x2="238" y2="518" />
                  <line x1="260" y1="430" x2="260" y2="518" />
                  <line x1="282" y1="430" x2="282" y2="518" />
                  <line x1="304" y1="430" x2="304" y2="518" />
                  <line x1="326" y1="430" x2="326" y2="518" />
                  <line x1="348" y1="430" x2="348" y2="518" />
                  <line x1="370" y1="430" x2="370" y2="518" />
                  <line x1="392" y1="430" x2="392" y2="518" />
                  <line x1="414" y1="430" x2="414" y2="518" />
                  <line x1="436" y1="430" x2="436" y2="518" />
                  <line x1="458" y1="430" x2="458" y2="518" />
                  <line x1="480" y1="430" x2="480" y2="518" />
                  <line x1="502" y1="430" x2="502" y2="518" />
                  <line x1="524" y1="430" x2="524" y2="518" />
                  <line x1="546" y1="430" x2="546" y2="518" />
                  <path d="M197 385C214 352 233 328 255 308" />
                  <path d="M421 386C405 350 387 325 363 302" />
                  <path d="M255 308C282 294 310 292 341 302" />
                  <path d="M256 309C250 351 247 388 248 433" />
                  <path d="M363 302C364 350 376 392 404 438" />
                  <path d="M235 437C255 453 279 456 306 445" />
                  <path d="M308 445C299 489 303 538 319 592" />
                  <path d="M319 592C332 640 358 682 390 718" />
                  <path d="M286 445C269 494 259 544 260 594" />
                  <path d="M260 594C261 640 257 683 246 726" />
                  <path d="M359 443C389 439 412 430 430 415" />
                  <path d="M404 438C433 420 453 422 474 444" />
                  <path d="M474 444C486 457 499 460 515 458" />
                  <path d="M248 432C221 432 204 426 190 414" />
                  <path d="M190 414C179 401 166 398 150 406" />
                  <path d="M150 406C143 423 132 432 116 432" />
                  <path d="M273 691C289 707 307 711 328 703" />
                  <path d="M368 714C389 731 411 733 434 720" />
                  <path d="M300 468C322 463 343 469 361 485" />
                  <path d="M342 488C334 504 334 520 344 536" />
                </svg>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </MotionReveal>
  );
}
