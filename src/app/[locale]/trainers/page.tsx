import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { trainers } from "@/data/trainers";
import { PageHero } from "@/components/ui/PageHero";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.trainers");
}

export default async function TrainersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.trainers");
  const tBrand = await getTranslations("brand");
  const tTrainers = await getTranslations("content.trainers");

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, i) => {
            const specialties = tTrainers.raw(
              `${trainer.slug}.specialties`,
            ) as string[];
            return (
              <Link
                key={trainer.id}
                href={`/trainers/${trainer.slug}`}
                className="card-forge group block min-w-0"
                data-aos="fade-up"
                data-aos-delay={i * 70}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    quality={95}
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 -mt-16 relative z-10">
                  <h2 className="font-display text-3xl group-hover:text-accent transition-colors">
                    {trainer.name}
                  </h2>
                  <p className="text-sm uppercase tracking-wider text-accent">
                    {tTrainers(`${trainer.slug}.title`)}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {specialties.join(" · ")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
