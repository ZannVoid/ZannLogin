import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutNarrative,
  archiveItems,
  capabilityCards,
  heroContent,
  portfolioItems,
  siteConfig,
  skillCategories,
  stats,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Landing page utama ANIZONE-X untuk menampilkan identitas, skill set, portfolio unggulan, dan jalur kontak cepat.",
};

export default function Home() {
  return (
    <div className="pb-16 sm:pb-24">
      <MotionReveal className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
        <div className="relative z-10">
          <p className="eyebrow text-xs sm:text-sm">{heroContent.eyebrow}</p>
          <div className="pulse-line mt-4 h-px w-28 bg-[linear-gradient(90deg,rgba(114,242,255,0.16),rgba(114,242,255,0.96),rgba(213,145,255,0.4),transparent)]" />
          <h1 className="mt-6 max-w-4xl font-headline text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl lg:text-[6.75rem] lg:leading-[0.94]">
            {heroContent.headline[0]}
            <span className="block text-primary">{heroContent.headline[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-xl">
            {heroContent.subheadline}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={heroContent.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black hover:-translate-y-0.5 hover:bg-white"
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
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="panel rounded-[1.5rem] p-4 hover:-translate-y-1"
              >
                <p className="font-headline text-lg tracking-[-0.04em] text-white">
                  {link.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="grid-frame noise-overlay relative">
          <div className="panel-strong relative overflow-hidden rounded-[2rem] p-3">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(114,242,255,0.14),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(213,145,255,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
            <Image
              src={heroContent.heroImage}
              alt="Portrait Bendzanu Kamagifi"
              width={900}
              height={900}
              priority
              className="relative z-10 aspect-[4/5] w-full rounded-[1.5rem] border border-white/8 object-cover object-center"
            />
          </div>

          <div className="panel absolute -bottom-6 left-4 right-4 z-20 rounded-[1.5rem] p-5 sm:left-10 sm:right-10">
            <p className="eyebrow text-[11px]">Operational signature</p>
            <p className="mt-3 text-lg font-medium text-white">
              &quot;Sistem tidak cukup hanya berjalan. Ia harus tetap hidup saat
              orang lain panik.&quot;
            </p>
          </div>
        </div>
      </MotionReveal>

      <section className="mx-auto mt-6 grid w-full max-w-7xl gap-4 px-6 sm:px-8 md:grid-cols-4">
        {stats.map((item, index) => (
          <MotionReveal
            key={item.label}
            delay={index * 0.08}
            className="panel rounded-[1.5rem] p-5 hover:border-primary/25"
          >
            <p className="font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
              {item.value}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
              {item.label}
            </p>
          </MotionReveal>
        ))}
      </section>

      <MotionReveal
        id="experience"
        className="mx-auto mt-24 grid w-full max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow text-xs">Identitas Utama</p>
          <h2 className="mt-4 font-headline text-4xl font-semibold tracking-[-0.05em] text-white">
            Pendiri yang bergerak lintas cloud, recovery, dan visual systems.
          </h2>
          <div className="mt-8 space-y-4">
            <div className="rounded-[1.4rem] border border-primary/18 bg-primary/8 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-primary">
                Status
              </p>
              <p className="mt-3 text-lg text-white">16 Tahun / Siswa SMK</p>
            </div>
            <div className="rounded-[1.4rem] border border-secondary/18 bg-secondary/8 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">
                Didirikan
              </p>
              <p className="mt-3 text-lg text-white">Berjalan sejak 2024</p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Profile"
            title="Brutal dalam standar, tenang dalam eksekusi."
            description="Draft asli dipertahankan sebagai fondasi karakter, lalu dibersihkan menjadi narasi yang lebih fokus, lebih profesional, dan lebih siap menjual kapabilitas nyata."
          />
          <div className="mt-8 grid gap-5">
            {aboutNarrative.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {capabilityCards.map((card) => (
              <article key={card.title} className="panel rounded-[1.5rem] p-5">
                <p className="font-headline text-xl tracking-[-0.04em] text-white">
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex rounded-full border border-white/14 px-5 py-3 text-sm text-white/84 hover:border-primary/40 hover:text-white"
            >
              Buka profil lengkap
            </Link>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        id="skills"
        className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8"
      >
        <SectionHeading
          eyebrow="Arsenal Teknis"
          title="Skill stack yang tidak berhenti di satu medium."
          description="AniZone-X bergerak dari infrastruktur sampai visual delivery. Masing-masing disiplin dirancang untuk saling menguatkan, bukan berjalan sendiri-sendiri."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {skillCategories.map((skill, index) => (
            <MotionReveal
              key={skill.title}
              delay={index * 0.08}
              className={`noise-overlay rounded-[2rem] border border-white/8 p-6 ${
                index === 0
                  ? "panel-strong lg:col-span-7 lg:min-h-[24rem]"
                  : index === 1
                    ? "panel lg:col-span-5"
                    : index === 2
                      ? "panel lg:col-span-5"
                      : "panel lg:col-span-7"
              }`}
            >
              <p className="eyebrow text-[11px]">{skill.label}</p>
              <h3 className="mt-4 font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                {skill.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                {skill.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </MotionReveal>
          ))}
        </div>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Work"
            title="Eksperimen yang dirancang untuk berubah jadi aset."
            description="Halaman portfolio penuh menyimpan detail lebih lengkap, sementara landing ini fokus pada karya yang paling cepat menjelaskan kualitas eksekusi."
          />
          <Link
            href="/portfolio"
            className="inline-flex rounded-full border border-white/14 px-5 py-3 text-sm text-white/84 hover:border-primary/40 hover:text-white"
          >
            Buka semua karya
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <MotionReveal
              key={item.slug}
              delay={index * 0.08}
              className="panel rounded-[2rem] p-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={800}
                className="aspect-[4/3] w-full rounded-[1.5rem] border border-white/8 object-cover"
              />
              <div className="mt-5">
                <p className="eyebrow text-[11px]">{item.category}</p>
                <h3 className="mt-3 font-headline text-2xl font-semibold tracking-[-0.05em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
                <p className="mt-4 text-sm text-white/78">{item.impact}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex text-sm font-medium text-primary hover:text-white"
                >
                  Lihat detail
                </Link>
              </div>
            </MotionReveal>
          ))}
        </div>
      </MotionReveal>

      <MotionReveal
        id="archive"
        className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8"
      >
        <div className="rounded-[2.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(13,17,24,0.92),rgba(9,13,18,0.98))] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Operational Archive"
              title="Rekam jejak yang terus dibangun, tahun demi tahun."
              description="Arsip ini diposisikan sebagai log perkembangan brand, eksperimen, dan operasi teknis yang membentuk identitas ANIZONE-X."
            />
            <Link
              href="/archive"
              className="inline-flex rounded-full border border-white/14 px-5 py-3 text-sm text-white/84 hover:border-primary/40 hover:text-white"
            >
              Buka arsip lengkap
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {archiveItems.slice(0, 4).map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
                    {item.year}
                  </span>
                  <span className="text-sm text-white/60">{item.category}</span>
                </div>
                <h3 className="mt-4 font-headline text-2xl font-semibold tracking-[-0.05em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </MotionReveal>

      <MotionReveal
        id="contact"
        className="mx-auto mt-24 grid w-full max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow text-xs">Contact Stack</p>
          <h2 className="mt-4 font-headline text-4xl font-semibold tracking-[-0.05em] text-white">
            Jalur tercepat untuk mengaktifkan proyek baru.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            Gunakan form untuk menyiapkan briefing awal ke WhatsApp, atau lompat
            langsung ke kanal sosial yang sudah tersedia. Semua tautan aktif
            dipusatkan dari satu konfigurasi lokal agar gampang diperbarui.
          </p>

          <div className="mt-8 space-y-4">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[1.4rem] border border-white/8 px-4 py-4 hover:border-primary/30 hover:bg-white/4"
              >
                <div>
                  <p className="font-medium text-white">{link.label}</p>
                  <p className="mt-1 text-sm text-muted">{link.description}</p>
                </div>
                <span className="text-primary">Buka</span>
              </a>
            ))}
          </div>

          <a
            href={siteConfig.cvHref}
            className="mt-5 inline-flex rounded-full border border-primary/40 px-5 py-3 text-sm font-medium text-primary hover:border-primary hover:bg-primary/10"
          >
            Unduh CV saat ini
          </a>
        </div>

        <ContactForm />
      </MotionReveal>
    </div>
  );
}
