"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80";

function inAppBrowser() {
  const ua = navigator.userAgent || "";
  return /Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(ua);
}

export function VideoHero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const t = useTranslations("home");
  const tb = useTranslations("brand");

  useEffect(() => {
    if (!inAppBrowser()) setAllowVideo(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.controls = false;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5");
    video.removeAttribute("controls");

    const markPlaying = () => video.classList.add("is-playing");
    const tryPlay = () => {
      const attempt = video.play();
      if (attempt) void attempt.catch(() => {});
    };

    tryPlay();
    video.addEventListener("playing", markPlaying);
    video.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    document.addEventListener("touchstart", tryPlay, { passive: true });
    document.addEventListener("click", tryPlay);

    return () => {
      video.removeEventListener("playing", markPlaying);
      video.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
  }, [allowVideo]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-brand", { y: 80, opacity: 0, duration: 1 })
        .from(".hero-line", { y: 40, opacity: 0, duration: 0.7 }, "-=0.45")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".hero-cta", { y: 24, opacity: 0, duration: 0.55 }, "-=0.3")
        .from(".hero-media", { scale: 1.08, duration: 1.6, ease: "power2.out" }, 0);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative min-h-[100svh] overflow-hidden">
      <div
        className="hero-media absolute inset-0 z-0"
        style={{ backgroundImage: `url("${HERO_POSTER}")` }}
      >
        {allowVideo ? (
          <video
            ref={videoRef}
            className="hero-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
            tabIndex={-1}
            aria-hidden="true"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-training-in-the-gym-5972/1080p.mp4"
              type="video/mp4"
            />
          </video>
        ) : null}
      </div>
      <div className="hero-media-cover pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-bg via-bg/55 to-bg/30" />
      <div className="hero-media-cover pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,11,12,0.7)_100%)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-[clamp(1.25rem,4vw,4rem)] pb-16 pt-28 md:pb-24">
        <p className="hero-brand font-display text-[clamp(3.25rem,12vw,11rem)] leading-[0.85] text-text max-w-full">
          {tb("name")}
        </p>
        <h1 className="hero-line mt-4 max-w-2xl font-display text-[clamp(1.5rem,4.5vw,3.2rem)] text-accent">
          {t("heroHeadline")}
        </h1>
        <p className="hero-sub mt-3 max-w-md text-lg text-muted">{t("heroSub")}</p>
        <div className="hero-cta mt-8 flex flex-wrap gap-4">
          <Button href="/pricing">
            {t("joinCta", { name: tb("name"), shortName: tb("shortName") })}
          </Button>
          <Button href="/trainers" variant="ghost">
            {t("bookCta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
