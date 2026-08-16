import type { Branch } from "@/lib/types";

export const branches: Branch[] = [
  {
    "id": "b1",
    "slug": "downtown-forge",
    "name": "Downtown Forge",
    "description": "Our flagship floor in the heart of Metro City—full strength hall, cycle studio, and coaching desk open late.",
    "address": "420 Ironworks Ave",
    "city": "Metro City",
    "phone": "+1 (555) 014-2090",
    "hours": "Mon–Fri 5:00–23:00 · Sat–Sun 7:00–21:00",
    "features": [
      "Full strength floor",
      "Cycle studio",
      "Recovery suite",
      "Member lounge"
    ],
    "image": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
  },
  {
    "id": "b2",
    "slug": "riverside-forge",
    "name": "Riverside Forge",
    "description": "Riverfront training house focused on conditioning, mobility, and recovery with floor-to-ceiling glass and open mats.",
    "address": "88 Quayline Rd",
    "city": "Metro City",
    "phone": "+1 (555) 014-2091",
    "hours": "Mon–Fri 6:00–22:00 · Sat–Sun 8:00–20:00",
    "features": [
      "HIIT zone",
      "Mobility studio",
      "Cold plunge",
      "Outdoor warm-up deck"
    ],
    "image": "https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
  },
  {
    "id": "b3",
    "slug": "west-end-forge",
    "name": "West End Forge",
    "description": "Combat-forward branch with heavy bags, functional lanes, and coaches who train fighters and everyday athletes alike.",
    "address": "15 Anvil Court",
    "city": "Metro City",
    "phone": "+1 (555) 014-2092",
    "hours": "Mon–Fri 5:30–22:30 · Sat–Sun 8:00–20:00",
    "features": [
      "Combat bay",
      "Functional lanes",
      "Sparring mats",
      "Performance track"
    ],
    "image": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5"
  }
];

export function getBranchBySlug(slug: string) {
  return branches.find((b) => b.slug === slug);
}
