import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/motion-reveal";
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
      <MotionReveal className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="panel-strong rounded-[2rem] p-4">
          <Image
            src={heroContent.heroImage}
            alt="Portrait Bendzanu Kamagifi"
            width={1000}
            height={1000}
            className="aspect-[4/5] w-full rounded-[1.5rem] border border-white/8 object-cover object-center"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="About / Profile"
            title="Identitas teknis yang dibangun untuk tahan tekanan."
            description="Halaman ini memperluas section identitas dari landing page menjadi gambaran yang lebih lengkap tentang cara kerja, fokus, dan prinsip operasional di balik ANIZONE-X."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutMetrics.map((metric) => (
              <article key={metric.label} className="panel rounded-[1.5rem] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-3 text-lg text-white">{metric.value}</p>
              </article>
            ))}
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        delay={0.08}
        className="mt-20 grid gap-10 lg:grid-cols-[1fr_0.95fr]"
      >
        <div>
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
        </div>

        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow text-xs">Core Principles</p>
          <div className="mt-6 space-y-4">
            {principles.map((principle) => (
              <div
                key={principle}
                className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4 text-base text-white/88"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.12} className="mt-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="Bagaimana kemampuan teknis diterjemahkan menjadi hasil."
          description="Capability blocks ini menjaga halaman tetap praktis: siapa pun yang membaca bisa langsung menangkap bentuk kontribusi yang tersedia."
        />

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
      </MotionReveal>

      <MotionReveal delay={0.16} className="mt-20">
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
      </MotionReveal>
    </div>
  );
}
