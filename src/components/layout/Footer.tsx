"use client";

import { useTranslations } from "next-intl";
import { brand, footerLinkKeys } from "@/lib/brand";
import { siteConfig } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/cn";

export function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const tb = useTranslations("brand");
  const brandName = tb("name");
  const footerLogoBg = Boolean(siteConfig.layout?.footerLogoBg);

  return (
    <footer
      className={cn(
        "border-t",
        footerLogoBg ? "footer-logo-bg" : "border-border bg-bg-elevated",
      )}
    >
      <div className="section-pad container-forge grid gap-12 md:grid-cols-3">
        <div data-aos="fade-up">
          <p className="font-display text-5xl">
            {brandName}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-4 max-w-sm text-muted">{tb("tagline")}</p>
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="80">
          <p className="label-forge">{tf("explore")}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {footerLinkKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="140">
          <p className="label-forge">{tf("visit")}</p>
          <p className="mt-3 text-muted">
            {brand.address}
            <br />
            {brand.city}
          </p>
          <p className="mt-3 text-muted">{brand.phone}</p>
          <p className="text-muted">{brand.email}</p>
          <div className="mt-6 flex gap-4 text-sm uppercase tracking-wider">
            <Link href="/pages/privacy" className="text-muted hover:text-accent">
              {tf("privacy")}
            </Link>
            <Link href="/pages/terms" className="text-muted hover:text-accent">
              {tf("terms")}
            </Link>
          </div>
        </div>
      </div>
      <div className="divider-glow" />
      <p
        className="px-[clamp(1.25rem,4vw,4rem)] py-6 text-center text-sm text-muted"
        data-aos="fade-up"
      >
        {tf("rights", {
          year: new Date().getFullYear(),
          name: brandName,
          shortName: tb("shortName"),
        })}
      </p>
    </footer>
  );
}
