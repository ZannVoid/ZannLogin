import Image from "next/image";
import Link from "next/link";
import { listArchives, listProjects } from "@/backend/content/service";
import { HomeContactSpotlight } from "@/components/home-contact-spotlight";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  aboutNarrative,
  capabilityCards,
  heroContent,
  serviceModes,
  siteConfig,
  skillCategories,
  stats,
} from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [portfolioItems, archiveItems] = await Promise.all([
    listProjects({ status: "published", featuredOnly: true, limit: 3 }),
    listArchives({ status: "published", limit: 4 }),
  ]);

  return (
    <div className="pb-16 sm:pb-24">
      <MotionReveal className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:py-20">
        <section className="section-shell rounded-[2.5rem] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative z-10">
              <div className="flex flex-wrap gap-3">
                <span className="signal-chip">Entity SEO</span>
                <span className="signal-chip">Next.js / UI-UX / Automation</span>
              </div>

              <p className="eyebrow mt-8 text-xs sm:text-sm">
                {heroContent.eyebrow}
              </p>
              <div className="pulse-line mt-4 h-px w-32 bg-[linear-gradient(90deg,rgba(114,242,255,0.16),rgba(114,242,255,0.96),rgba(255,225,115,0.4),transparent)]" />

              <h1 className="text-balance mt-6 max-w-4xl font-headline text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl lg:text-[6.5rem] lg:leading-[0.94]">
                {siteConfig.founder}
              </h1>
              <h2 className="mt-4 max-w-3xl bg-[linear-gradient(90deg,#72f2ff,#d9fbff,#ffe173)] bg-clip-text font-headline text-2xl font-semibold tracking-[-0.05em] text-transparent sm:text-4xl">
                {siteConfig.tagline}
              </h2>
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

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {capabilityCards.map((card, index) => (
                  <article
                    key={card.title}
                    className={`panel rounded-[1.5rem] p-4 ${
                      index === 0 ? "border-primary/20" : ""
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/44">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-headline text-lg tracking-[-0.04em] text-white">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="hero-frame panel-strong rounded-[2.2rem] p-3 sm:p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(114,242,255,0.14),transparent_20%),radial-gradient(circle_at_80%_18%,rgba(255,225,115,0.1),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
                <Image
                  src={heroContent.heroImage}
                  alt="Portrait Bendzanu Kamagifi"
                  width={900}
                  height={900}
                  priority
                  quality={72}
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                  className="relative z-10 aspect-[4/5] w-full rounded-[1.65rem] border border-white/8 object-cover object-center"
                />
              </div>

              <div className="panel absolute -bottom-6 left-4 right-4 z-20 rounded-[1.5rem] p-5 sm:left-10 sm:right-10">
                <p className="eyebrow text-[11px]">Entity Signal</p>
                <p className="mt-3 text-lg font-medium text-white">
                  &quot;Nama yang konsisten membuat brand lebih mudah dipercaya,
                  diingat, dan ditemukan.&quot;
                </p>
              </div>

              <div className="panel absolute -top-4 right-4 z-20 hidden max-w-[16rem] rounded-[1.4rem] p-4 sm:block">
                <p className="eyebrow text-[11px]">Current Focus</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {serviceModes.slice(0, 2).map((mode) => (
                    <span
                      key={mode}
                      className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/76"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-6 w-full max-w-7xl px-6 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.14fr_0.86fr]">
          <div className="section-shell rounded-[2rem] p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-4">
              {stats.map((item, index) => (
                <article
                  key={item.label}
                  className={`panel rounded-[1.5rem] p-5 ${
                    index === 0 ? "border-primary/20" : ""
                  }`}
                >
                  <p className="font-headline text-3xl font-semibold tracking-[-0.05em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel rounded-[2rem] p-6">
            <p className="eyebrow text-[11px]">Operating Lanes</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceModes.map((mode) => (
                <span key={mode} className="signal-chip">
                  {mode}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-muted">
              Experience ini sekarang dibentuk seperti portfolio operator, bukan
              sekadar landing biasa. Jadi trust, kapabilitas, dan CTA bergerak
              dalam satu ritme yang lebih jelas.
            </p>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="section-shell rounded-[2rem] p-8">
            <p className="eyebrow text-xs">Identity Core</p>
            <h2 className="mt-4 font-headline text-4xl font-semibold tracking-[-0.05em] text-white">
              Web Developer Indonesia yang membangun sistem digital dengan identitas yang jelas.
            </h2>
            <div className="mt-8 space-y-4">
              <div className="rounded-[1.4rem] border border-primary/18 bg-primary/8 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-primary">
                  Nama
                </p>
                <p className="mt-3 text-lg text-white">{siteConfig.founder}</p>
              </div>
              <div className="rounded-[1.4rem] border border-accent/18 bg-accent/8 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-accent">
                  Dikenal sebagai
                </p>
                <p className="mt-3 text-lg text-white">{siteConfig.brand}</p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="eyebrow text-[11px]">Signal</p>
              <p className="mt-3 text-base leading-7 text-white/82">
                Personal brand ini dibentuk agar Google, klien, dan kolaborator
                membaca satu identitas yang sama di setiap sentuhan digital.
              </p>
            </div>
          </div>

          <div className="section-shell rounded-[2rem] p-8">
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
        </div>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8">
        <section className="section-shell rounded-[2.2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Arsenal Teknis"
              title="Skill stack yang tidak berhenti di satu medium."
              description="ZannVoid memadukan pengembangan Next.js, UI/UX, automation, dan delivery system supaya setiap project terasa utuh, bukan potongan skill yang berdiri sendiri."
            />
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-6 text-white/74">
              Fokus utamanya sekarang diarahkan ke web development, design clarity,
              dan automation yang relevan untuk brand digital modern.
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {skillCategories.map((skill, index) => (
              <MotionReveal
                key={skill.title}
                delay={index * 0.08}
                className={`rounded-[2rem] p-6 ${
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
        </section>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8">
        <section className="section-shell rounded-[2.2rem] p-6 sm:p-8">
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
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="aspect-[4/3] w-full rounded-[1.5rem] border border-white/8 object-cover"
                />
                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-white/44">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="eyebrow text-[11px]">{item.category}</p>
                  </div>
                  <h3 className="mt-3 font-headline text-2xl font-semibold tracking-[-0.05em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.description}
                  </p>
                  <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-primary">
                      Impact
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/78">
                      {item.impact}
                    </p>
                  </div>
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
            {portfolioItems.length === 0 ? (
              <article className="panel rounded-[2rem] p-6 text-sm leading-7 text-muted lg:col-span-3">
                Belum ada project yang dipublikasikan. Tambahkan data project lewat
                backend CRUD supaya section ini terisi otomatis.
              </article>
            ) : null}
          </div>
        </section>
      </MotionReveal>

      <MotionReveal className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8">
        <section className="section-shell rounded-[2.25rem] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Operational Archive"
              title="Rekam jejak yang terus dibangun, tahun demi tahun."
              description="Arsip ini diposisikan sebagai log perkembangan personal brand, eksperimen produk, dan sistem digital yang membentuk identitas ZannVoid."
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
                className="panel rounded-[1.5rem] p-5"
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
            {archiveItems.length === 0 ? (
              <article className="panel rounded-[1.5rem] p-5 text-sm leading-7 text-muted md:col-span-2">
                Arsip publik belum ada. Buat entry baru lewat backend supaya timeline
                brand mulai terbentuk di halaman ini.
              </article>
            ) : null}
          </div>
        </section>
      </MotionReveal>

      <HomeContactSpotlight />
    </div>
  );
}
