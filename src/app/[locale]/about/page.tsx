import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandVars, pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tBrand = await getTranslations("brand");
  const tc = await getTranslations("common");
  const brand = brandVars(tBrand);

  const values = [
    { title: t("values.v1Title"), body: t("values.v1Body") },
    { title: t("values.v2Title"), body: t("values.v2Body") },
    { title: t("values.v3Title"), body: t("values.v3Body") },
  ];

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title", brand)}
        subtitle={t("subtitle")}
      />
      <section className="section-pad">
        <div className="container-forge grid gap-12 lg:grid-cols-2 items-center">
          <div data-aos="fade-right" data-aos-duration="900">
            <p className="font-display text-5xl md:text-6xl leading-none">
              {t("lead")}
            </p>
            <p
              className="mt-6 text-muted text-lg leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="120"
            >
              {t("body", brand)}
            </p>
          </div>
          <div
            className="relative aspect-[4/5] overflow-hidden card-media"
            data-aos="fade-left"
            data-aos-duration="900"
          >
            <Image
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1000&q=80"
              alt={tc("facilityAlt", brand)}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <section className="section-pad border-t border-border bg-bg-elevated/40">
        <div className="container-forge">
          <SectionHeading title={t("valuesTitle")} subtitle={t("valuesSub")} />
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="card-glass p-6"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <p className="text-accent font-display text-4xl">0{i + 1}</p>
                <h2 className="mt-3 font-display text-3xl">{v.title}</h2>
                <p className="mt-3 text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
