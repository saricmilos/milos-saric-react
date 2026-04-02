import { notFound } from "next/navigation";
import { hasLocale } from "@/src/i18n/config";

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        About
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        About Milos
      </h1>
      <p className="max-w-2xl text-lg text-zinc-700">
        We can now add your story, mission, and credibility content for the{" "}
        <span className="font-semibold">{locale.toUpperCase()}</span> audience.
      </p>
    </section>
  );
}
