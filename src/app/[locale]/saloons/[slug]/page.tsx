import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSaloonBySlug, saloons } from "@/data/saloons";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return saloons.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const saloon = getSaloonBySlug(slug);
  if (!saloon) return { title: "Hall" };
  const tHalls = await getTranslations("content.halls");
  return { title: tHalls(`${saloon.slug}.name`) };
}

export default async function SaloonDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const saloon = getSaloonBySlug(slug);
  if (!saloon) notFound();

  const tc = await getTranslations("common");
  const tHalls = await getTranslations("content.halls");
  const name = tHalls(`${saloon.slug}.name`);
  const features = tHalls.raw(`${saloon.slug}.features`) as string[];

  return (
    <section className="section-pad pt-28">
      <div className="container-forge">
        <div
          className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden mb-10 card-media"
          data-aos="zoom-out"
          data-aos-duration="1000"
        >
          <Image
            src={saloon.image}
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
          <p
            className="lg:col-span-2 text-lg text-muted leading-relaxed"
            data-aos="fade-right"
          >
            {tHalls(`${saloon.slug}.description`)}
          </p>
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
            <p
              className="mt-6 text-sm text-accent uppercase tracking-wider"
              data-aos="fade-up"
              data-aos-delay="280"
            >
              {tc("capacity", { count: saloon.capacity })}
            </p>
            <div className="mt-8" data-aos="fade-up" data-aos-delay="320">
              <Button href="/pricing">{tc("getAccess")}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
