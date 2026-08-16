"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ShopProductCard, type ShopItem } from "./ShopProductCard";

export function ShopCatalog({ items }: { items: ShopItem[] }) {
  const t = useTranslations("pages.shop");
  const [filter, setFilter] = useState("all");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const item of items) {
      if (!seen.has(item.categoryKey)) seen.set(item.categoryKey, item.category);
    }
    return [...seen.entries()].map(([key, label]) => ({ key, label }));
  }, [items]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.categoryKey === filter)),
    [filter, items],
  );

  const featured = filter === "all" && visible.length > 2 ? visible[0] : null;
  const grid = featured ? visible.slice(1) : visible;

  return (
    <div className="shop-catalog">
      <div className="shop-toolbar">
        <div className="shop-chips" role="tablist" aria-label={t("title")}>
          <button
            type="button"
            className={`shop-chip ${filter === "all" ? "is-active" : ""}`}
            onClick={() => setFilter("all")}
          >
            {t("all")}
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.key}
              className={`shop-chip ${filter === category.key ? "is-active" : ""}`}
              onClick={() => setFilter(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <p className="shop-count">{t("count", { count: visible.length })}</p>
      </div>

      {featured ? (
        <ShopProductCard item={featured} viewLabel={t("viewProduct")} featured />
      ) : null}

      {grid.length ? (
        <div className="shop-grid">
          {grid.map((item) => (
            <ShopProductCard key={item.slug} item={item} viewLabel={t("viewProduct")} />
          ))}
        </div>
      ) : (
        <p className="shop-empty">{t("empty")}</p>
      )}
    </div>
  );
}
