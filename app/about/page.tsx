import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutMetrics,
  aboutNarrative,
  capabilityCards,
  heroContent,
  principles,
  stats,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Profil lengkap Bendzanu Kamagifi dan pendekatan kerja ANIZONE-X di bidang sistem, recovery, dan visual execution.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <PageHero
        badge="Operational Dossier"
        eyebrow="About / Profile"
        title="Identitas teknis yang dibangun untuk tahan tekanan."
        description="Halaman ini memperluas section identitas dari landing page menjadi gambaran yang lebih lengkap tentang cara kerja, fokus, dan prinsip operasional di balik ANIZONE-X."
      >
        {aboutMetrics.map((metric) => (
          <article key={metric.label} className="panel rounded-[1.5rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {metric.label}
            </p>
            <p className="mt-3 text-lg text-white">{metric.value}</p>
          </article>
        ))}
      </PageHero>

      <MotionReveal delay={0.08} className="mt-16">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="hero-frame panel-strong rounded-[2rem] p-4">
            <Image
              src={heroContent.heroImage}
              alt="Portrait Bendzanu Kamagifi"
              width={1000}
              height={1000}
              className="aspect-[4/5] w-full rounded-[1.5rem] border border-white/8 object-cover object-center"
            />
            <div className="panel absolute bottom-5 left-5 right-5 rounded-[1.35rem] p-4">
              <p className="eyebrow text-[11px]">Pressure-ready Operator</p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                Sistem, recovery, dan visual execution dirakit jadi identitas
                kerja yang bisa tampil kuat di layar maupun di belakang operasi.
              </p>
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-8">
            <SectionHeading
              eyebrow="Narrative"
              title="Rasa ingin tahu yang diarahkan ke sistem nyata."
              description="Copy v1 tetap setia pada persona asli, tetapi dipoles agar lebih fokus pada value yang bisa dirasakan klien atau kolaborator."
            />

            <div className="mt-8 space-y-6">
              {aboutNarrative.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => (
                <div
                  key={principle}
                  className="panel rounded-[1.4rem] px-5 py-4 text-base text-white/88"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 leading-7">{principle}</p>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full border border-primary/40 px-5 py-3 text-sm text-primary hover:border-primary hover:bg-primary/10"
            >
              Mulai percakapan
            </Link>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.12} className="mt-16">
        <section className="section-shell rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Capabilities"
              title="Bagaimana kemampuan teknis diterjemahkan menjadi hasil."
              description="Capability blocks ini menjaga halaman tetap praktis: siapa pun yang membaca bisa langsung menangkap bentuk kontribusi yang tersedia."
            />
            <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-6 text-white/72">
              Fokusnya bukan tampil rumit, tapi menyampaikan kompetensi dengan
              rasa percaya diri yang lebih profesional.
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {capabilityCards.map((card) => (
              <article key={card.title} className="panel rounded-[1.75rem] p-6">
                <h3 className="font-headline text-2xl font-semibold tracking-[-0.05em] text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.16} className="mt-16">
        <section className="section-shell rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Signals"
            title="Metric snapshot yang memperkuat kredibilitas."
            description="Stat utama tetap disimpan sebagai blok cepat tangkap, agar halaman profil tidak kehilangan sense of momentum."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="panel rounded-[1.5rem] p-5">
                <p className="font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                  {item.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}
