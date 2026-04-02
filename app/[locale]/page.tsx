import { notFound, redirect } from "next/navigation";
import { hasLocale } from "@/src/i18n/config";

export default async function LocaleIndexPage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;

  if (!hasLocale(locale)) {
    notFound();
  }

  redirect(`/${locale}/home`);
}
