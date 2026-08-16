import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("pages.notFound");
  const tc = await getTranslations("common");

  return (
    <section className="section-pad pt-32">
      <div className="container-forge text-center">
        <p className="font-display text-8xl text-accent" data-aos="zoom-in">
          404
        </p>
        <h1
          className="mt-4 font-display text-5xl"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          {t("title")}
        </h1>
        <p
          className="mt-3 text-muted"
          data-aos="fade-up"
          data-aos-delay="140"
        >
          {t("body")}
        </p>
        <div
          className="mt-8 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Button href="/">{tc("backHome")}</Button>
        </div>
      </div>
    </section>
  );
}
