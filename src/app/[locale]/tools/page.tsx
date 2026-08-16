import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Calculators } from "@/components/tools/Calculators";
import { extraTools } from "@/data/tools";
import { Button } from "@/components/ui/Button";
import { pageMeta } from "@/lib/i18nBrand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "pages.tools");
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.tools");
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
        <div className="container-forge space-y-10">
          <Calculators />
          {extraTools.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {extraTools.map((tool) => (
                <div key={tool.id} className="card-glass p-6 md:p-8">
                  <h2 className="font-display text-3xl">{tool.name}</h2>
                  <p className="text-muted mt-2">{tool.description}</p>
                </div>
              ))}
            </div>
          )}
          <div
            className="card-glass p-6 md:p-8 flex flex-wrap items-center justify-between gap-4"
            data-aos="fade-up"
          >
            <div>
              <h2 className="font-display text-3xl">{t("needMachines")}</h2>
              <p className="text-muted mt-1">{t("needMachinesSub")}</p>
            </div>
            <Button href="/equipment">{tc("viewEquipment")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
