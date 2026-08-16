import site from "@/config/site.json";

export type SiteConfig = typeof site;
export type PageId = keyof typeof site.pages;

export const siteConfig = site;

export const layout = {
  headerLogoBg: Boolean(site.layout?.headerLogoBg),
  footerLogoBg: Boolean(site.layout?.footerLogoBg),
};

const PATH_PAGE: { prefix: string; page: PageId }[] = [
  { prefix: "/about", page: "about" },
  { prefix: "/branches", page: "branches" },
  { prefix: "/saloons", page: "halls" },
  { prefix: "/trainers", page: "trainers" },
  { prefix: "/services", page: "services" },
  { prefix: "/tools", page: "tools" },
  { prefix: "/equipment", page: "equipment" },
  { prefix: "/pricing", page: "pricing" },
  { prefix: "/shop", page: "shop" },
  { prefix: "/blog", page: "blog" },
  { prefix: "/faq", page: "faq" },
  { prefix: "/contact", page: "contact" },
  { prefix: "/login", page: "auth" },
  { prefix: "/register", page: "auth" },
  { prefix: "/dashboard", page: "auth" },
  { prefix: "/reserve", page: "auth" },
  { prefix: "/t", page: "auth" },
];

export function isPageEnabled(page: PageId | string): boolean {
  if (page === "home") return true;
  return Boolean(site.pages[page as PageId]);
}

export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|az|tr|ru)(?=\/|$)/, "");
  return stripped || "/";
}

export function isPathEnabled(pathname: string): boolean {
  const p = (stripLocale(pathname).replace(/\/$/, "") || "/") as string;
  if (p === "/" || p.startsWith("/pages")) return true;

  const match = PATH_PAGE.find(
    (rule) => p === rule.prefix || p.startsWith(`${rule.prefix}/`),
  );
  if (!match) return true;
  if (match.page === "auth" && p.startsWith("/reserve") && !isPageEnabled("trainers")) {
    return false;
  }
  if (match.page === "auth" && (p === "/t" || p.startsWith("/t/")) && !isPageEnabled("trainers")) {
    return false;
  }
  return isPageEnabled(match.page);
}
