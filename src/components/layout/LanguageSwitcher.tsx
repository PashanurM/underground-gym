"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({
  className,
  light = false,
  variant = "dropdown",
}: {
  className?: string;
  light?: boolean;
  variant?: "dropdown" | "pills";
}) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function selectLocale(code: Locale) {
    setOpen(false);
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  }

  if (variant === "pills") {
    return (
      <div
        className={cn("flex flex-wrap gap-2", className)}
        role="listbox"
        aria-label={t("language")}
      >
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            role="option"
            aria-selected={locale === code}
            disabled={pending}
            onClick={() => selectLocale(code)}
            className={cn(
              "min-w-[3.25rem] rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors",
              locale === code
                ? "border-accent bg-accent/15 text-accent"
                : "border-border text-muted hover:border-accent hover:text-accent",
            )}
          >
            {localeLabels[code]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative inline-flex w-fit", className)}>
      <button
        type="button"
        disabled={pending}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
          light
            ? "border-white/30 text-white hover:border-accent hover:text-accent"
            : "border-border text-muted hover:border-accent hover:text-accent",
          open && "border-accent text-accent",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
      >
        {localeLabels[locale]}
        <span className={cn("text-[0.65rem] transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-2 min-w-[8.5rem] rounded-2xl border border-border bg-surface/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-200",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0 pointer-events-none",
        )}
        role="listbox"
      >
        <div className="flex flex-col gap-1">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={locale === code}
              disabled={pending}
              onClick={() => selectLocale(code)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-bold tracking-wider transition-colors",
                locale === code
                  ? "bg-accent/15 text-accent"
                  : "text-white/80 hover:bg-white/10 hover:text-accent",
              )}
            >
              {localeLabels[code]}
              {locale === code ? <span aria-hidden>✓</span> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
