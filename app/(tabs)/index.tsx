// app/(tabs)/index.tsx
import { FlatList, Text, View } from "react-native";
import VenueCard from "../../components/VenueCard";
import { VENUES } from "../../lib/data";

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "#0a0a0a", paddingHorizontal: 16 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>
        Hot Spots Tonight 🔥
      </Text>

      <FlatList
        data={VENUES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VenueCard v={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}
