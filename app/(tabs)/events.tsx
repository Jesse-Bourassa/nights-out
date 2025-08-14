// app/(tabs)/events.tsx  (rename your Tonight tab to "events.tsx")
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import EventCard from "../../components/EventCard";
import { useTonightEvents } from "../../lib/useEvents";

export default function Events() {
  const { data, loading, error } = useTonightEvents();

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingHorizontal: 16 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>
        Tonight in Montreal ✨
      </Text>

      {loading && <ActivityIndicator />}
      {Boolean(error) && <Text style={{ color: "red" }}>Failed to load events.</Text>}

      {!loading && !error && data.length === 0 && (
        <Text style={{ color: "#bbb" }}>No events listed for tonight yet.</Text>
      )}

      {!loading && !error && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(e) => e.id}
          renderItem={({ item }) => <EventCard e={item} />}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}
