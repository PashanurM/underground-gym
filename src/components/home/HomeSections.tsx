import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { trainers } from "@/data/trainers";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog";
import { isPageEnabled } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PinnedHalls } from "@/components/home/PinnedHalls";
import { Testimonials } from "@/components/home/Testimonials";
import { brandVars } from "@/lib/i18nBrand";

export async function HomeSections() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tBrand = await getTranslations("brand");
  const tTrainers = await getTranslations("content.trainers");
  const tServices = await getTranslations("content.services");
  const tBlog = await getTranslations("content.blog");
  const brand = brandVars(tBrand);

  return (
    <>
      <section className="section-pad">
        <div className="container-forge">
          <SectionHeading title={t("coachesTitle")} subtitle={t("coachesSub")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((trainer, i) => {
              const card = (
                <>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      quality={95}
                      priority={i === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 p-5">
                      <p className="font-display text-3xl">{trainer.name}</p>
                      <p className="text-sm text-accent uppercase tracking-wider">
                        {tTrainers(`${trainer.slug}.title`)}
                      </p>
                    </div>
                  </div>
                </>
              );
              const className = "card-forge group block min-w-0";
              return isPageEnabled("trainers") ? (
                <Link
                  key={trainer.id}
                  href={`/trainers/${trainer.slug}`}
                  className={className}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={trainer.id}
                  className={className}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  {card}
                </div>
              );
            })}
          </div>
          {isPageEnabled("trainers") ? (
            <div className="mt-10" data-aos="fade-up">
              <Button href="/trainers" variant="ghost">
                {tc("allTrainers")}
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <PinnedHalls />

      <div className="home-after-pins">
        <section className="section-pad">
          <div className="container-forge">
            <SectionHeading title={t("programsTitle")} subtitle={t("programsSub")} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((service, i) => {
                const inner = (
                  <>
                    <p className="text-xs uppercase tracking-[0.2em] text-accent">
                      {tServices(`${service.slug}.category`)}
                    </p>
                    <h3 className="mt-3 font-display text-3xl group-hover:text-accent transition-colors">
                      {tServices(`${service.slug}.name`, brand)}
                    </h3>
                    <p className="mt-3 text-muted">
                      {tServices(`${service.slug}.description`)}
                    </p>
                  </>
                );
                const className = "card-glass p-7 md:p-8 group relative z-10";
                return isPageEnabled("services") ? (
                  <Link
                    key={service.id}
                    href="/services"
                    className={className}
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={service.id}
                    className={className}
                    data-aos="fade-up"
                    data-aos-delay={i * 50}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="relative overflow-hidden section-pad">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
              alt={tc("gymFloorAlt")}
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/40" />
          </div>
          <div className="container-forge relative z-10">
            <h2
              className="font-display text-6xl md:text-8xl max-w-xl leading-none"
              data-aos="fade-right"
            >
              {t("pricingTitle")}
            </h2>
            <p
              className="mt-4 max-w-md text-muted text-lg"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("pricingSub")}
            </p>
            {isPageEnabled("pricing") ? (
              <div className="mt-8" data-aos="fade-up" data-aos-delay="180">
                <Button href="/pricing">{tc("viewPricing")}</Button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section-pad">
          <div className="container-forge">
            <SectionHeading title={t("blogTitle")} subtitle={t("blogSub")} />
            <div className="grid gap-6 md:grid-cols-3">
              {blogPosts.map((post, i) => {
                const title = tBlog(`${post.slug}.title`);
                const inner = (
                  <>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={post.image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                        quality={90}
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-wider text-muted">
                        {post.date}
                      </p>
                      <h3 className="mt-2 font-display text-3xl group-hover:text-accent transition-colors">
                        {title}
                      </h3>
                      <p className="mt-2 text-muted">{tBlog(`${post.slug}.excerpt`)}</p>
                    </div>
                  </>
                );
                const className = "card-forge group block relative z-10";
                return isPageEnabled("blog") ? (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className={className}
                    data-aos="fade-up"
                    data-aos-delay={i * 70}
                  >
                    {inner}
                  </Link>
                ) : (
                  <article
                    key={post.id}
                    className={className}
                    data-aos="fade-up"
                    data-aos-delay={i * 70}
                  >
                    {inner}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
