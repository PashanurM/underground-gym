import { redirect } from "next/navigation";
import { blogPosts } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/en/blog/${slug}`);
}
