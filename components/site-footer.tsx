import Link from "next/link";
import { siteConfig } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
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

        <div className="flex flex-wrap gap-4">
          {siteConfig.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 hover:border-primary hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.cvHref}
            className="rounded-full border border-primary/40 px-4 py-2 text-sm text-primary hover:border-primary hover:bg-primary/10"
          >
            Unduh CV
          </a>
        </div>
      </div>
    </footer>
  );
}
