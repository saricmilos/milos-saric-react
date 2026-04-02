import { notFound } from "next/navigation";
import Image from "next/image";
import { hasLocale } from "@/src/i18n/config";

export default async function HomePage(props: PageProps<"/[locale]/home">) {
  const { locale } = await props.params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <section className="space-y-10 md:space-y-14">
      <div className="grid gap-6 rounded-[2.2rem] border border-zinc-200/90 bg-gradient-to-b from-white via-zinc-50/85 to-zinc-100/70 p-5 shadow-[0_30px_70px_rgba(15,23,42,0.08)] sm:p-7 md:grid-cols-[1.2fr_0.9fr] md:gap-10 md:p-10">
        <div className="order-2 flex flex-col justify-center space-y-6 md:order-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-zinc-500">
            MILOS SARIC
          </p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
              Full Stack Data Scientist &amp; AI/ML Engineer
            </h1>
            <p className="max-w-xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
              Driving innovation with data science and machine learning, powered
              by a strong mathematical foundation from Electrical Engineering and
              Power Systems.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="mailto:milossaric@outlook.com"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-6 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Email
            </a>
            <a
              href={`/${locale}/contact`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white/85 px-6 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              Let&apos;s Collaborate
            </a>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <div className="relative w-full max-w-[22rem] overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-[0_25px_50px_rgba(17,24,39,0.12)]">
            <Image
              src="/milos-photo.svg"
              alt="Portrait of Milos Saric"
              width={900}
              height={900}
              priority
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {highlights.map((item) => (
          <article
            key={item.label}
            className="rounded-3xl border border-zinc-200/80 bg-white/85 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.06)] backdrop-blur"
          >
            <p className="text-2xl font-semibold tracking-tight text-zinc-900">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
          </article>
        ))}
      </div>

      <div className="rounded-[2rem] border border-zinc-200/90 bg-white p-5 shadow-[0_24px_50px_rgba(15,23,42,0.08)] sm:p-7 md:p-9">
        <div className="mb-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Socials
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
            Connect with me
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="group rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 transition hover:border-zinc-300 hover:bg-zinc-100/80"
            >
              <p className="text-sm font-semibold tracking-wide text-zinc-900">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{item.description}</p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 transition group-hover:text-zinc-700">
                {item.cta}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const highlights = [
  { value: "15+", label: "Projects" },
  { value: "6+", label: "Languages & Frameworks" },
  { value: "7+", label: "Years Experience" },
  { value: "1", label: "Published Platform" },
  { value: "MSc", label: "Engineering" },
] as const;

const socialLinks = [
  {
    label: "Email",
    description: "milossaric@outlook.com",
    cta: "Email",
    href: "mailto:milossaric@outlook.com",
    external: false,
  },
  {
    label: "LinkedIn",
    description: "Connect with me",
    cta: "Open LinkedIn",
    href: "https://www.linkedin.com/",
    external: true,
  },
  {
    label: "GitHub",
    description: "View my projects",
    cta: "Open GitHub",
    href: "https://github.com/",
    external: true,
  },
  {
    label: "YouTube",
    description: "Watch my content",
    cta: "Open YouTube",
    href: "https://www.youtube.com/",
    external: true,
  },
] as const;
