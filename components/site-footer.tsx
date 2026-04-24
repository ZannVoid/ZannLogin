import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/8 bg-black/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(114,242,255,0.28),transparent)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="section-shell rounded-[2rem] p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-headline text-sm tracking-[0.24em] text-primary">
              ZV
            </div>
            <div>
              <Link
                href="/"
                className="font-headline text-2xl font-semibold tracking-[-0.08em] text-white"
              >
                {siteConfig.brand}
              </Link>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                {siteConfig.footerMotto}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/72 hover:border-primary/30 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.24em] text-white/42">
            {currentYear} | Built for resilient digital operations
          </p>
        </div>

        <div className="panel rounded-[2rem] p-6 sm:p-7">
          <p className="eyebrow text-[11px]">External Channels</p>
          <div className="mt-5 grid gap-3">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/80 hover:border-primary/28 hover:text-white"
              >
                <span>{link.label}</span>
                <span className="text-primary">Visit</span>
              </a>
            ))}
          </div>

          <a
            href={siteConfig.cvHref}
            className="mt-5 inline-flex rounded-full border border-primary/40 px-4 py-2 text-sm text-primary hover:border-primary hover:bg-primary/10"
          >
            Unduh CV
          </a>
        </div>
      </div>
    </footer>
  );
}
