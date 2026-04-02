import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { hasLocale, locales } from "@/src/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Milos Saric",
    template: "%s | Milos Saric",
  },
  description: "Personal website of Milos Saric",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const navItems = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "cassiopeia", label: "Cassiopeia" },
  { href: "contact", label: "Contact" },
] as const;

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6">
          <header className="border-b border-zinc-200 py-6">
            <nav className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href={`/${locale}/home`}
                className="text-lg font-semibold tracking-tight"
              >
                Milos Saric
              </Link>
              <ul className="flex flex-wrap items-center gap-4 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={`/${locale}/${item.href}`}
                      className="rounded-full px-3 py-1.5 transition hover:bg-zinc-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main className="flex-1 py-12">{children}</main>
          <footer className="border-t border-zinc-200 py-6 text-sm text-zinc-600">
            <p>Built by Milos Saric.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
