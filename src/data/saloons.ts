import type { Saloon } from "@/lib/types";

export const saloons: Saloon[] = [
  {
    "id": "s1",
    "slug": "strength-floor",
    "name": "Strength Floor",
    "description": "Olympic platforms, competition racks, and specialty bars. Built for serious lifting with open sightlines and dense rubber flooring.",
    "capacity": 40,
    "features": [
      "Power racks",
      "Bumper plates",
      "Deadlift platforms",
      "Cable stations"
    ],
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
  },
  {
    "id": "s2",
    "slug": "cycle-studio",
    "name": "Cycle Studio",
    "description": "Immersive ride room with synced lighting and instructor-led climbs. High-energy sessions that feel like a night ride.",
    "capacity": 28,
    "features": [
      "Smart bikes",
      "LED sync",
      "Heart-rate tracking",
      "Sound system"
    ],
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
  },
  {
    "id": "s3",
    "slug": "recovery-suite",
    "name": "Recovery Suite",
    "description": "Quiet zone for soft tissue work, breath practice, and post-session reset. Where intensity meets restoration.",
    "capacity": 16,
    "features": [
      "Foam rolling",
      "Stretch zones",
      "Cold plunge access",
      "Massage guns"
    ],
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f"
  },
  {
    "id": "s4",
    "slug": "combat-bay",
    "name": "Combat Bay",
    "description": "Heavy bags, open mats, and sparring space for boxing and functional fight training.",
    "capacity": 22,
    "features": [
      "Heavy bags",
      "Open mats",
      "Speed bags",
      "Mirror wall"
    ],
    "image": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed"
  }
];

export function getSaloonBySlug(slug: string) {
  return saloons.find((s) => s.slug === slug);
}
