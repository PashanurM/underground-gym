import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    "id": "pr1",
    "slug": "forge-performance-tee",
    "name": "Forge Performance Tee",
    "description": "Breathable training tee with moisture-wicking fabric and a clean athletic cut.",
    "price": 38,
    "category": "Apparel",
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
  },
  {
    "id": "pr2",
    "slug": "iron-grip-straps",
    "name": "Iron Grip Straps",
    "description": "Heavy-duty lifting straps for pulls and deadlifts when grip is the limiter.",
    "price": 24,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80"
  },
  {
    "id": "pr3",
    "slug": "forge-shaker",
    "name": "Forge Shaker",
    "description": "Leak-proof 700ml shaker with mixing grid and matte black finish.",
    "price": 18,
    "category": "Accessories",
    "image": "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80"
  },
  {
    "id": "pr4",
    "slug": "recovery-foam-roller",
    "name": "Recovery Foam Roller",
    "description": "High-density roller for post-session soft tissue work.",
    "price": 32,
    "category": "Recovery",
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80"
  },
  {
    "id": "pr5",
    "slug": "forge-heavy-hoodie",
    "name": "Forge Heavy Hoodie",
    "description": "Warm-up hoodie with reinforced seams and embroidered mark.",
    "price": 72,
    "category": "Apparel",
    "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
  },
  {
    "id": "pr6",
    "slug": "resistance-bands-set",
    "name": "Resistance Bands Set",
    "description": "Four-level loop bands for warm-ups, assistance, and accessory work.",
    "price": 29,
    "category": "Equipment",
    "image": "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80"
  }
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
