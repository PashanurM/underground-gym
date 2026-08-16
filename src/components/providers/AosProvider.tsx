"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

function refreshAos() {
  AOS.refreshHard();
}

export function AosProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      delay: 0,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    const onLoad = () => refreshAos();
    window.addEventListener("load", onLoad);
    const t = window.setTimeout(refreshAos, 200);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    // Re-scan DOM after client navigation / Lenis layout
    const ids = [
      window.setTimeout(refreshAos, 50),
      window.setTimeout(refreshAos, 200),
      window.setTimeout(refreshAos, 500),
    ];
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [pathname]);

  return <>{children}</>;
}
