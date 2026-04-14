import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { portfolioItems, serviceModes } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Halaman detail portfolio ANIZONE-X berisi showcase project web, device recovery, dan visual production.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <MotionReveal className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <SectionHeading
          eyebrow="Portfolio / Selected Work"
          title="Case-study tiles untuk proyek yang harus terasa sekuat performanya."
          description="Halaman ini dibuat agar nanti mudah berkembang dari sekadar showcase menjadi case-study hub. Untuk v1, fokus utamanya adalah visual impact, deskripsi singkat, tag teknologi, dan jalur keluar yang jelas."
        />

        <div className="panel rounded-[2rem] p-8">
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
            Struktur ini sengaja memisahkan konten portfolio dari layout, jadi
            item baru bisa ditambah lewat data config tanpa perlu menulis ulang
            section besar.
          </p>
        </div>
      </MotionReveal>

      <section className="mt-14 grid gap-6">
        {portfolioItems.map((item, index) => (
          <MotionReveal
            id={item.slug}
            key={item.slug}
            delay={index * 0.08}
            className="panel rounded-[2rem] p-4 sm:p-5"
          >
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] w-full rounded-[1.5rem] border border-white/8 object-cover"
                />
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="eyebrow text-[11px]">{item.category}</p>
                <h2 className="mt-4 font-headline text-4xl font-semibold tracking-[-0.05em] text-white">
                  {item.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-muted">
                  {item.description}
                </p>
                <p className="mt-5 text-base leading-8 text-white/82">
                  {item.impact}
                </p>
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
                    href="/#contact"
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
