import Link from "next/link";
import { MotionReveal } from "@/components/motion-reveal";
import { SectionHeading } from "@/components/section-heading";
import { serviceModes, siteConfig } from "@/lib/site-data";

export function HomeContactSpotlight() {
  const primaryChannel = siteConfig.socialLinks[0] ?? {
    href: "/contact",
    label: "Kontak",
    description: "Jalur briefing utama.",
  };

  return (
    <MotionReveal className="mx-auto mt-24 w-full max-w-7xl px-6 sm:px-8">
      <div className="section-shell rounded-[2.25rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.84fr]">
          <div>
            <SectionHeading
              eyebrow="Contact Gateway"
              title="Beranda tetap fokus jual value, kontak pindah ke halaman khusus."
              description="Sekarang jalur briefing tidak lagi numpang di section terakhir homepage. Pengunjung bisa pindah ke halaman kontak yang lebih bersih, sementara beranda tetap fokus ke identitas, kapabilitas, dan portfolio."
            />

            <div className="mt-6 flex flex-wrap gap-2">
              {serviceModes.slice(0, 3).map((mode) => (
                <span key={mode} className="signal-chip">
                  {mode}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-black hover:-translate-y-0.5 hover:bg-white"
              >
                Buka halaman kontak
              </Link>
              <a
                href={primaryChannel.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-7 py-3.5 text-sm font-medium text-white/84 hover:border-primary/40 hover:bg-white/4"
              >
                {primaryChannel.label} langsung
              </a>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
              <p className="eyebrow text-[11px]">Sebelum Menghubungi</p>
              <div className="mt-4 space-y-3">
                {siteConfig.contentIntakeChecklist.slice(0, 3).map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.2rem] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-white/78"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {siteConfig.socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="panel rounded-[1.5rem] p-5 hover:border-primary/28 hover:bg-white/[0.05]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/44">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="font-headline text-xl tracking-[-0.04em] text-white">
                  {link.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {link.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MotionReveal>
  );
}
