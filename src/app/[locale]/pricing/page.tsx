import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { priceList } from "@/data/priceList";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { PriceBoard } from "@/components/pricing/PriceBoard";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.pricing");
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.pricing");
  const tBrand = await getTranslations("brand");
  const tList = await getTranslations("content.priceList");
  const tc = await getTranslations("common");

  const items = priceList.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: tList.has(`${item.slug}.name`) ? tList(`${item.slug}.name`) : item.name,
    price: money(item.price),
    image: item.image,
    description: tList.has(`${item.slug}.description`)
      ? tList(`${item.slug}.description`)
      : item.description,
    details: tList.has(`${item.slug}.details`)
      ? tList(`${item.slug}.details`)
      : item.details,
  }));

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <PriceBoard
        items={items}
        moreLabel={t("moreInfo")}
        closeLabel={t("close")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg text-muted">{t("subtitle")}</p>
          <Button href="/contact">{tc("askAboutThis")}</Button>
        </div>
      </section>
    </>
  );
}
