"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTrainerShare } from "@/context/TrainerShareContext";
import { Button } from "@/components/ui/Button";
import type { Trainer } from "@/lib/types";

export function ShareTrainerGate({ trainer }: { trainer: Trainer }) {
  const t = useTranslations("share");
  const tc = useTranslations("common");
  const tTrainers = useTranslations("content.trainers");
  const { ready, isShareActive } = useTrainerShare();

  if (!ready) {
    return (
      <section className="section-pad pt-28">
        <div className="container-forge">
          <p className="text-muted">{tc("loading")}</p>
        </div>
      </section>
    );
  }

  if (!isShareActive(trainer.slug)) {
    return (
      <section className="section-pad pt-28">
        <div className="container-forge max-w-xl text-center card-glass p-10" data-aos="fade-up">
          <p className="font-display text-5xl text-accent">{t("inactiveTitle")}</p>
          <p className="mt-4 text-muted">{t("inactiveBody")}</p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/trainers" variant="ghost">
              {tc("allTrainers")}
            </Button>
            <Button href="/">{tc("backHome")}</Button>
          </div>
        </div>
      </section>
    );
  }

  const specialties = tTrainers.raw(`${trainer.slug}.specialties`) as string[];

  return (
    <section className="section-pad pt-28">
      <div className="container-forge grid gap-10 lg:grid-cols-2 items-center">
        <div className="relative aspect-[3/4] max-h-[70vh] overflow-hidden card-media" data-aos="fade-right">
          <Image
            src={trainer.image}
            alt={trainer.name}
            fill
            quality={90}
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
        </div>
        <div data-aos="fade-left">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {t("publicBadge")}
          </p>
          <h1 className="mt-2 font-display text-6xl md:text-7xl leading-none">
            {trainer.name}
          </h1>
          <p className="mt-3 text-accent uppercase tracking-wider text-sm">
            {tTrainers(`${trainer.slug}.title`)}
          </p>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            {tTrainers(`${trainer.slug}.bio`)}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {specialties.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`/reserve/${trainer.slug}`}>{tc("bookSession")}</Button>
            <Button href={`/trainers/${trainer.slug}`} variant="ghost">
              {t("fullProfile")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
