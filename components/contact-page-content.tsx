import { ContactForm } from "@/components/contact-form";
import { MotionReveal } from "@/components/motion-reveal";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-data";

export function ContactPageContent() {
  const responseSignals = [
    { label: "Kanal tercepat", value: "WhatsApp briefing" },
    { label: "Output awal", value: "Scope, budget, timeline" },
    { label: "Gaya kerja", value: "Cepat, langsung, terstruktur" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24">
      <PageHero
        badge="Contact Dossier"
        eyebrow="Contact / Briefing"
        title="Halaman kontak yang berdiri sendiri untuk briefing yang lebih rapi."
        description="Jalur kontak sekarang dipisahkan dari beranda agar navigasi terasa lebih jelas, status navbar lebih konsisten, dan alur masuk proyek lebih mudah dirawat."
      >
        {responseSignals.map((signal) => (
          <article key={signal.label} className="panel rounded-[1.5rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {signal.label}
            </p>
            <p className="mt-3 text-lg text-white">{signal.value}</p>
          </article>
        ))}
      </PageHero>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <MotionReveal>
          <div className="section-shell rounded-[2rem] p-8">
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
                  className="panel rounded-[1.4rem] px-4 py-4 hover:border-primary/30 hover:bg-white/4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{link.label}</p>
                      <p className="mt-1 text-sm text-muted">{link.description}</p>
                    </div>
                    <span className="text-primary">Buka</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="eyebrow text-[11px]">What To Prepare</p>
              <div className="mt-4 space-y-3">
                {siteConfig.contentIntakeChecklist.slice(0, 4).map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-white/78"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={siteConfig.cvHref}
              className="mt-5 inline-flex rounded-full border border-primary/40 px-5 py-3 text-sm font-medium text-primary hover:border-primary hover:bg-primary/10"
            >
              Unduh CV saat ini
            </a>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <ContactForm />
        </MotionReveal>
      </div>
    </div>
  );
}
