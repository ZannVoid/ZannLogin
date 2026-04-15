import type { Metadata } from "next";
import { MotionReveal } from "@/components/motion-reveal";
import { PageHero } from "@/components/page-hero";
import { archiveItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Arsip",
  description:
    "Arsip perkembangan ANIZONE-X, dari fondasi brand sampai operasi cloud dan recovery device.",
};

export default function ArchivePage() {
  const grouped = Object.entries(
    archiveItems.reduce<Record<string, typeof archiveItems>>((acc, item) => {
      acc[item.year] = acc[item.year] ? [...acc[item.year], item] : [item];
      return acc;
    }, {}),
  ).sort((a, b) => Number(b[0]) - Number(a[0]));

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <PageHero
        badge="Operational Timeline"
        eyebrow="Archive / Timeline"
        title="Log perkembangan yang menjaga brand ini tetap terasa hidup."
        description="Arsip dirancang sebagai tempat menyimpan jejak pertumbuhan, eksperimen teknis, dan milestone brand. Formatnya sengaja fleksibel agar nanti mudah diperluas dengan entri nyata, kategori baru, dan tautan lanjutan."
      >
        <article className="panel rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Total entri
          </p>
          <p className="mt-3 text-lg text-white">{archiveItems.length} items</p>
        </article>
        <article className="panel rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Rentang
          </p>
          <p className="mt-3 text-lg text-white">2024 - 2026</p>
        </article>
        <article className="panel rounded-[1.5rem] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            Fokus
          </p>
          <p className="mt-3 text-lg text-white">Brand, cloud, recovery</p>
        </article>
      </PageHero>

      <section className="relative mt-14 space-y-10">
        <div className="absolute bottom-0 left-[4.85rem] top-0 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(114,242,255,0.35),transparent)] lg:block" />
        {grouped.map(([year, items], index) => (
          <MotionReveal
            key={year}
            delay={index * 0.08}
            className="grid gap-5 lg:grid-cols-[140px_1fr]"
          >
            <div className="lg:pt-3">
              <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-headline text-2xl tracking-[-0.05em] text-primary">
                {year}
              </span>
            </div>
            <div className="space-y-4">
              {items.map((item, itemIndex) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className="section-shell rounded-[1.75rem] p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/44">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="mt-4 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                    {item.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          </MotionReveal>
        ))}
      </section>
    </div>
  );
}
