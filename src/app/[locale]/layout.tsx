import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { locales, type Locale } from "@/i18n/routing";
import { brandVars } from "@/lib/i18nBrand";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");
  const tBrand = await getTranslations("brand");
  const { name, shortName } = brandVars(tBrand);
  return {
    title: {
      default: t("titleDefault", { name, shortName }),
      template: `%s | ${name}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlLang />
      <AppProviders>
        <Navbar />
        <main className="flex-1 min-w-0 max-w-full overflow-x-clip">{children}</main>
        <Footer />
        <ScrollToTop />
      </AppProviders>
    </NextIntlClientProvider>
  );
}
