"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { useBookings } from "@/context/BookingContext";
import { trainers } from "@/data/trainers";
import { saloons } from "@/data/saloons";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { TrainerSharePanel } from "@/components/dashboard/TrainerSharePanel";
import { cn } from "@/lib/cn";
import { brandVars } from "@/lib/i18nBrand";

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations("status");
  const label =
    status === "pending" ||
    status === "confirmed" ||
    status === "declined" ||
    status === "cancelled"
      ? t(status)
      : status;

  return (
    <span
      className={cn(
        "rounded-full text-xs uppercase tracking-wider px-2.5 py-1 border",
        status === "confirmed" && "border-accent text-accent",
        status === "pending" && "border-muted text-muted",
        status === "declined" && "border-danger text-danger",
        status === "cancelled" && "border-border text-muted",
      )}
    >
      {label}
    </span>
  );
}

function useLogoutToLogin() {
  const { logout } = useAuth();
  const router = useRouter();
  return () => {
    logout();
    router.replace("/login");
  };
}

export function Dashboard() {
  const t = useTranslations("dashboard");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");
  const tb = useTranslations("brand");
  const tTrainers = useTranslations("content.trainers");
  const tHalls = useTranslations("content.halls");
  const tProducts = useTranslations("content.products");
  const brand = brandVars(tb);
  const { user, ready } = useAuth();
  const { bookings, cancelBooking, updateBookingStatus } = useBookings();
  const router = useRouter();
  const handleLogout = useLogoutToLogin();

  useEffect(() => {
    if (ready && !user) {
      router.replace("/login?next=/dashboard");
    }
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <section className="section-pad pt-28">
        <div className="container-forge">
          <p className="text-muted">{tc("loading")}</p>
        </div>
      </section>
    );
  }

  const myBookings = bookings.filter((b) => b.userId === user.id);
  const trainerBookings = bookings.filter(
    (b) => b.trainerSlug === user.trainerSlug,
  );

  if (user.role === "admin") {
    return (
      <section className="section-pad pt-28">
        <div className="container-forge space-y-10">
          <header className="rounded-3xl border border-rose-400/30 bg-gradient-to-br from-rose-500/15 via-bg to-bg p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div data-aos="fade-right">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-300">
                  {t("adminBadge")}
                </p>
                <h1 className="font-display text-6xl md:text-7xl leading-none mt-2">
                  {user.name}
                </h1>
                <p className="mt-2 text-muted">{user.email}</p>
                <p className="mt-4 max-w-lg text-muted">{t("adminIntro", brand)}</p>
              </div>
              <Button onClick={handleLogout} variant="ghost">
                {tn("logout")}
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: t("trainers"), value: trainers.length },
                { label: t("saloons"), value: saloons.length },
                { label: t("products"), value: products.length },
                { label: t("allBookings"), value: bookings.length },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="font-display text-4xl text-rose-300">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <AdminBlock title={t("trainers")} count={trainers.length} delay={0}>
              {trainers.map((trainer) => (
                <li key={trainer.id} className="border-b border-border py-2 text-muted">
                  {trainer.name} · {tTrainers(`${trainer.slug}.title`)}
                </li>
              ))}
            </AdminBlock>
            <AdminBlock title={t("saloons")} count={saloons.length} delay={80}>
              {saloons.map((saloon) => (
                <li key={saloon.id} className="border-b border-border py-2 text-muted">
                  {tHalls(`${saloon.slug}.name`)} · {tc("capacity", { count: saloon.capacity })}
                </li>
              ))}
            </AdminBlock>
            <AdminBlock title={t("products")} count={products.length} delay={160}>
              {products.map((product) => (
                <li key={product.id} className="border-b border-border py-2 text-muted">
                  {tProducts(`${product.slug}.name`, brand)} · ${product.price}
                </li>
              ))}
            </AdminBlock>
            <AdminBlock title={t("allBookings")} count={bookings.length} delay={240}>
              {bookings.length === 0 ? (
                <li className="text-muted py-2">{t("noBookingsYet")}</li>
              ) : (
                bookings.map((b) => (
                  <li key={b.id} className="border-b border-border py-2 text-muted">
                    {b.userName} → {b.trainerName} · {b.date} {b.time} (
                    <StatusBadge status={b.status} />)
                  </li>
                ))
              )}
            </AdminBlock>
          </div>
        </div>
      </section>
    );
  }

  if (user.role === "trainer") {
    return (
      <section className="section-pad pt-28">
        <div className="container-forge space-y-8">
          <header className="rounded-3xl border border-accent/35 bg-gradient-to-br from-accent/15 via-bg to-bg p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div data-aos="fade-right">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  {t("trainerBadge")}
                </p>
                <h1 className="font-display text-6xl md:text-7xl leading-none mt-2">
                  {user.name}
                </h1>
                <p className="mt-2 text-muted">{user.email}</p>
                <p className="mt-4 max-w-lg text-muted">{t("trainerIntro")}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {user.trainerSlug ? (
                  <Button href={`/trainers/${user.trainerSlug}`} variant="ghost">
                    {t("viewProfile")}
                  </Button>
                ) : null}
                <Button onClick={handleLogout} variant="ghost">
                  {tn("logout")}
                </Button>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-accent/20 bg-black/20 p-4">
                <p className="font-display text-4xl text-accent">
                  {trainerBookings.filter((b) => b.status === "pending").length}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1">
                  {t("pendingCount")}
                </p>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-black/20 p-4">
                <p className="font-display text-4xl text-accent">
                  {trainerBookings.filter((b) => b.status === "confirmed").length}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1">
                  {t("confirmedCount")}
                </p>
              </div>
              <div className="rounded-2xl border border-accent/20 bg-black/20 p-4 col-span-2 md:col-span-1">
                <p className="font-display text-4xl text-accent">
                  {trainerBookings.length}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted mt-1">
                  {t("totalRequests")}
                </p>
              </div>
            </div>
          </header>

          {user.trainerSlug ? (
            <TrainerSharePanel trainerSlug={user.trainerSlug} />
          ) : null}

          <div data-aos="fade-up">
            <h2 className="font-display text-4xl mb-4">{t("incoming")}</h2>
            {trainerBookings.length === 0 ? (
              <p className="text-muted">{t("noRequests")}</p>
            ) : (
              <div className="space-y-3">
                {trainerBookings.map((b, i) => (
                  <div
                    key={b.id}
                    className="card-glass p-4 flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-accent"
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                  >
                    <div>
                      <p className="font-display text-2xl">{b.userName}</p>
                      <p className="text-sm text-muted">
                        {b.sessionTypeName} · {b.date} at {b.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={b.status} />
                      {b.status === "pending" ? (
                        <>
                          <button
                            type="button"
                            className="btn-primary !py-2 !px-3 text-xs"
                            onClick={() => updateBookingStatus(b.id, "confirmed")}
                          >
                            {t("accept")}
                          </button>
                          <button
                            type="button"
                            className="btn-ghost !py-2 !px-3 text-xs"
                            onClick={() => updateBookingStatus(b.id, "declined")}
                          >
                            {t("decline")}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Member / user dashboard
  return (
    <section className="section-pad pt-28">
      <div className="container-forge space-y-8">
        <header className="rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-500/15 via-bg to-bg p-8 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div data-aos="fade-right">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300">
                {t("memberBadge")}
              </p>
              <h1 className="font-display text-6xl md:text-7xl leading-none mt-2">
                {user.name}
              </h1>
              <p className="mt-2 text-muted">{user.email}</p>
              <p className="mt-4 max-w-lg text-muted">{t("memberIntro")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/trainers">{tc("bookTrainer")}</Button>
              <Button onClick={handleLogout} variant="ghost">
                {tn("logout")}
              </Button>
            </div>
          </div>
        </header>

        <div data-aos="fade-up">
          <h2 className="font-display text-4xl mb-4">{t("yourBookings")}</h2>
          {myBookings.length === 0 ? (
            <div className="card-glass p-8 border-sky-400/20">
              <p className="text-muted">
                {t("noBookings")}{" "}
                <Link href="/trainers" className="text-accent">
                  {t("findTrainer")}
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myBookings.map((b, i) => (
                <div
                  key={b.id}
                  className="card-glass p-4 flex flex-wrap items-center justify-between gap-3 border-l-4 border-l-sky-400"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <div>
                    <p className="font-display text-2xl">{b.trainerName}</p>
                    <p className="text-sm text-muted">
                      {b.sessionTypeName} · {b.date} at {b.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={b.status} />
                    {b.status === "pending" || b.status === "confirmed" ? (
                      <button
                        type="button"
                        className="text-xs uppercase tracking-wider text-muted hover:text-danger"
                        onClick={() => cancelBooking(b.id)}
                      >
                        {t("cancel")}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function AdminBlock({
  title,
  count,
  children,
  delay = 0,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="card-glass p-5 border-rose-400/20"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-3xl">{title}</h2>
        <span className="text-rose-300 font-display text-2xl">{count}</span>
      </div>
      <ul className="max-h-64 overflow-y-auto">{children}</ul>
    </div>
  );
}
