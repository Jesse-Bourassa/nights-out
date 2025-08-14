// lib/useVenues.ts
import { useEffect, useState } from "react";
import type { Venue } from "./data";
import { listenVenue, listenVenues } from "./venues.repo";

export function useVenues() {
  const [data, setData] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsub = listenVenues(
      (v) => {
        setData(v);
        setLoading(false);
      },
      (e) => {
        setError(e instanceof Error ? e : new Error(String(e)));
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return { data, loading, error };
}

// 👇 now real-time (was one-time)
export function useVenue(id?: string) {
  const [data, setData] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const unsub = listenVenue(
      id,
      (v) => {
        setData(v);
        setLoading(false);
      },
      (e) => {
        setError(e instanceof Error ? e : new Error(String(e)));
        setLoading(false);
      }
    );
    return () => unsub();
  }, [id]);

  return { data, loading, error };
}
