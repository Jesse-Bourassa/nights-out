// components/EventCard.tsx
import { Link } from "expo-router";
import { Image, Pressable, Text } from "react-native";
import type { Event } from "../lib/events.types";

function fmtTime(ts: any) {
  // ts is Firestore Timestamp
  const d = ts.toDate() as Date;
  const hh = d.getHours();
  const mm = d.getMinutes().toString().padStart(2, "0");
  const h12 = ((hh + 11) % 12) + 1;
  const ap = hh >= 12 ? "PM" : "AM";
  return `${h12}:${mm} ${ap}`;
}

export default function EventCard({ e }: { e: Event }) {
  return (
    <Link href={{ pathname: "/Event/[id]", params: { id: e.id } }} asChild>
      <Pressable
        style={{
          backgroundColor: "#121212",
          borderRadius: 16,
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <Image source={{ uri: e.hero }} style={{ width: "100%", height: 160, borderRadius: 12, marginBottom: 8 }} />
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{e.title}</Text>
        <Text style={{ color: "#bbb", marginTop: 4 }}>
          Starts {fmtTime(e.startAt)} · {e.music?.join(" • ") ?? "Music"}
        </Text>
        {typeof e.priceMin === "number" && (
          <Text style={{ color: "#bbb", marginTop: 2 }}>
            From ${e.priceMin}{typeof e.priceMax === "number" ? `–${e.priceMax}` : "" }
          </Text>
        )}
      </Pressable>
    </Link>
  );
}
