import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { products } from "@/data/products";
import { PageHero } from "@/components/ui/PageHero";
import { ShopCatalog } from "@/components/shop/ShopCatalog";
import { brandVars, pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.shop");
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.shop");
  const tBrand = await getTranslations("brand");
  const tProducts = await getTranslations("content.products");
  const brand = brandVars(tBrand);

  const items = products.map((product) => ({
    slug: product.slug,
    image: product.image,
    price: product.price,
    name: tProducts(`${product.slug}.name`, brand),
    category: tProducts(`${product.slug}.category`),
    categoryKey: product.category,
  }));

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge">
          <ShopCatalog items={items} />
        </div>
      </section>
    </>
  );
}
