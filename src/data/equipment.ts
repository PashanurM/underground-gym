export type EquipmentItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  hall: string;
  image: string;
};

export const equipment: EquipmentItem[] = [
  {
    "id": "eq1",
    "slug": "competition-power-rack",
    "name": "Competition Power Rack",
    "category": "Strength",
    "description": "Full cages with safety pins, band pegs, and dual pull-up stations for serious barbell work.",
    "hall": "Strength Floor",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80"
  },
  {
    "id": "eq2",
    "slug": "olympic-platforms",
    "name": "Olympic Platforms",
    "category": "Strength",
    "description": "Dedicated pull/push platforms with bumper plates and calibrated bars.",
    "hall": "Strength Floor",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80"
  },
  {
    "id": "eq3",
    "slug": "smart-cycle-bikes",
    "name": "Smart Cycle Bikes",
    "category": "Cardio",
    "description": "Connected bikes with resistance sync, cadence tracking, and instructor-led rides.",
    "hall": "Cycle Studio",
    "image": "https://images.unsplash.com/photo-1593079831268-3381b0db4a04?w=1000&q=80"
  },
  {
    "id": "eq4",
    "slug": "heavy-bag-line",
    "name": "Heavy Bag Line",
    "category": "Combat",
    "description": "Multiple bag stations for power, combinations, and conditioning rounds.",
    "hall": "Combat Bay",
    "image": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&q=80"
  },
  {
    "id": "eq5",
    "slug": "cold-plunge",
    "name": "Cold Plunge",
    "category": "Recovery",
    "description": "Temperature-controlled plunge for post-session recovery and nervous system reset.",
    "hall": "Recovery Suite",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&q=80"
  },
  {
    "id": "eq6",
    "slug": "cable-functional-rig",
    "name": "Cable Functional Rig",
    "category": "Functional",
    "description": "Dual adjustable cables for accessory work, rehab patterns, and athletic drills.",
    "hall": "Strength Floor",
    "image": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1000&q=80"
  }
];
