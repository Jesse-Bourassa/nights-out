// components/VenueCard.tsx
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import type { Venue } from "../lib/data";
import { isOpenNow } from "../lib/time";

export default function VenueCard({ v }: { v: Venue }) {
  const hypeColor =
    v.hype === "HIGH" ? "#ff2bd6" : v.hype === "MEDIUM" ? "#a855f7" : "#8a8a8a";

  const open = isOpenNow(v.openUntil); // true | false | null

  return (
    <Link href={{ pathname: "/Venue/[id]", params: { id: v.id } }} asChild>
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
        <Image
          source={{ uri: v.hero }}
          style={{ width: "100%", height: 160, borderRadius: 12, marginBottom: 8 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{v.name}</Text>
            <Text style={{ color: "#aaa" }}>{v.city}</Text>
          </View>
          <Text style={{ color: hypeColor, fontWeight: "bold" }}>{v.hype}</Text>
        </View>

        {v.openUntil && (
          <Text style={{ color: open ? "#22c55e" : "#bbb", marginTop: 6, fontSize: 12 }}>
            {open ? "Open now" : "Closed"} · Closes at {v.openUntil}
          </Text>
        )}
      </Pressable>
    </Link>
  );
}
