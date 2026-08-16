import { redirect } from "next/navigation";
import { staticPages } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return staticPages.map((p) => ({ slug: p.slug }));
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/en/pages/${slug}`);
}
