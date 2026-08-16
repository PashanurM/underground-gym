import { getTranslations } from "next-intl/server";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brandVars } from "@/lib/i18nBrand";

export async function Testimonials() {
  const t = await getTranslations("home");
  const tBrand = await getTranslations("brand");
  const tTestimonials = await getTranslations("content.testimonials");
  const brand = brandVars(tBrand);

  return (
    <section className="section-pad border-y border-border bg-bg-elevated/40">
      <div className="container-forge">
        <SectionHeading
          title={t("testimonialsTitle")}
          subtitle={t("testimonialsSub", brand)}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <blockquote
              key={item.id}
              className="card-glass p-7 md:p-8"
              data-aos="fade-up"
              data-aos-delay={i * 70}
            >
              <p className="text-accent text-sm tracking-[0.2em]">
                {"★".repeat(item.rating)}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text/95">
                “{tTestimonials(`${item.id}.quote`, brand)}”
              </p>
              <footer className="mt-6">
                <cite className="not-italic font-display text-2xl tracking-wide">
                  {item.name}
                </cite>
                <p className="text-sm text-muted mt-1">
                  {tTestimonials(`${item.id}.role`, brand)}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
