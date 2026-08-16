import site from "@/config/site.json";
import { isPageEnabled } from "@/lib/site";

export const brand = {
  name: site.brand.name,
  shortName: site.brand.shortName,
  tagline: site.brand.tagline,
  email: site.brand.email,
  phone: site.brand.phone,
  address: site.brand.address,
  city: site.brand.city,
  logo: site.brand.logo,
  social: site.brand.social,
};

export type NavChild = { href: string; labelKey: string };
export type NavItem =
  | { href: string; labelKey: string; children?: undefined }
  | { labelKey: string; href?: undefined; children: NavChild[] };

const hrefToPage: Record<string, string> = {
  "/": "home",
  "/about": "about",
  "/branches": "branches",
  "/saloons": "halls",
  "/trainers": "trainers",
  "/services": "services",
  "/tools": "tools",
  "/equipment": "equipment",
  "/pricing": "pricing",
  "/shop": "shop",
  "/blog": "blog",
  "/faq": "faq",
  "/contact": "contact",
};

const allMainNav: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  {
    labelKey: "gym",
    children: [
      { href: "/branches", labelKey: "branches" },
      { href: "/saloons", labelKey: "halls" },
      { href: "/trainers", labelKey: "trainers" },
      { href: "/services", labelKey: "services" },
      { href: "/tools", labelKey: "tools" },
      { href: "/equipment", labelKey: "equipment" },
    ],
  },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/shop", labelKey: "shop" },
  { href: "/blog", labelKey: "blog" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contact", labelKey: "contact" },
];

const allFooter = [
  { href: "/", labelKey: "home" },
  { href: "/about", labelKey: "about" },
  { href: "/branches", labelKey: "branches" },
  { href: "/saloons", labelKey: "halls" },
  { href: "/services", labelKey: "services" },
  { href: "/tools", labelKey: "tools" },
  { href: "/equipment", labelKey: "equipment" },
  { href: "/trainers", labelKey: "trainers" },
  { href: "/pricing", labelKey: "pricing" },
  { href: "/shop", labelKey: "shop" },
  { href: "/blog", labelKey: "blog" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contact", labelKey: "contact" },
] as const;

export const mainNav: NavItem[] = allMainNav
  .map((item) => {
    if (item.children) {
      const children = item.children.filter((child) =>
        isPageEnabled(hrefToPage[child.href] ?? child.href),
      );
      if (!children.length) return null;
      return { ...item, children };
    }
    if (item.href && !isPageEnabled(hrefToPage[item.href] ?? item.href)) {
      return null;
    }
    return item;
  })
  .filter((item): item is NavItem => item !== null);

export const footerLinkKeys = allFooter.filter((link) =>
  isPageEnabled(hrefToPage[link.href] ?? link.href),
);
