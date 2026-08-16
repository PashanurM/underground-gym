export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    "id": "tm1",
    "name": "Sara M.",
    "role": "Forge member · 14 months",
    "quote": "The coaching is sharp and the halls feel purpose-built. I finally have a program that sticks.",
    "rating": 5
  },
  {
    "id": "tm2",
    "name": "Leo K.",
    "role": "Strength athlete",
    "quote": "Booking Maya was seamless. Progressive overload without ego lifting—exactly what I needed.",
    "rating": 5
  },
  {
    "id": "tm3",
    "name": "Nina R.",
    "role": "HIIT regular",
    "quote": "Cycle studio nights hit different. Atmosphere is dark, loud, and focused—in the best way.",
    "rating": 5
  },
  {
    "id": "tm4",
    "name": "Omar T.",
    "role": "Elite plan",
    "quote": "Recovery suite after heavy days changed my consistency. Forge treats training like a craft.",
    "rating": 5
  }
];
