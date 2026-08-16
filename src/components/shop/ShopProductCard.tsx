import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type ShopItem = {
  slug: string;
  image: string;
  price: number;
  name: string;
  category: string;
  categoryKey: string;
};

export function ShopProductCard({
  item,
  viewLabel,
  featured = false,
}: {
  item: ShopItem;
  viewLabel: string;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link href={`/shop/${item.slug}`} className="shop-feature group">
        <div className="shop-feature-media">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width:1024px) 100vw, 58vw"
          />
        </div>
        <div className="shop-feature-copy">
          <p className="shop-kicker">{item.category}</p>
          <h2 className="shop-feature-title">{item.name}</h2>
          <p className="shop-price shop-price-lg">${item.price}</p>
          <span className="shop-view">{viewLabel}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shop/${item.slug}`} className="shop-card group">
      <div className="shop-card-media">
        <Image
          src={item.image}
          alt={item.name}
          fill
          quality={90}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
        />
        <span className="shop-card-badge">{item.category}</span>
      </div>
      <div className="shop-card-body">
        <h2 className="shop-card-title">{item.name}</h2>
        <p className="shop-price">${item.price}</p>
      </div>
      <span className="shop-card-cta">{viewLabel}</span>
    </Link>
  );
}
