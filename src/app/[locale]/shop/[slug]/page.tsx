import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProductBySlug, products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { brandVars } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  const tProducts = await getTranslations("content.products");
  const tBrand = await getTranslations("brand");
  return { title: tProducts(`${product.slug}.name`, brandVars(tBrand)) };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const tc = await getTranslations("common");
  const t = await getTranslations("pages.shop");
  const tProducts = await getTranslations("content.products");
  const tBrand = await getTranslations("brand");
  const brand = brandVars(tBrand);
  const name = tProducts(`${product.slug}.name`, brand);
  const category = tProducts(`${product.slug}.category`);

  const related = products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const sameA = a.category === product.category ? 0 : 1;
      const sameB = b.category === product.category ? 0 : 1;
      return sameA - sameB;
    })
    .slice(0, 4)
    .map((item) => ({
      slug: item.slug,
      image: item.image,
      price: item.price,
      name: tProducts(`${item.slug}.name`, brand),
      category: tProducts(`${item.slug}.category`),
      categoryKey: item.category,
    }));

  return (
    <>
      <section className="shop-product section-pad pt-28">
        <div className="container-forge grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="shop-product-media" data-aos="fade-right" data-aos-duration="900">
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
              quality={90}
            />
          </div>
          <div>
            <nav className="shop-breadcrumb" data-aos="fade-left">
              <Link href="/shop">{t("title")}</Link>
              <span>/</span>
              <span>{category}</span>
            </nav>
            <p
              className="shop-kicker mt-5"
              data-aos="fade-left"
              data-aos-delay="60"
            >
              {category}
            </p>
            <h1
              className="mt-2 font-display text-6xl leading-none"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              {name}
            </h1>
            <p
              className="shop-price shop-price-lg mt-5"
              data-aos="fade-up"
              data-aos-delay="140"
            >
              ${product.price}
            </p>
            <p className="shop-stock" data-aos="fade-up" data-aos-delay="160">
              {t("inClub")}
            </p>
            <p
              className="mt-6 text-muted text-lg leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="180"
            >
              {tProducts(`${product.slug}.description`)}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-3"
              data-aos="fade-up"
              data-aos-delay="240"
            >
              <Button href="/contact">{tc("inquireInClub")}</Button>
              <Button href="/shop" variant="ghost">
                {tc("moreProducts")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section-pad pt-0">
          <div className="container-forge">
            <h2 className="shop-related-title" data-aos="fade-up">
              {t("related")}
            </h2>
            <div className="shop-grid">
              {related.map((item) => (
                <ShopProductCard
                  key={item.slug}
                  item={item}
                  viewLabel={t("viewProduct")}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
