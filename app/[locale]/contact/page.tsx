import { notFound } from "next/navigation";
import { hasLocale } from "@/src/i18n/config";

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Contact
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Let&apos;s work together
      </h1>
      <p className="max-w-2xl text-lg text-zinc-700">
        Your localized contact page for{" "}
        <span className="font-semibold">{locale.toUpperCase()}</span> is now in
        place.
      </p>
    </section>
  );
}
