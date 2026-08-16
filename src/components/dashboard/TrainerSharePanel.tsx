"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { useTrainerShare } from "@/context/TrainerShareContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function TrainerSharePanel({ trainerSlug }: { trainerSlug: string }) {
  const t = useTranslations("share");
  const locale = useLocale();
  const { ready, isShareActive, setShareActive } = useTrainerShare();
  const active = isShareActive(trainerSlug);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const sharePath = `/${locale}/t/${trainerSlug}`;
  const shareUrl = useMemo(
    () => (origin ? `${origin}${sharePath}` : sharePath),
    [origin, sharePath],
  );

  if (!ready) return null;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="card-glass p-6 md:p-8 border-accent/30" data-aos="fade-up">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {t("badge")}
          </p>
          <h2 className="mt-2 font-display text-4xl">{t("title")}</h2>
          <p className="mt-2 max-w-xl text-muted">{t("subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setShareActive(trainerSlug, !active)}
          className={cn(
            "rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors",
            active
              ? "bg-accent text-bg"
              : "border border-border text-muted hover:border-accent hover:text-accent",
          )}
        >
          {active ? t("deactivate") : t("activate")}
        </button>
      </div>

      {active ? (
        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] items-center">
          <div className="rounded-2xl bg-white p-4 w-fit mx-auto md:mx-0">
            <QRCodeSVG value={shareUrl} size={168} level="M" includeMargin />
          </div>
          <div className="space-y-4">
            <div>
              <p className="label-forge">{t("shareLink")}</p>
              <p className="mt-1 break-all text-sm text-accent">{shareUrl}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={copyLink} type="button">
                {copied ? t("copied") : t("copyLink")}
              </Button>
              <Button href={`/t/${trainerSlug}`} variant="ghost">
                {t("preview")}
              </Button>
            </div>
            <p className="text-sm text-muted">{t("socialHint")}</p>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted border border-border rounded-2xl p-4">
          {t("inactiveHint")}
        </p>
      )}
    </div>
  );
}
