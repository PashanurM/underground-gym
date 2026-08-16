import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { equipment } from "@/data/equipment";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.equipment");
}

export default async function EquipmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.equipment");
  const tBrand = await getTranslations("brand");
  const tc = await getTranslations("common");
  const tEquipment = await getTranslations("content.equipment");

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item, i) => {
            const name = tEquipment(`${item.slug}.name`);
            return (
              <article
                key={item.id}
                className="card-forge group min-w-0"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={name}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    {tEquipment(`${item.slug}.category`)} ·{" "}
                    {tEquipment(`${item.slug}.hall`)}
                  </p>
                  <h2 className="mt-2 font-display text-3xl">{name}</h2>
                  <p className="mt-3 text-muted">
                    {tEquipment(`${item.slug}.description`)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div
          className="container-forge mt-12 flex flex-wrap gap-3"
          data-aos="fade-up"
        >
          <Button href="/saloons">{tc("seeHalls")}</Button>
          <Button href="/tools" variant="ghost">
            {tc("trainingTools")}
          </Button>
        </div>
      </section>
    </>
  );
}
