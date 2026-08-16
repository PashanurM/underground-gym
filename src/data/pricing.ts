import type { PricingPlan } from "@/lib/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "p1",
    name: "Ignite",
    price: 49,
    period: "month",
    description: "Open floor access and foundational classes.",
    features: [
      "Gym floor access",
      "2 group classes / week",
      "Locker day use",
      "App workout library",
    ],
  },
  {
    id: "p2",
    name: "Forge",
    price: 89,
    period: "month",
    description: "Unlimited classes plus recovery suite access.",
    features: [
      "Unlimited group classes",
      "Recovery suite access",
      "1 PT session / month",
      "Guest pass monthly",
      "Priority booking",
    ],
    highlighted: true,
  },
  {
    id: "p3",
    name: "Elite",
    price: 149,
    period: "month",
    description: "Full coaching stack for committed athletes.",
    features: [
      "Everything in Forge",
      "4 PT sessions / month",
      "Nutrition consult",
      "Custom programming",
      "Bring-a-friend unlimited",
    ],
  },
];
