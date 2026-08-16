export type Role = "user" | "trainer" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  trainerSlug?: string;
};

export type Trainer = {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  image: string;
  experienceYears: number;
  rating: number;
  sessionTypes: SessionType[];
  branchSlug: string;
};

export type Branch = {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  features: string[];
  image: string;
};

export type SessionType = {
  id: string;
  name: string;
  durationMin: number;
  price: number;
};

export type Saloon = {
  id: string;
  slug: string;
  name: string;
  description: string;
  capacity: number;
  features: string[];
  image: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  image: string;
};

export type PricingPlan = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type PricingItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  details: string;
};

export type GymTool = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export type StaticPage = {
  slug: string;
  title: string;
  content: string;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type Booking = {
  id: string;
  userId: string;
  userName: string;
  trainerSlug: string;
  trainerName: string;
  sessionTypeId: string;
  sessionTypeName: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "declined" | "cancelled";
  createdAt: string;
};
