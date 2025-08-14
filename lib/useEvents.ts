// lib/useEvents.ts
import { useEffect, useState } from "react";
import { listenTonightEvents, listenUpcomingEventsForVenue } from "./events.repo";
import type { Event } from "./events.types";

export function useTonightEvents() {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsub = listenTonightEvents(
      (e) => { setData(e); setLoading(false); },
      (err) => { setError(err as Error); setLoading(false); }
    );
    return () => unsub();
  }, []);

  return { data, loading, error };
}

export function useUpcomingEventsForVenue(venueId?: string, limit = 5) {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(!!venueId);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!venueId) return;
    setLoading(true);
    const unsub = listenUpcomingEventsForVenue(
      venueId,
      limit,
      (e) => { setData(e); setLoading(false); },
      (err) => { setError(err as Error); setLoading(false); }
    );
    return () => unsub();
  }, [venueId, limit]);

  return { data, loading, error };
}
