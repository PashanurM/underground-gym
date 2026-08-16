import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { blogPosts } from "@/data/blog";
import { PageHero } from "@/components/ui/PageHero";
import { brandVars, pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.blog");
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.blog");
  const tBrand = await getTranslations("brand");
  const tBlog = await getTranslations("content.blog");
  const brand = brandVars(tBrand);

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle", brand)}
      />
      <section className="section-pad pt-0">
        <div className="container-forge grid gap-6 md:grid-cols-3">
          {blogPosts.map((post, i) => {
            const title = tBlog(`${post.slug}.title`);
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-forge group block min-w-0"
                data-aos="fade-up"
                data-aos-delay={i * 70}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={title}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {post.date} · {post.author}
                  </p>
                  <h2 className="mt-2 font-display text-3xl group-hover:text-accent transition-colors">
                    {title}
                  </h2>
                  <p className="mt-2 text-muted">{tBlog(`${post.slug}.excerpt`)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
