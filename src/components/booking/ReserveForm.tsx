"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { Trainer } from "@/lib/types";
import { getAvailabilityForDate, upcomingDates } from "@/data/availability";
import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/context/BookingContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function ReserveForm({ trainer }: { trainer: Trainer }) {
  const t = useTranslations("booking");
  const tc = useTranslations("common");
  const tSessions = useTranslations("content.sessionTypes");
  const { user, ready } = useAuth();
  const { createBooking } = useBookings();
  const router = useRouter();
  const dates = useMemo(() => upcomingDates(14), []);
  const [sessionTypeId, setSessionTypeId] = useState(trainer.sessionTypes[0]?.id);
  const [date, setDate] = useState(dates[0] ?? "");
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);

  const slots = useMemo(
    () => (date ? getAvailabilityForDate(date) : []),
    [date],
  );

  const session = trainer.sessionTypes.find((s) => s.id === sessionTypeId);

  if (!ready) {
    return <p className="text-muted">{tc("loading")}</p>;
  }

  if (!user) {
    return (
      <div className="card-glass p-6 space-y-4" data-aos="fade-up">
        <p className="text-muted">{t("signInPrompt", { name: trainer.name })}</p>
        <Button href={`/login?next=/reserve/${trainer.slug}`}>
          {t("signInToBook")}
        </Button>
      </div>
    );
  }

  function confirm() {
    if (!session || !date || !time || !user) return;
    createBooking({
      userId: user.id,
      userName: user.name,
      trainerSlug: trainer.slug,
      trainerName: trainer.name,
      sessionTypeId: session.id,
      sessionTypeName: tSessions(session.id),
      date,
      time,
    });
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 1200);
  }

  if (done) {
    return (
      <div className="card-glass border-accent p-6" data-aos="zoom-in">
        <p className="font-display text-3xl text-accent">{t("booked")}</p>
        <p className="mt-2 text-muted">{t("redirecting")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div data-aos="fade-up">
        <p className="label-forge">{t("step1")}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {trainer.sessionTypes.map((st, i) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSessionTypeId(st.id)}
              data-aos="fade-up"
              data-aos-delay={i * 70}
              className={cn(
                "card-glass p-4 text-left transition-all",
                sessionTypeId === st.id
                  ? "border-accent bg-accent/10"
                  : "hover:border-muted",
              )}
            >
              <p className="font-medium">{tSessions(st.id)}</p>
              <p className="text-sm text-muted">
                {st.durationMin} {tc("min")}
              </p>
              <p className="mt-2 text-accent font-display text-2xl">${st.price}</p>
            </button>
          ))}
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="80">
        <p className="label-forge">{t("step2")}</p>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {dates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                setDate(d);
                setTime("");
              }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-3 text-sm uppercase tracking-wider transition-colors",
                date === d
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border text-muted hover:text-text",
              )}
            >
              {new Date(d + "T12:00:00").toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </button>
          ))}
        </div>
      </div>

      <div data-aos="fade-up" data-aos-delay="140">
        <p className="label-forge">{t("step3")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {slots.map((slot) => (
            <button
              key={slot.time}
              type="button"
              disabled={!slot.available}
              onClick={() => setTime(slot.time)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                !slot.available && "opacity-30 cursor-not-allowed",
                slot.available &&
                  time === slot.time &&
                  "border-accent text-accent bg-accent/10",
                slot.available &&
                  time !== slot.time &&
                  "border-border text-muted hover:text-text",
              )}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      <div
        className="card-glass p-5 flex flex-wrap items-center justify-between gap-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div>
          <p className="font-display text-2xl">
            {session ? tSessions(session.id) : ""} · {date} {time}
          </p>
          <p className="text-muted text-sm">{t("pending")}</p>
        </div>
        <Button onClick={confirm} disabled={!session || !date || !time}>
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
}
