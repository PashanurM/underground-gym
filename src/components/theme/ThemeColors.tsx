import site from "@/config/site.json";

function isLightHex(hex: string) {
  const raw = String(hex || "").replace("#", "");
  if (raw.length < 6) return false;
  const r = parseInt(raw.slice(0, 2), 16) / 255;
  const g = parseInt(raw.slice(2, 4), 16) / 255;
  const b = parseInt(raw.slice(4, 6), 16) / 255;
  const lin = (v: number) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b) > 0.45;
}

type SiteColors = typeof site.colors & { logoBg?: string };

export function ThemeColors() {
  const c = site.colors as SiteColors;
  const logoBg = c.logoBg || c.bg;
  const lightFill = isLightHex(logoBg);
  const chromeFg = lightFill ? "#121416" : "#f2f4f3";
  const chromeMuted = lightFill ? "#4b5563" : "#9aa3ad";
  const accentInk = isLightHex(c.accent) ? "#0a0b0c" : "#f2f4f3";
  const css = `:root {
  --bg: ${c.bg};
  --bg-elevated: ${c.bgElevated};
  --surface: ${c.surface};
  --surface-2: ${c.surface2};
  --text: ${c.text};
  --muted: ${c.muted};
  --accent: ${c.accent};
  --accent-2: ${c.accent2};
  --accent-ink: ${accentInk};
  --logo-bg: ${logoBg};
  --header-bg: ${logoBg};
  --footer-bg: ${logoBg};
  --chrome-fg: ${chromeFg};
  --chrome-muted: ${chromeMuted};
}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
