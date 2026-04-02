import { notFound } from "next/navigation";
import { hasLocale } from "@/src/i18n/config";

export default async function CassiopeiaPage(
  props: PageProps<"/[locale]/cassiopeia">
) {
  const { locale } = await props.params;

  if (!hasLocale(locale)) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Cassiopeia
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Cassiopeia
      </h1>
      <p className="max-w-2xl text-lg text-zinc-700">
        This page is ready for your Cassiopeia concept, product, or offering in{" "}
        <span className="font-semibold">{locale.toUpperCase()}</span>.
      </p>
    </section>
  );
}
