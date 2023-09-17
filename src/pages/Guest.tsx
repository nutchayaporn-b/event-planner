import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import EventCard from "../components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEventCard from "../components/AddEventCard";
import { useAuth } from "../contexts/AuthContext";
import IconButton from "../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getPublicEvents } from "../services/eventService";
import Spinner from "react-native-loading-spinner-overlay";

export default function Guest() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { data: events, isLoading: isEventsLoading } = useQuery(["events", user?.uid], () =>
    getPublicEvents()
  );
  return (
    <SafeAreaView>
      <ScrollView className="flex py-4" contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
        <IconButton
          onPress={() => navigation.navigate("Home" as never)}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
        />
        {isEventsLoading ? (
          <Spinner
            visible
            textContent={"Loading..."}
            textStyle={{
              color: "#FFF",
            }}
          />
        ) : (
          events && events.map((e) => <EventCard key={e.id} event={e} view="GUEST" />)
        )}
        <IconButton
          icon={<Ionicons name="person" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 absolute top-2 right-8"
          onPress={() => navigation.navigate("Profile" as never)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
