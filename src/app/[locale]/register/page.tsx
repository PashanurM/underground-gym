import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.register");
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.register");
  const tBrand = await getTranslations("brand");

  return (
    <>
      <PageHero
        eyebrow={tBrand("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="section-pad pt-0">
        <div className="container-forge" data-aos="fade-up">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
