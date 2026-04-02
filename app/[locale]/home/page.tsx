import { notFound } from "next/navigation";
import { hasLocale } from "@/src/i18n/config";

export default async function HomePage(props: PageProps<"/[locale]/home">) {
  const { locale } = await props.params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Home
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Building meaningful digital products with clarity and momentum.
      </h1>
      <p className="max-w-2xl text-lg text-zinc-700">
        This is the first draft of your localized homepage for{" "}
        <span className="font-semibold">{locale.toUpperCase()}</span>.
      </p>
    </section>
  );
}
