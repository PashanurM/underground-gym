import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.dashboard");
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Dashboard />;
}
