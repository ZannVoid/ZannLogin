"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentPath = pathname || "/";

  const selectedHref =
    siteConfig.nav.find((item) => {
      const [baseHref] = item.href.split("#");
      return (baseHref || "/") === currentPath;
    })?.href ??
    siteConfig.nav[0]?.href ??
    "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[rgba(5,8,12,0.78)] shadow-[0_10px_32px_rgba(0,0,0,0.24)]"
          : "border-b border-transparent bg-[rgba(5,8,12,0.34)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(114,242,255,0.3),transparent)] opacity-60" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-white"
          onClick={() => setOpen(false)}
          aria-label="Home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] font-headline text-sm tracking-[0.22em] text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
            ZV
          </span>
          <span>
            <span className="block font-headline text-2xl font-semibold tracking-[-0.08em]">
              {siteConfig.brand}
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.28em] text-white/46 sm:block">
              Next.js / UI-UX / Automation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {siteConfig.nav.map((item) => {
            const active = item.href === selectedHref;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                  active
                    ? "border border-primary/25 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(114,242,255,0.12),rgba(213,145,255,0.16))] text-white shadow-[0_0_18px_rgba(114,242,255,0.14)]"
                    : "text-white/66 hover:bg-white/6 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                      active ? "bg-primary opacity-100" : "bg-white/40 opacity-0"
                    }`}
                  />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/64">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(141,247,176,0.6)]" />
            Open for builds
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-primary/50 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:border-primary hover:bg-primary/16"
          >
            Mulai Proyek
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all hover:bg-white/10 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={`font-headline text-lg transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            {open ? "X" : "+"}
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/8 bg-[rgba(7,11,16,0.94)] transition-all duration-300 md:hidden ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5">
          {siteConfig.nav.map((item) => {
            const active = item.href === selectedHref;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 text-base transition-all duration-200 ${
                  active
                    ? "border border-primary/24 bg-white/10 text-white"
                    : "bg-white/3 text-white/72 hover:bg-white/8 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="block rounded-2xl border border-primary/40 px-4 py-3 text-base text-primary transition-all duration-200 hover:bg-primary/10"
            onClick={() => setOpen(false)}
          >
            Mulai Proyek
          </Link>
        </nav>
      </div>
    </header>
  );
}
