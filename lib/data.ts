// lib/data.ts
export type Venue = {
  id: string;
  name: string;
  city: string;
  hype: "LOW" | "MEDIUM" | "HIGH";
  hero: string;
  address?: string;
  music?: string[];
  cover?: number;
  openUntil?: string;
};

export const VENUES: Venue[] = [
  {
    id: "rouge",
    name: "Le Rouge Bar",
    city: "Montreal",
    hype: "HIGH",
    hero:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
      address: "123 Ste-Catherine St",
    music: ["EDM", "Hip-Hop"],
    cover: 20,
    openUntil: "3:00 AM",
  },
  {
    id: "belmont",
    name: "Le Belmont",
    city: "Montreal",
    hype: "HIGH",
    hero:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "muzique",
    name: "Muzique",
    city: "Montreal",
    hype: "MEDIUM",
    hero:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "belmont3",
    name: "FRANCESCO'S DISCOTECA",
    city: "Montreal",
    hype: "LOW",
    hero:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "stereo",
    name: "Stereo",
    city: "Montreal",
    hype: "LOW",
    hero:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
  },
];
