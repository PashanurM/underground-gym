import { redirect } from "next/navigation";
import { branches } from "@/data/branches";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export default async function BranchDetailPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/en/branches/${slug}`);
}
