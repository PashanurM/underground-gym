import { redirect } from "next/navigation";
import { trainers } from "@/data/trainers";

type Props = { params: Promise<{ trainerSlug: string }> };

export function generateStaticParams() {
  return trainers.map((t) => ({ trainerSlug: t.slug }));
}

export default async function ReservePage({ params }: Props) {
  const { trainerSlug } = await params;
  redirect(`/en/reserve/${trainerSlug}`);
}
