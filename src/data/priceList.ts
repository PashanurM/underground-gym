import type { PricingItem } from "@/lib/types";

export const priceList: PricingItem[] = [
  {
    "id": "p1",
    "slug": "day-pass",
    "name": "Day Pass",
    "price": 15,
    "description": "Open floor access for one training day.",
    "details": "Train until close on the open floor — racks, platforms, cardio, and locker access included. Towels at the desk. Peak hours fill fast, so arrive early if you want a platform. Valid for the calendar day you check in.",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
  },
  {
    "id": "p2",
    "slug": "personal-training",
    "name": "Personal Training",
    "price": 80,
    "description": "A 60-minute 1:1 session with a coach.",
    "details": "Sixty minutes one-to-one with a coach: warm-up, strength or conditioning block, and a cooldown. Programming is built around your goal — strength, fat loss, or return-to-training. Book at the desk or with your coach. Cancel at least 12 hours ahead.",
    "image": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
  },
  {
    "id": "p3",
    "slug": "group-class",
    "name": "Group Class",
    "price": 25,
    "description": "Coach-led session on the class timetable.",
    "details": "A coached group session from the weekly timetable — strength, cycle, combat, or conditioning. Arrive 10 minutes early for setup. Drop-in is one class; members book in the app. Bring water and indoor shoes.",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
  },
  {
    "id": "p4",
    "slug": "recovery-session",
    "name": "Recovery Session",
    "price": 40,
    "description": "Stretch, mobility, and recovery suite time.",
    "details": "Guided mobility plus time in the recovery suite: stretch, breath work, and soft-tissue tools. Best the day after heavy lifting or a long class block. Sessions last about 45 minutes. Ask the floor coach if you are new to the suite.",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
  },
  {
    "id": "p5",
    "slug": "nutrition-consult",
    "name": "Nutrition Consult",
    "price": 55,
    "description": "A focused plan for fueling your training.",
    "details": "A 45-minute consult covering how you eat around training: protein targets, meal timing, and a simple weekly plan. Bring a typical food log if you have one. Follow-ups can be booked separately once the first plan is in place.",
    "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
  }
];
