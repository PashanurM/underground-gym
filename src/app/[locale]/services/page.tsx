import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMeta, brandVars } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const tBrand = await getTranslations("brand");
  const tc = await getTranslations("common");
  const tServices = await getTranslations("content.services");
  const brand = brandVars(tBrand);

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge space-y-8">
          {services.map((service, i) => {
            const name = tServices(`${service.slug}.name`, brand);
            return (
              <article
                key={service.id}
                className="card-forge grid gap-0 lg:grid-cols-2 items-stretch overflow-hidden"
                data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={i * 40}
                data-aos-duration="900"
              >
                <div
                  className={`relative aspect-[16/10] lg:aspect-auto min-h-[240px] ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={`p-7 md:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-accent">
                    {tServices(`${service.slug}.category`)}
                  </p>
                  <h2 className="mt-2 font-display text-5xl">{name}</h2>
                  <p className="mt-4 text-muted text-lg">
                    {tServices(`${service.slug}.description`)}
                  </p>
                  <div className="mt-6">
                    <Button href="/contact" variant="ghost">
                      {tc("askAboutThis")}
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
