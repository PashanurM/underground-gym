import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTrainerBySlug, trainers } from "@/data/trainers";
import { PageHero } from "@/components/ui/PageHero";
import { ReserveForm } from "@/components/booking/ReserveForm";

type Props = { params: Promise<{ locale: string; trainerSlug: string }> };

export function generateStaticParams() {
  return trainers.map((trainer) => ({ trainerSlug: trainer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, trainerSlug } = await params;
  setRequestLocale(locale);
  const trainer = getTrainerBySlug(trainerSlug);
  if (!trainer) return { title: "Reserve" };
  const t = await getTranslations("pages.reserve");
  return { title: t("title", { name: trainer.name }) };
}

export default async function ReservePage({ params }: Props) {
  const { locale, trainerSlug } = await params;
  setRequestLocale(locale);
  const trainer = getTrainerBySlug(trainerSlug);
  if (!trainer) notFound();

  const t = await getTranslations("pages.reserve");
  const tBrand = await getTranslations("brand");

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title", { name: trainer.name })}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge max-w-3xl" data-aos="fade-up">
          <ReserveForm trainer={trainer} />
        </div>
      </section>
    </>
  );
}
