// app/Event/[id].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Linking, ScrollView, Text, View } from "react-native";
import type { Event } from "../../lib/events.types";
import { db } from "../../lib/firebase";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [e, setE] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const snap = await getDoc(doc(db, "events", String(id)));
      setE(snap.exists() ? ({ id: snap.id, ...(snap.data() as any) }) : null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#0a0a0a" }}><ActivityIndicator/></View>;
  if (!e) return <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#0a0a0a" }}><Text style={{ color:"white" }}>Event not found.</Text></View>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <Stack.Screen options={{ title: "NIGHTS OUT", headerTintColor: "white" }} />
      <Image source={{ uri: e.hero }} style={{ width: "100%", height: 260 }} />
      <View style={{ padding: 16 }}>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>{e.title}</Text>
        <Text style={{ color: "#bbb", marginTop: 6 }}>
          Starts {e.startAt.toDate().toLocaleString([], { hour: "numeric", minute: "2-digit" })}
        </Text>
        {typeof e.priceMin === "number" && (
          <Text style={{ color: "#bbb", marginTop: 2 }}>
            From ${e.priceMin}{typeof e.priceMax === "number" ? `–${e.priceMax}` : ""}
          </Text>
        )}
        {e.ticketUrl && (
          <Text
            onPress={() => Linking.openURL(e.ticketUrl!)}
            style={{ color: "#8ab4ff", marginTop: 12, fontWeight: "600" }}
          >
            Get tickets
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
