import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { portfolioItems, serviceModes } from "@/lib/site-data";

const executionRails = [
  "Discovery: membaca konteks proyek, pressure point, dan target conversion.",
  "Delivery: mengeksekusi interface, struktur, dan flow tanpa mengorbankan kejelasan.",
  "Refinement: membersihkan detail visual, CTA, dan ritme agar output terasa premium.",
];

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Halaman detail portfolio ANIZONE-X berisi showcase project web, device recovery, dan visual production.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <PageHero
        badge="Selected Work"
        eyebrow="Portfolio / Selected Work"
        title="Case-study tiles untuk proyek yang harus terasa sekuat performanya."
        description="Halaman ini dibuat agar nanti mudah berkembang dari sekadar showcase menjadi case-study hub. Untuk v1, fokus utamanya adalah visual impact, deskripsi singkat, tag teknologi, dan jalur keluar yang jelas."
      >
        <div className="panel rounded-[2rem] p-6">
          <p className="eyebrow text-xs">Service Modes</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {serviceModes.map((mode) => (
              <span
                key={mode}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/78"
              >
                {mode}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-muted">
            Struktur konten dan layout kini lebih siap dipakai sebagai hub
            showcase profesional, bukan hanya daftar proyek.
          </p>
        </div>
      </PageHero>

      <MotionReveal delay={0.08} className="mt-16">
        <section className="section-shell rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Execution Lanes"
            title="Proyek dibingkai sebagai sistem kerja yang jelas."
            description="Portfolio yang profesional tidak cuma menampilkan hasil akhir, tapi juga memberi sinyal tentang cara kita berpikir dan mengeksekusi."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {executionRails.map((rail, index) => (
              <article key={rail} className="panel rounded-[1.5rem] p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/78">{rail}</p>
              </article>
            ))}
          </div>
        </section>
      </MotionReveal>

      <section className="mt-14 grid gap-6">
        {portfolioItems.map((item, index) => (
          <MotionReveal
            id={item.slug}
            key={item.slug}
            delay={index * 0.08}
            className="section-shell rounded-[2rem] p-4 sm:p-5"
          >
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="hero-frame panel-strong rounded-[1.75rem] p-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="aspect-[16/10] w-full rounded-[1.4rem] border border-white/8 object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/44">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
                    {item.category}
                  </span>
                </div>
                <h2 className="mt-4 font-headline text-4xl font-semibold tracking-[-0.05em] text-white">
                  {item.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-muted">
                  {item.description}
                </p>
                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-primary">
                    Impact
                  </p>
                  <p className="mt-3 text-base leading-8 text-white/82">
                    {item.impact}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-black hover:bg-white"
                  >
                    Diskusikan proyek serupa
                  </Link>
                  <Link
                    href="/archive"
                    className="rounded-full border border-white/14 px-5 py-3 text-sm text-white/84 hover:border-primary/40 hover:text-white"
                  >
                    Lihat konteks operasional
                  </Link>
                </div>
              </div>
            </div>
          </MotionReveal>
        ))}
      </section>
    </div>
  );
}
