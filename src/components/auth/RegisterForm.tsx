"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export function RegisterForm() {
  const t = useTranslations("auth");
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    if (password.length < 6) {
      setError(t("passwordShort"));
      return;
    }
    const result = register(name, email, password);
    if (!result.ok) {
      setError(t("exists"));
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-md">
      <div data-aos="fade-up" data-aos-delay="40">
        <label className="label-forge" htmlFor="name">
          {t("name")}
        </label>
        <input id="name" name="name" className="input-forge" required />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <label className="label-forge" htmlFor="email">
          {t("email")}
        </label>
        <input id="email" name="email" type="email" className="input-forge" required />
      </div>
      <div data-aos="fade-up" data-aos-delay="160">
        <label className="label-forge" htmlFor="password">
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input-forge"
          required
        />
      </div>
      {error ? <p className="text-danger text-sm">{error}</p> : null}
      <div data-aos="fade-up" data-aos-delay="220">
        <Button type="submit" className="w-full">
          {t("createAccount")}
        </Button>
      </div>
      <p className="text-sm text-muted" data-aos="fade-up" data-aos-delay="260">
        {t("haveAccount")}{" "}
        <Link href="/login" className="text-accent hover:underline">
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
}
