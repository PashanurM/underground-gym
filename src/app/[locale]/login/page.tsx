import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { LoginForm } from "@/components/auth/LoginForm";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.login");
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.login");
  const tBrand = await getTranslations("brand");
  const tc = await getTranslations("common");

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge" data-aos="fade-up">
          <Suspense fallback={<p className="text-muted">{tc("loading")}</p>}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
