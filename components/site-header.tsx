"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, useState } from "react";
import { siteConfig } from "@/lib/site-data";

function subscribeToHashChange(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);

  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function getHashSnapshot() {
  return window.location.hash;
}

function getServerHashSnapshot() {
  return "";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const currentHash = useSyncExternalStore(
    subscribeToHashChange,
    getHashSnapshot,
    getServerHashSnapshot,
  );

  const currentPath = pathname || "/";

  // Enforce a single selected nav item at any time:
  // 1) exact hash link on current page, else
  // 2) exact route match, else
  // 3) first nav item as fallback.
  const selectedHref =
    siteConfig.nav.find((item) => {
      const [baseHref, hashFragment] = item.href.split("#");
      if (!hashFragment) {
        return false;
      }
      return (baseHref || "/") === currentPath && `#${hashFragment}` === currentHash;
    })?.href ??
    siteConfig.nav.find((item) => {
      const [baseHref, hashFragment] = item.href.split("#");
      if (hashFragment) {
        return false;
      }
      return (baseHref || "/") === currentPath;
    })?.href ??
    siteConfig.nav[0]?.href ??
    "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="font-headline text-2xl font-semibold tracking-[-0.08em] text-white transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
          aria-label="Home"
        >
          {siteConfig.brand}
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {siteConfig.nav.map((item) => {
            const [, hashFragment] = item.href.split("#");
            const active = item.href === selectedHref;
            const isRouteItem = !hashFragment;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                  active ? "text-white" : "text-white/66 hover:bg-white/6 hover:text-white"
                }`}
                aria-current={active ? (isRouteItem ? "page" : "location") : undefined}
                onClick={() => setOpen(false)}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-primary/25 bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(114,242,255,0.12),rgba(213,145,255,0.16))] shadow-[0_0_24px_rgba(114,242,255,0.16)]"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#contact"
            className="rounded-full border border-primary/50 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-200 hover:border-primary hover:bg-primary/16 hover:shadow-[0_0_20px_rgba(114,242,255,0.2)]"
          >
            Hubungi Zann
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:bg-white/10 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <motion.span
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="font-headline text-lg"
          >
            {open ? "X" : "+"}
          </motion.span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/8 bg-black/85 backdrop-blur-xl md:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5">
              {siteConfig.nav.map((item, index) => {
                const [, hashFragment] = item.href.split("#");
                const active = item.href === selectedHref;
                const isRouteItem = !hashFragment;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-2xl px-4 py-3 text-base transition-all duration-200 ${
                        active
                          ? "border border-primary/24 bg-white/10 text-white shadow-[0_0_20px_rgba(114,242,255,0.1)]"
                          : "bg-white/3 text-white/72 hover:bg-white/8 hover:text-white"
                      }`}
                      aria-current={active ? (isRouteItem ? "page" : "location") : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.3,
                  delay: siteConfig.nav.length * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/#contact"
                  className="block rounded-2xl border border-primary/40 px-4 py-3 text-base text-primary transition-all duration-200 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(114,242,255,0.2)]"
                  onClick={() => setOpen(false)}
                >
                  Hubungi Zann
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
