import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const tBrand = await getTranslations("brand");

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge grid gap-12 lg:grid-cols-2">
          <div data-aos="fade-right" data-aos-duration="900">
            <ContactForm />
          </div>
          <div data-aos="fade-left" data-aos-duration="900" data-aos-delay="80">
            <p className="label-forge">{t("visit")}</p>
            <p className="mt-3 text-2xl font-display tracking-wide">
              {brand.address}
              <br />
              {brand.city}
            </p>
            <p className="mt-6 text-muted" data-aos="fade-up" data-aos-delay="120">
              {brand.phone}
            </p>
            <p className="text-muted" data-aos="fade-up" data-aos-delay="160">
              {brand.email}
            </p>
            <div
              className="mt-10 aspect-[16/10] card-media bg-surface flex items-center justify-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <p className="text-muted text-sm uppercase tracking-wider">
                {t("mapPlaceholder", { city: brand.city })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
