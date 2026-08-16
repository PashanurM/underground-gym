import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageBySlug, staticPages } from "@/data/pages";
import { PageHero } from "@/components/ui/PageHero";
import { brandVars } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return staticPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getPageBySlug(slug);
  if (!page) return { title: "Page" };
  const tStatic = await getTranslations("content.static");
  return { title: tStatic(`${page.slug}.title`) };
}

export default async function StaticPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const tStatic = await getTranslations("content.static");
  const tBrand = await getTranslations("brand");
  const brand = brandVars(tBrand);

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={tStatic(`${page.slug}.title`)}
      />
      <section className="section-pad pt-0">
        <div
          className="container-forge max-w-3xl space-y-5 text-lg text-muted leading-relaxed whitespace-pre-line"
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="900"
        >
          {tStatic(`${page.slug}.content`, brand)}
        </div>
      </section>
    </>
  );
}
