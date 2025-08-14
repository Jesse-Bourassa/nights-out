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

