"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    // Expose for debug / refresh hooks
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(onRefresh);
    window.addEventListener("load", onRefresh);
    window.addEventListener("resize", onRefresh);

    return () => {
      window.removeEventListener("load", onRefresh);
      window.removeEventListener("resize", onRefresh);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
