// lib/events.repo.ts
import {
    collection, FirestoreDataConverter, onSnapshot, orderBy, query,
    Timestamp, where
} from "firebase/firestore";
import type { Event } from "./events.types";
import { db } from "./firebase";

const eventConverter: FirestoreDataConverter<Event> = {
  toFirestore(e: Event) {
    const { id, ...rest } = e;
    return rest as any;
  },
  fromFirestore(snap) {
    const data = snap.data() as Omit<Event, "id">;
    return { id: snap.id, ...data };
  },
};

const eventsRef = collection(db, "events").withConverter(eventConverter);

// tonight = now → 6am next day
function tonightWindow(now = new Date()) {
  const start = Timestamp.fromDate(now);
  const end = new Date(now);
  // end-of-tonight at 6am next day
  end.setDate(end.getDate() + (now.getHours() >= 6 ? 1 : 0));
  end.setHours(6, 0, 0, 0);
  const endTs = Timestamp.fromDate(end);
  return { start, end: endTs };
}

// list of events tonight, ordered by start time
export function listenTonightEvents(
  cb: (evts: Event[]) => void,
  onError?: (e: unknown) => void
) {
  const { start, end } = tonightWindow();
  const q = query(
    eventsRef,
    where("startAt", ">=", start),
    where("startAt", "<", end),
    orderBy("startAt", "asc")
  );
  return onSnapshot(q, (snap) => cb(snap.docs.map(d => d.data())), onError);
}

// next events for a venue (from now forward), limited
export function listenUpcomingEventsForVenue(
  venueId: string,
  limitCount = 5,
  cb?: (evts: Event[]) => void,
  onError?: (e: unknown) => void
) {
  const q = query(
    eventsRef,
    where("venueId", "==", venueId),
    where("startAt", ">=", Timestamp.fromDate(new Date())),
    orderBy("startAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const list = snap.docs.map(d => d.data()).slice(0, limitCount);
    cb?.(list);
  }, onError);
}
