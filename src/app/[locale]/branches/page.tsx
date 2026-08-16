import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { branches } from "@/data/branches";
import { getTrainersByBranch } from "@/data/trainers";
import { PageHero } from "@/components/ui/PageHero";
import { brandVars, pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.branches");
}

export default async function BranchesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.branches");
  const tBrand = await getTranslations("brand");
  const tc = await getTranslations("common");
  const tBranches = await getTranslations("content.branches");
  const brand = brandVars(tBrand);

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle", brand)}
      />
      <section className="section-pad pt-0">
        <div className="container-forge grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch, i) => {
            const trainerCount = getTrainersByBranch(branch.slug).length;
            return (
              <Link
                key={branch.id}
                href={`/branches/${branch.slug}`}
                className="card-forge group block min-w-0"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={branch.image}
                    alt={tBranches(`${branch.slug}.name`, brand)}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-4xl group-hover:text-accent transition-colors">
                    {tBranches(`${branch.slug}.name`, brand)}
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-wider text-accent">
                    {tBranches(`${branch.slug}.city`)}
                  </p>
                  <p className="mt-2 text-muted">
                    {tBranches(`${branch.slug}.description`)}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {tBranches(`${branch.slug}.address`)}
                  </p>
                  <p className="mt-3 text-sm text-accent uppercase tracking-wider">
                    {tc("trainersCount", { count: trainerCount })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
