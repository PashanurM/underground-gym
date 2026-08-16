import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTrainerBySlug, trainers } from "@/data/trainers";
import { ShareTrainerGate } from "@/components/share/ShareTrainerGate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return trainers.map((trainer) => ({ slug: trainer.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainerBySlug(slug);
  return { title: trainer ? `${trainer.name} · Book` : "Trainer" };
}

export default async function ShareTrainerPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const trainer = getTrainerBySlug(slug);
  if (!trainer) notFound();

  return <ShareTrainerGate trainer={trainer} />;
}
