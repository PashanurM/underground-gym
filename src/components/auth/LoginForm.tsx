"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const demos = [
  {
    role: "admin",
    email: "admin@forge.test",
    password: "admin123",
    accent: "from-rose-500/20 to-transparent border-rose-400/40",
    chip: "bg-rose-400/20 text-rose-300",
  },
  {
    role: "trainer",
    email: "trainer@forge.test",
    password: "trainer123",
    accent: "from-accent/20 to-transparent border-accent/40",
    chip: "bg-accent/20 text-accent",
  },
  {
    role: "user",
    email: "user@forge.test",
    password: "user123",
    accent: "from-sky-400/20 to-transparent border-sky-400/40",
    chip: "bg-sky-400/20 text-sky-300",
  },
] as const;

export function LoginForm() {
  const t = useTranslations("auth");
  const { login } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("user@forge.test");
  const [password, setPassword] = useState("user123");
  const [selected, setSelected] = useState<(typeof demos)[number]["role"]>("user");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(t("invalid"));
      return;
    }
    const next = search.get("next") || "/dashboard";
    router.push(next);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
      <form onSubmit={onSubmit} className="space-y-5 max-w-md">
        <div data-aos="fade-up" data-aos-delay="40">
          <label className="label-forge" htmlFor="email">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input-forge"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <label className="label-forge" htmlFor="password">
            {t("password")}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input-forge"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="text-danger text-sm">{error}</p> : null}
        <div data-aos="fade-up" data-aos-delay="160">
          <Button type="submit" className="w-full">
            {t("signIn")}
          </Button>
        </div>
        <p className="text-sm text-muted" data-aos="fade-up" data-aos-delay="200">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-accent hover:underline">
            {t("register")}
          </Link>
        </p>
      </form>

      <div className="space-y-3" data-aos="fade-left">
        <p className="label-forge">{t("demoAccounts")}</p>
        <p className="text-sm text-muted mb-4">{t("demoHint")}</p>
        {demos.map((demo, i) => (
          <button
            key={demo.role}
            type="button"
            onClick={() => {
              setSelected(demo.role);
              setEmail(demo.email);
              setPassword(demo.password);
              setError("");
            }}
            className={cn(
              "w-full text-left rounded-2xl border bg-gradient-to-r p-4 transition-all",
              demo.accent,
              selected === demo.role
                ? "ring-1 ring-accent scale-[1.01]"
                : "hover:border-white/30",
            )}
            data-aos="fade-up"
            data-aos-delay={120 + i * 60}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider",
                  demo.chip,
                )}
              >
                {t(`roles.${demo.role}`)}
              </span>
              {selected === demo.role ? (
                <span className="text-xs text-accent uppercase tracking-wider">
                  {t("selected")}
                </span>
              ) : null}
            </div>
            <p className="mt-3 font-medium text-text">{demo.email}</p>
            <p className="text-sm text-muted">
              {t("password")}: <span className="text-text">{demo.password}</span>
            </p>
            <p className="mt-2 text-xs text-muted">{t(`roleHints.${demo.role}`)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
