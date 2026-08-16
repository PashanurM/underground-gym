"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      setError(t("fillAll"));
      return;
    }
    if (!email.includes("@")) {
      setError(t("validEmail"));
      return;
    }
    setError("");
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div data-aos="fade-up" data-aos-delay="40">
        <label className="label-forge" htmlFor="name">
          {t("name")}
        </label>
        <input id="name" name="name" className="input-forge" />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <label className="label-forge" htmlFor="email">
          {t("email")}
        </label>
        <input id="email" name="email" type="email" className="input-forge" />
      </div>
      <div data-aos="fade-up" data-aos-delay="160">
        <label className="label-forge" htmlFor="message">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="input-forge resize-none"
        />
      </div>
      {error ? <p className="text-danger text-sm">{error}</p> : null}
      {sent ? <p className="text-accent text-sm">{t("sent")}</p> : null}
      <div data-aos="fade-up" data-aos-delay="220">
        <Button type="submit">{t("send")}</Button>
      </div>
    </form>
  );
}
