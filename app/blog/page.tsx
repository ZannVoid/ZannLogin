import type { Metadata } from "next";
import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Project by ZannVoid",
  description:
    "Project by ZannVoid adalah halaman blog yang menjelaskan karya, identitas, dan fokus Bendzanu Kamagifi sebagai Web Developer Indonesia.",
};

const writingSignals = [
  "Bendzanu Kamagifi dan ZannVoid adalah identitas yang merujuk ke orang yang sama.",
  "Website ini menempatkan Next.js, UI/UX, dan automation sebagai fokus utama.",
  "Setiap project dihubungkan kembali ke website, GitHub, dan Instagram ZannVoid.",
];

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <PageHero
        badge="Editorial Entry"
        eyebrow="Blog / Personal Branding"
        title="Project by ZannVoid"
        description="Halaman ini menjadi simpul konten yang menjelaskan siapa Bendzanu Kamagifi, apa yang dibangun di bawah nama ZannVoid, dan bagaimana semuanya disusun sebagai satu identitas digital."
      >
        {writingSignals.map((signal) => (
          <article key={signal} className="panel rounded-[1.5rem] p-5">
            <p className="text-sm leading-7 text-white/82">{signal}</p>
          </article>
        ))}
      </PageHero>

      <MotionReveal delay={0.08} className="mt-16">
        <section className="section-shell rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Article"
            title="Siapa Bendzanu Kamagifi?"
            description="Bendzanu Kamagifi, dikenal sebagai ZannVoid, adalah Web Developer Indonesia yang fokus pada Next.js, UI/UX, automation, dan sistem digital."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="panel rounded-[1.75rem] p-6">
              <h2 className="font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                Personal brand yang dibangun lewat karya nyata
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">
                Di website ini, nama Bendzanu Kamagifi selalu dipasangkan dengan
                alias ZannVoid agar mesin pencari dan pengunjung membaca satu
                identitas yang konsisten. Fokus utamanya ada pada pengembangan
                website berbasis Next.js, perapian UI/UX, dan automation system
                yang membantu workflow digital berjalan lebih efisien.
              </p>
              <p className="mt-5 text-base leading-8 text-muted">
                Setiap project by ZannVoid dirancang supaya tidak hanya terlihat
                bagus, tetapi juga punya struktur teknis, metadata, dan sinyal
                branding yang kuat untuk jangka panjang.
              </p>
            </article>

            <article className="panel rounded-[1.75rem] p-6">
              <p className="eyebrow text-[11px]">Connected Profiles</p>
              <div className="mt-5 grid gap-3">
                {siteConfig.sameAs.map((href, index) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.3rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/80 hover:border-primary/28 hover:text-white"
                  >
                    {String(index + 1).padStart(2, "0")} - {href}
                  </a>
                ))}
                <a
                  href={siteConfig.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[1.3rem] border border-primary/28 bg-primary/10 px-4 py-4 text-sm text-primary hover:border-primary hover:text-white"
                >
                  03 - {siteConfig.siteUrl}
                </a>
              </div>
            </article>
          </div>
        </section>
      </MotionReveal>

      <MotionReveal delay={0.12} className="mt-16">
        <section className="section-shell rounded-[2rem] p-6 sm:p-8">
          <SectionHeading
            eyebrow="Next Step"
            title="Karya, profil, dan kanal eksternal harus saling menguatkan."
            description="GitHub bio, Instagram bio, dan website utama perlu selalu mengarah kembali ke ZannVoid sebagai identitas pusat."
          />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black hover:-translate-y-0.5 hover:bg-white"
            >
              Lihat project by ZannVoid
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-7 py-3.5 text-sm font-medium text-white/84 hover:border-primary/40 hover:bg-white/4"
            >
              Baca profil lengkap
            </Link>
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}
