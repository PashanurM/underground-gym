import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export type BrandVars = { name: string; shortName: string };

export function brandVars(
  tBrand: (key: "name" | "shortName") => string,
): BrandVars {
  return { name: tBrand("name"), shortName: tBrand("shortName") };
}

export function fillBrand<T>(value: T, brand: BrandVars): T {
  if (typeof value === "string") {
    return value
      .replaceAll("{name}", brand.name)
      .replaceAll("{shortName}", brand.shortName) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => fillBrand(item, brand)) as T;
  }
  return value;
}

export async function pageMeta(
  locale: string,
  namespace: string,
): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations(namespace);
  const tBrand = await getTranslations("brand");
  return { title: t("title", brandVars(tBrand)) };
}
