export const locales = ["en", "fr", "de", "es", "it"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
