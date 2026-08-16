"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { brand, mainNav, type NavItem } from "@/lib/brand";
import { isPageEnabled, siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useAuth } from "@/context/AuthContext";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const tb = useTranslations("brand");
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    setOpen(false);
    router.replace("/login");
  }
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gymOpen, setGymOpen] = useState(false);
  const [mobileGymOpen, setMobileGymOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setGymOpen(false);
    setMobileGymOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const headerLogoBg = Boolean(siteConfig.layout?.headerLogoBg);
  const transparent = !headerLogoBg && !scrolled && !open;

  const navLinkClass = (active: boolean) =>
    cn(
      "px-3 py-2 text-sm uppercase tracking-[0.14em] rounded-full transition-colors",
      headerLogoBg
        ? active
          ? "text-accent font-bold"
          : "font-semibold hover:text-accent text-[var(--chrome-fg)]"
        : transparent
          ? active
            ? "text-accent font-bold"
            : "text-white font-semibold hover:text-accent"
          : active
            ? "text-accent font-bold"
            : "text-muted font-semibold hover:text-white",
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-300",
          headerLogoBg && "header-logo-bg",
          !headerLogoBg && (scrolled || open)
            ? "bg-bg/85 backdrop-blur-xl border-b border-border"
            : !headerLogoBg && "bg-transparent",
          open && !headerLogoBg && "bg-transparent border-transparent backdrop-blur-none",
        )}
      >
        <div className="flex items-center gap-3 px-[clamp(1.25rem,4vw,4rem)] py-3.5">
          <Link
            href="/"
            className={cn(
              "shrink-0 font-display text-3xl tracking-wide transition-colors",
              headerLogoBg
                ? "text-[var(--chrome-fg)]"
                : transparent
                  ? "text-white"
                  : "text-text",
            )}
          >
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                width={480}
                height={128}
                className="h-16 w-auto max-w-[280px] object-contain object-left"
              />
            ) : (
              <>
                {brand.shortName}
                <span className="text-accent">.</span>
              </>
            )}
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            {mainNav.map((item: NavItem) => {
              if (item.children) {
                const childActive = item.children.some((c) => isActive(c.href));
                return (
                  <div
                    key={item.labelKey}
                    className="relative"
                    onMouseEnter={() => setGymOpen(true)}
                    onMouseLeave={() => setGymOpen(false)}
                  >
                    <button
                      type="button"
                      className={navLinkClass(childActive || gymOpen)}
                      aria-expanded={gymOpen}
                    >
                      {t(item.labelKey)}
                      <span className="ml-1 inline-block text-[0.65rem] opacity-80">
                        ▾
                      </span>
                    </button>
                    <div
                      className={cn(
                        "absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-300",
                        gymOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none",
                      )}
                    >
                      <div className="min-w-48 rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-2 shadow-2xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block rounded-xl px-4 py-2.5 text-sm uppercase tracking-wider font-semibold transition-all duration-300",
                              isActive(child.href)
                                ? "text-accent bg-accent/10"
                                : "text-white/80 hover:text-accent hover:bg-white/5 hover:translate-x-1",
                            )}
                          >
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(isActive(item.href))}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0 ml-auto lg:ml-0">
            <LanguageSwitcher
              className="hidden lg:inline-flex"
              light={transparent}
            />
            {isPageEnabled("auth") &&
              (user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hidden lg:inline text-sm uppercase tracking-wider px-3 font-semibold text-accent"
                  >
                    {t("dashboard")}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={cn(
                      "hidden lg:inline text-sm uppercase tracking-wider px-3 font-semibold transition-colors",
                      headerLogoBg
                        ? "text-[var(--chrome-fg)] hover:text-accent"
                        : transparent
                          ? "text-white hover:text-accent"
                          : "text-muted hover:text-white",
                    )}
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="btn-primary !py-2.5 !px-5 text-xs hidden lg:inline-flex"
                >
                  {t("join")}
                </Link>
              ))}
            <button
              type="button"
              className={cn("hamburger", open && "is-open")}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
            >
              <span className="hamburger-lines">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn("mobile-drawer", open && "is-open")}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="mobile-drawer-backdrop"
          aria-label={t("closeMenu")}
          onClick={() => setOpen(false)}
        />
        <div className="mobile-drawer-panel">
          <div className="mb-8">
            <LanguageSwitcher variant="pills" />
          </div>
          <div className="flex flex-col gap-1">
            {mainNav.map((item: NavItem) => {
              if (item.children) {
                return (
                  <div key={item.labelKey}>
                    <button
                      type="button"
                      className="mobile-nav-link w-full text-left flex items-center justify-between"
                      onClick={() => setMobileGymOpen((v) => !v)}
                    >
                      {t(item.labelKey)}
                      <span
                        className={cn(
                          "text-accent text-lg transition-transform duration-300",
                          mobileGymOpen && "rotate-45",
                        )}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows,opacity,margin] duration-400 ease-out",
                        mobileGymOpen
                          ? "grid-rows-[1fr] opacity-100 mt-1 mb-3"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden space-y-1 pl-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="mobile-nav-sub"
                            onClick={() => setOpen(false)}
                          >
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mobile-nav-link",
                    isActive(item.href) && "text-accent",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}

            {isPageEnabled("auth") && (
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="mobile-nav-link text-accent"
                      onClick={() => setOpen(false)}
                    >
                      {t("dashboard")}
                    </Link>
                    <button
                      type="button"
                      className="mobile-nav-link text-left text-muted"
                      onClick={handleLogout}
                    >
                      {t("logout")}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="btn-primary w-full"
                    onClick={() => setOpen(false)}
                  >
                    {t("joinForge", {
                      name: tb("name"),
                      shortName: tb("shortName"),
                    })}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
