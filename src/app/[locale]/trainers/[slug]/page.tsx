import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getTrainerBySlug, trainers } from "@/data/trainers";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return trainers.map((trainer) => ({ slug: trainer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainerBySlug(slug);
  return { title: trainer?.name ?? "Trainer" };
}

export default async function TrainerDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const trainer = getTrainerBySlug(slug);
  if (!trainer) notFound();

  const tc = await getTranslations("common");
  const tTrainers = await getTranslations("content.trainers");
  const tSessions = await getTranslations("content.sessionTypes");
  const specialties = tTrainers.raw(`${trainer.slug}.specialties`) as string[];

  return (
    <section className="section-pad pt-28">
      <div className="container-forge grid gap-12 lg:grid-cols-2 items-start">
        <div
          className="relative aspect-[3/4] overflow-hidden card-media"
          data-aos="fade-right"
          data-aos-duration="900"
        >
          <Image
            src={trainer.image}
            alt={trainer.name}
            fill
            quality={95}
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p
            className="text-accent uppercase tracking-[0.2em] text-sm"
            data-aos="fade-left"
          >
            {tTrainers(`${trainer.slug}.title`)}
          </p>
          <h1
            className="mt-2 font-display text-6xl md:text-7xl leading-none"
            data-aos="fade-left"
            data-aos-delay="80"
          >
            {trainer.name}
          </h1>
          <p
            className="mt-4 text-muted"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {trainer.experienceYears} {tc("years")} · ★ {trainer.rating}
          </p>
          <p
            className="mt-6 text-lg text-muted leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            {tTrainers(`${trainer.slug}.bio`)}
          </p>
          <div
            className="mt-6 flex flex-wrap gap-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-10 space-y-3">
            <p className="label-forge" data-aos="fade-up" data-aos-delay="220">
              {tc("sessionTypes")}
            </p>
            {trainer.sessionTypes.map((st, i) => (
              <div
                key={st.id}
                className="flex items-center justify-between border-b border-border py-3"
                data-aos="fade-up"
                data-aos-delay={240 + i * 60}
              >
                <div>
                  <p className="font-medium">{tSessions(st.id)}</p>
                  <p className="text-sm text-muted">
                    {st.durationMin} {tc("min")}
                  </p>
                </div>
                <p className="text-accent font-display text-2xl">${st.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-10" data-aos="fade-up" data-aos-delay="400">
            <Button href={`/reserve/${trainer.slug}`}>{tc("bookSession")}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
