import { redirect } from "next/navigation";
import { saloons } from "@/data/saloons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return saloons.map((s) => ({ slug: s.slug }));
}

export default async function SaloonDetailPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/en/saloons/${slug}`);
}
