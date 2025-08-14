// app/(tabs)/index.tsx
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";
import VenueCard from "../../components/VenueCard";
import { useVenues } from "../../lib/useVenues";

type Hype = "ALL" | "HIGH" | "MEDIUM" | "LOW";

export default function Home() {
  const { data, loading, error } = useVenues();

  const [q, setQ] = useState("");
  const [hype, setHype] = useState<Hype>("ALL");

  const filtered = useMemo(() => {
    const qNorm = q.trim().toLowerCase();
    return data.filter((v) => {
      const passHype = hype === "ALL" ? true : v.hype === hype;
      const hay = [v.name, v.city, ...(v.music ?? [])].join(" ").toLowerCase();
      const passQuery = qNorm === "" ? true : hay.includes(qNorm);
      return passHype && passQuery;
    });
  }, [data, q, hype]);

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingHorizontal: 16 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>
        Hot Spots Tonight 🔥
      </Text>

      {/* Search input */}
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search by name, city, or music…"
        placeholderTextColor="#777"
        style={{
          backgroundColor: "#121212",
          color: "white",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginBottom: 10,
        }}
      />

      {/* Hype filter chips */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {(["ALL", "HIGH", "MEDIUM", "LOW"] as Hype[]).map((h) => {
          const active = hype === h;
          return (
            <Pressable
              key={h}
              onPress={() => setHype(h)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.15)",
                marginRight: 8,
                backgroundColor: active ? "#1f1f1f" : "transparent",
              }}
            >
              <Text style={{ color: active ? "white" : "#ccc", fontSize: 12 }}>{h}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Status line */}
      {!loading && !error && (
        <Text style={{ color: "#888", marginBottom: 8, fontSize: 12 }}>
          Showing {filtered.length} {filtered.length === 1 ? "venue" : "venues"}
        </Text>
      )}

      {loading && <ActivityIndicator />}
      {Boolean(error) && <Text style={{ color: "red" }}>Failed to load venues.</Text>}

      {!loading && !error && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VenueCard v={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}
