"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type LenisLike = {
  on: (event: string, handler: () => void) => void;
  off: (event: string, handler: () => void) => void;
  scrollTo: (target: number, options?: { duration?: number }) => void;
};

function getLenis() {
  return (window as Window & { __lenis?: LenisLike }).__lenis;
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = getLenis();
    lenis?.on("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off("scroll", onScroll);
    };
  }, []);

  function goTop() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      className={visible ? "scroll-top is-visible" : "scroll-top"}
      onClick={goTop}
      aria-label={t("scrollTop")}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6.5 14.5 12 9l5.5 5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
