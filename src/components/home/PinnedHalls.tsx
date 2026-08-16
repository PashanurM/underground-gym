"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { saloons } from "@/data/saloons";

gsap.registerPlugin(ScrollTrigger);

type Panel = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  href?: string;
  features?: string[];
  isIntro?: boolean;
};

/**
 * GSAP pinned panels with overscroll
 * https://demos.gsap.com/demo/pinned-panels-with-overscroll/
 */
export function PinnedHalls() {
  const rootRef = useRef<HTMLElement>(null);
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const tHalls = useTranslations("content.halls");

  const panels: Panel[] = useMemo(
    () => [
      {
        id: "intro",
        title: t("scrollFloors"),
        subtitle: tc("hallsZallar"),
        description: t("scrollFloorsSub"),
        image:
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
        isIntro: true,
      },
      ...saloons.map((hall, index) => ({
        id: hall.id,
        title: tHalls(`${hall.slug}.name`),
        subtitle: tc("hallLabel", { n: index + 1 }),
        description: tHalls(`${hall.slug}.description`),
        image: hall.image,
        href: `/saloons/${hall.slug}`,
        features: tHalls.raw(`${hall.slug}.features`) as string[],
      })),
    ],
    [t, tc, tHalls],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panelEls = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-pinned-panel]"),
    );
    if (panelEls.length < 2) return;

    const refresh = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Match the GSAP demo: each panel pins; next panel scrolls over it.
      panelEls.forEach((panel, i) => {
        // Keep pin stack below .home-after-pins (z-index: 40)
        gsap.set(panel, { zIndex: i + 1 });

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            // Last panel must not cover following sections
            if (i === panelEls.length - 1) {
              gsap.set(panel, { zIndex: 0 });
            }
          },
          onEnterBack: () => {
            gsap.set(panel, { zIndex: i + 1 });
          },
        });
      });
    }, root);

    const raf = requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 500);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="pinned-panels">
      {panels.map((panel) => (
        <div key={panel.id} data-pinned-panel className="pinned-panel">
          <div className="absolute inset-0">
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              className={
                panel.isIntro
                  ? "object-cover opacity-25"
                  : "object-cover opacity-45"
              }
              sizes="100vw"
              quality={90}
              priority={panel.isIntro}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/35" />
          </div>

          {panel.isIntro ? (
            <div className="relative z-10 px-[clamp(1.25rem,4vw,4rem)] text-center max-w-3xl mx-auto">
              {panel.subtitle ? (
                <p className="text-accent text-sm uppercase tracking-[0.25em] mb-4">
                  {panel.subtitle}
                </p>
              ) : null}
              <h2 className="font-display text-[clamp(2.75rem,9vw,7rem)] leading-none">
                {panel.title}
              </h2>
              <p className="mt-4 text-muted text-lg">{panel.description}</p>
            </div>
          ) : (
            <div className="relative z-10 w-full px-[clamp(1.25rem,4vw,4rem)]">
              <div className="container-forge grid gap-8 lg:grid-cols-2 items-end">
                <div>
                  {panel.subtitle ? (
                    <p className="text-accent text-sm uppercase tracking-[0.25em]">
                      {panel.subtitle}
                    </p>
                  ) : null}
                  <h3 className="mt-3 font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-none">
                    {panel.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-muted text-lg">
                    {panel.description}
                  </p>
                  {panel.href ? (
                    <Link
                      href={panel.href}
                      className="btn-primary mt-8 inline-flex"
                    >
                      {tc("exploreHall")}
                    </Link>
                  ) : null}
                </div>
                {panel.features?.length ? (
                  <ul className="flex flex-wrap gap-2 lg:justify-end">
                    {panel.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-text backdrop-blur-md"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
