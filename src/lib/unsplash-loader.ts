type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48";

function toUrl(src: string) {
  const raw = String(src || "").trim();
  if (!raw || raw.startsWith("/")) return null;
  try {
    return new URL(raw);
  } catch {
    return new URL(FALLBACK);
  }
}

/** Serve Unsplash at the requested width — avoids Next.js double-compression softness. */
export default function unsplashLoader({ src, width, quality }: LoaderProps) {
  const raw = String(src || "").trim();
  if (raw.startsWith("/")) return raw;
  if (raw.includes("${") || raw.includes("#{")) {
    const fallback = new URL(FALLBACK);
    const w = Math.min(Math.ceil(width * 1.25), 3840);
    fallback.searchParams.set("auto", "format");
    fallback.searchParams.set("fit", "crop");
    fallback.searchParams.set("w", String(w));
    fallback.searchParams.set("q", String(quality ?? 90));
    return fallback.toString();
  }

  const url = toUrl(raw) ?? new URL(FALLBACK);
  const w = Math.min(Math.ceil(width * 1.25), 3840);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(w));
  url.searchParams.set("q", String(quality ?? 90));
  return url.toString();
}
