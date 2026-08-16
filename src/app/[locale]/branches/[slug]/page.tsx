import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { branches, getBranchBySlug } from "@/data/branches";
import { getTrainersByBranch } from "@/data/trainers";
import { Button } from "@/components/ui/Button";
import { brandVars } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const branch = getBranchBySlug(slug);
  if (!branch) return { title: "Branch" };
  const tBranches = await getTranslations("content.branches");
  const tBrand = await getTranslations("brand");
  return { title: tBranches(`${branch.slug}.name`, brandVars(tBrand)) };
}

export default async function BranchDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const branch = getBranchBySlug(slug);
  if (!branch) notFound();

  const tc = await getTranslations("common");
  const t = await getTranslations("pages.branches");
  const tBranches = await getTranslations("content.branches");
  const tTrainers = await getTranslations("content.trainers");
  const tBrand = await getTranslations("brand");
  const brand = brandVars(tBrand);
  const name = tBranches(`${branch.slug}.name`, brand);
  const features = tBranches.raw(`${branch.slug}.features`) as string[];
  const branchTrainers = getTrainersByBranch(branch.slug);

  return (
    <section className="section-pad pt-28">
      <div className="container-forge">
        <div
          className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden mb-10 card-media"
          data-aos="zoom-out"
          data-aos-duration="1000"
        >
          <Image
            src={branch.image}
            alt={name}
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          <h1
            className="absolute bottom-6 left-4 right-4 md:left-6 md:right-auto font-display text-5xl sm:text-6xl md:text-8xl"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {name}
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4" data-aos="fade-right">
            <p className="text-lg text-muted leading-relaxed">
              {tBranches(`${branch.slug}.description`)}
            </p>
            <p className="text-muted">
              {tBranches(`${branch.slug}.address`)},{" "}
              {tBranches(`${branch.slug}.city`)}
            </p>
            <p className="text-sm uppercase tracking-wider text-accent">
              {tBranches(`${branch.slug}.phone`)}
            </p>
            <p className="text-sm text-muted">
              {tBranches(`${branch.slug}.hours`)}
            </p>
          </div>
          <div data-aos="fade-left" data-aos-delay="80">
            <p className="label-forge">{tc("features")}</p>
            <ul className="mt-3 space-y-2">
              {features.map((f, i) => (
                <li
                  key={f}
                  className="border-b border-border py-2 text-muted"
                  data-aos="fade-up"
                  data-aos-delay={100 + i * 60}
                >
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8" data-aos="fade-up" data-aos-delay="320">
              <Button href="/contact">{tc("askAboutThis")}</Button>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-forge" data-aos="fade-up">
                {t("trainersLabel")}
              </p>
              <h2
                className="mt-2 font-display text-5xl md:text-6xl"
                data-aos="fade-up"
                data-aos-delay="60"
              >
                {t("trainersTitle")}
              </h2>
              <p
                className="mt-2 max-w-xl text-muted"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("trainersSubtitle")}
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="120">
              <Button href="/trainers" variant="ghost">
                {tc("allTrainers")}
              </Button>
            </div>
          </div>

          {branchTrainers.length === 0 ? (
            <p className="text-muted" data-aos="fade-up">
              {t("noTrainers")}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {branchTrainers.map((trainer, i) => {
                const specialties = tTrainers.raw(
                  `${trainer.slug}.specialties`,
                ) as string[];
                return (
                  <Link
                    key={trainer.id}
                    href={`/trainers/${trainer.slug}`}
                    className="card-forge group block min-w-0"
                    data-aos="fade-up"
                    data-aos-delay={i * 70}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={trainer.image}
                        alt={trainer.name}
                        fill
                        quality={95}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-5 -mt-16 relative z-10">
                      <h3 className="font-display text-3xl group-hover:text-accent transition-colors">
                        {trainer.name}
                      </h3>
                      <p className="text-sm uppercase tracking-wider text-accent">
                        {tTrainers(`${trainer.slug}.title`)}
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        {specialties.join(" · ")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
