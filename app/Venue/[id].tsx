import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { VENUES } from "../../lib/data";

export default function VenueDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const v = VENUES.find((x) => x.id === id);
  if (!v) return null;

  const hypeColor =
    v.hype === "HIGH" ? "#ff2bd6" : v.hype === "MEDIUM" ? "#a855f7" : "#8a8a8a";

  const openInMaps = () => {
    if (!v.address) return;
    const query = encodeURIComponent(`${v.name} ${v.address} ${v.city}`);
    // Let OS choose Apple/Google Maps
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <Stack.Screen options={{ title: "NIGHTS OUT", headerTintColor: "white" }} />

      <Image source={{ uri: v.hero }} style={{ width: "100%", height: 260 }} />

      <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>{v.name}</Text>
          <Text style={{ color: hypeColor, fontWeight: "bold" }}>{v.hype}</Text>
        </View>

        <Text style={{ color: "#bbb", marginTop: 4 }}>
          {v.address ? `${v.address}, ` : ""}{v.city}
        </Text>
        {v.openUntil && (
          <Text style={{ color: "#bbb", marginTop: 2 }}>Closes at {v.openUntil}</Text>
        )}
        {typeof v.cover === "number" && (
          <Text style={{ color: "white", marginTop: 6 }}>${v.cover} cover</Text>
        )}

        {v.music && v.music.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            {v.music.map((m) => (
              <View
                key={m}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <Text style={{ color: "#ddd", fontSize: 12 }}>{m}</Text>
              </View>
            ))}
          </View>
        )}

        {v.address && (
          <Pressable
            onPress={openInMaps}
            style={{
              marginTop: 16,
              backgroundColor: "#121212",
              paddingVertical: 12,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.1)",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>Open in Maps</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
