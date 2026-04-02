"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/src/i18n/config";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { href: "home", label: "Home" },
      { href: "about", label: "About" },
      { href: "cassiopeia", label: "Cassiopeia" },
      { href: "contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "https://nextjs.org/docs", label: "Next.js Docs", external: true },
      { href: "https://vercel.com/docs", label: "Vercel Docs", external: true },
      { href: "https://github.com", label: "GitHub", external: true },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "mailto:hello@milos-saric.com", label: "Email", external: true },
      { href: "https://www.linkedin.com", label: "LinkedIn", external: true },
      { href: "https://x.com", label: "X / Twitter", external: true },
    ],
  },
];

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(footerSections[0]?.title ?? null);
  const year = new Date().getFullYear();

  return (
    <footer className="-mx-6 mt-14 border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50 to-white px-6 pb-8 pt-8 md:mt-16 md:pt-10">
      <div className="rounded-3xl border border-zinc-200/80 bg-white/80 p-4 shadow-[0_18px_35px_rgba(0,0,0,0.05)] backdrop-blur md:p-6">
        <div className="mb-6 flex flex-col gap-2 border-b border-zinc-200/90 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Milos Saric</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">
              Thoughtful digital products, crafted with clarity and calm precision.
            </p>
          </div>
          <p className="text-xs text-zinc-500">Designed for clarity on every screen size.</p>
        </div>

        <div className="hidden grid-cols-3 gap-8 md:grid">
          {footerSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{section.title}</h2>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <FooterAnchor locale={locale} link={link} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="space-y-2 md:hidden">
          {footerSections.map((section) => {
            const isExpanded = expandedSection === section.title;

            return (
              <section key={section.title} className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-50/70">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedSection((value) => (value === section.title ? null : section.title))
                  }
                >
                  <span className="text-sm font-medium text-zinc-800">{section.title}</span>
                  <span className="text-xs text-zinc-500">{isExpanded ? "-" : "+"}</span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="min-h-0 space-y-1 px-2 pb-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <FooterAnchor locale={locale} link={link} className="rounded-xl px-3 py-2.5" />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-zinc-200/90 pt-5 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} Milos Saric. All rights reserved.</p>
          <p className="tracking-[0.14em] uppercase">Minimal by intention</p>
        </div>
      </div>
    </footer>
  );
}

type FooterAnchorProps = {
  locale: Locale;
  link: FooterLink;
  className?: string;
};

function FooterAnchor({ locale, link, className }: FooterAnchorProps) {
  const baseClassName =
    "inline-flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-900/[0.03] hover:text-zinc-900";
  const mergedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  if (link.external) {
    return (
      <a
        href={link.href}
        className={mergedClassName}
        target="_blank"
        rel="noreferrer"
      >
        <span>{link.label}</span>
        <span className="text-xs text-zinc-400">-&gt;</span>
      </a>
    );
  }

  return (
    <Link href={`/${locale}/${link.href}`} className={mergedClassName}>
      <span>{link.label}</span>
    </Link>
  );
}
