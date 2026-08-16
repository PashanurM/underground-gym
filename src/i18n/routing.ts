import { defineRouting } from "next-intl/routing";

export const locales = ["en", "az", "tr", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  az: "AZ",
  tr: "TR",
  ru: "RU",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});
