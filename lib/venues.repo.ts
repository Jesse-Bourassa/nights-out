// lib/venues.repo.ts
import {
  collection,
  doc,
  FirestoreDataConverter,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import type { Venue } from "./data";
import { db } from "./firebase";

const venueConverter: FirestoreDataConverter<Venue> = {
  toFirestore(v: Venue) {
    const { id, ...rest } = v;
    return rest as any;
  },
  fromFirestore(snap) {
    const data = snap.data() as Omit<Venue, "id">;
    return { id: snap.id, ...data };
  },
};

const venuesRef = collection(db, "venues").withConverter(venueConverter);

// --- collection listener (already real-time on Home) ---
export function listenVenues(cb: (v: Venue[]) => void, onError?: (e: unknown) => void) {
  const q = query(venuesRef, orderBy("name", "asc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => d.data())), onError);
}

// --- single-doc one-time fetch (kept for other uses) ---
export async function getVenue(id: string) {
  const snap = await getDoc(doc(db, "venues", id).withConverter(venueConverter));
  return snap.exists() ? snap.data() : null;
}

// --- NEW: single-doc real-time listener ---
export function listenVenue(
  id: string,
  cb: (v: Venue | null) => void,
  onError?: (e: unknown) => void
) {
  const ref = doc(db, "venues", id).withConverter(venueConverter);
  return onSnapshot(ref, (snap) => cb(snap.exists() ? snap.data() : null), onError);
}
