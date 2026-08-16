import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { brandVars } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) return { title: "Blog" };
  const tBlog = await getTranslations("content.blog");
  return { title: tBlog(`${post.slug}.title`) };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const tc = await getTranslations("common");
  const tBlog = await getTranslations("content.blog");
  const tBrand = await getTranslations("brand");
  const brand = brandVars(tBrand);
  const title = tBlog(`${post.slug}.title`);
  const tagsRaw = tBlog.raw(`${post.slug}.tags`);
  const tags = Array.isArray(tagsRaw)
    ? (tagsRaw as string[])
    : String(post.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  return (
    <article className="section-pad pt-28">
      <div className="container-forge max-w-3xl">
        <Link
          href="/blog"
          className="text-sm uppercase tracking-wider text-muted hover:text-accent"
          data-aos="fade-down"
        >
          {tc("backBlog")}
        </Link>
        <h1
          className="mt-6 font-display text-5xl md:text-7xl leading-none"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          {title}
        </h1>
        <p className="mt-4 text-muted" data-aos="fade-up" data-aos-delay="120">
          {post.date} · {post.author}
        </p>
        <div
          className="relative mt-8 aspect-[16/9] overflow-hidden card-media"
          data-aos="zoom-in"
          data-aos-delay="160"
        >
          <Image
            src={post.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 800px"
            priority
          />
        </div>
        <div
          className="mt-10 space-y-5 text-lg text-muted leading-relaxed whitespace-pre-line"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {tBlog(`${post.slug}.content`, brand)}
        </div>
        <div
          className="mt-8 flex flex-wrap gap-2"
          data-aos="fade-up"
          data-aos-delay="260"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
