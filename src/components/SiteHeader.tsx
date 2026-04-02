"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/src/i18n/config";

type NavLink = {
  href: string;
  label: string;
  description?: string;
};

type NavGroup = {
  label: string;
  links: NavLink[];
};

const navGroups: NavGroup[] = [
  {
    label: "Explore",
    links: [
      {
        href: "home",
        label: "Home",
        description: "Clean overview and key highlights.",
      },
      {
        href: "about",
        label: "About",
        description: "Story, principles, and trajectory.",
      },
    ],
  },
  {
    label: "Build",
    links: [
      {
        href: "cassiopeia",
        label: "Cassiopeia",
        description: "Product vision and implementation details.",
      },
      {
        href: "contact",
        label: "Contact",
        description: "Start a focused conversation.",
      },
    ],
  },
];

type SiteHeaderProps = {
  locale: Locale;
  brandName?: string;
};

export function SiteHeader({ locale, brandName = "Milos Saric" }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(navGroups[0].label);

  useEffect(() => {
    if (!mobileOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 -mx-6 border-b border-white/70 bg-white/70 px-6 backdrop-blur-xl">
      <nav className="flex h-16 items-center justify-between gap-5">
        <Link
          href={`/${locale}/home`}
          className="text-sm font-medium tracking-[0.22em] text-zinc-900 transition hover:text-zinc-600"
        >
          {brandName.toUpperCase()}
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {navGroups.map((group) => (
            <li key={group.label} className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-900/5 hover:text-zinc-900"
              >
                {group.label}
                <span className="text-xs text-zinc-400 transition group-hover:translate-y-0.5">
                  +
                </span>
              </button>

              <div className="pointer-events-none absolute right-0 top-full mt-3 w-80 translate-y-2 rounded-3xl border border-zinc-200/70 bg-white/95 p-3 opacity-0 shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={`/${locale}/${link.href}`}
                        className="block rounded-2xl px-3 py-2 transition hover:bg-zinc-100"
                      >
                        <p className="text-sm font-medium text-zinc-900">{link.label}</p>
                        <p className="text-xs text-zinc-500">{link.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:border-zinc-300 hover:text-zinc-900 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="text-lg leading-none">{mobileOpen ? "×" : "+"}</span>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-zinc-200/80 transition-[max-height,opacity] duration-300 md:hidden ${
          mobileOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 py-4">
          {navGroups.map((group) => {
            const isExpanded = expandedGroup === group.label;
            return (
              <section key={group.label} className="rounded-2xl border border-zinc-200/80 bg-white/80">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedGroup((value) => (value === group.label ? null : group.label))
                  }
                >
                  <span className="text-sm font-medium text-zinc-900">{group.label}</span>
                  <span className="text-xs text-zinc-500">{isExpanded ? "-" : "+"}</span>
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="min-h-0 space-y-1 px-2 pb-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={`/${locale}/${link.href}`}
                          className="block rounded-xl px-3 py-2.5 transition hover:bg-zinc-100"
                          onClick={() => setMobileOpen(false)}
                        >
                          <p className="text-sm font-medium text-zinc-900">{link.label}</p>
                          <p className="text-xs text-zinc-500">{link.description}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </header>
  );
}
