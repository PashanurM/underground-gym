import { redirect } from "next/navigation";
import { trainers } from "@/data/trainers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return trainers.map((t) => ({ slug: t.slug }));
}

export default async function TrainerDetailPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/en/trainers/${slug}`);
}
