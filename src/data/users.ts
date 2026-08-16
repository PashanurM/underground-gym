import type { User } from "@/lib/types";

export const users: User[] = [
  {
    id: "u-admin",
    name: "Alex Admin",
    email: "admin@forge.test",
    password: "admin123",
    role: "admin",
  },
  {
    id: "u-trainer",
    name: "Maya Stone",
    email: "trainer@forge.test",
    password: "trainer123",
    role: "trainer",
    trainerSlug: "maya-stone",
  },
  {
    id: "u-user",
    name: "Jordan Lee",
    email: "user@forge.test",
    password: "user123",
    role: "user",
  },
];
