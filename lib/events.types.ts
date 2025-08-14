// lib/events.types.ts
import type { Timestamp } from "firebase/firestore";

export type Event = {
  id: string;
  venueId: string;          // reference to /venues/{id}
  title: string;            // e.g. "Techno Tuesdays"
  startAt: Timestamp;       // when the event starts
  endAt?: Timestamp;        // optional
  priceMin?: number;        // or cover: number
  priceMax?: number;
  music?: string[];
  hero: string;             // image url
  ticketUrl?: string;       // optional external link
  published?: boolean;      // simple on/off
};
