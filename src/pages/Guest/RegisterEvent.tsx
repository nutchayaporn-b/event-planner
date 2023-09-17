import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import EventCard from "../../components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEventCard from "../../components/AddEventCard";
import { useAuth } from "../../contexts/AuthContext";
import IconButton from "../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getPublicEvents, getRegisteredEvents } from "../../services/eventService";
import Spinner from "react-native-loading-spinner-overlay";
import BasicButton from "../../components/BasicButton";

export default function RegisterEvent() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { data: events, isLoading: isEventsLoading } = useQuery(["events", user?.uid], () => getRegisteredEvents(user?.uid as string));
  return (
    <SafeAreaView>
      <ScrollView className="flex py-4" contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
        <IconButton
          onPress={() => navigation.navigate("Home" as never)}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
        />
        <View className="h-24"></View>
        <View className="flex flex-row">
        <BasicButton
            buttonClassName="px-8 py-2 bg-primary-100"
            textClassName="text-white"
            onClick={() => navigation.navigate("Guest" as never)}
          >
            Browse Events
          </BasicButton>
          <View className="w-4"></View>
          <BasicButton
            buttonClassName="px-8 py-2 bg-primary-800"
            textClassName="text-white"
            onClick={() => navigation.navigate("Guest/RegisterEvent" as never)}
          >
            Registered Events
          </BasicButton>
        </View>
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
        <BasicButton
          buttonClassName="bg-[#A8A29C] px-4 py-2 rounded-2xl absolute top-3"
          textClassName="text-white"
          onClick={() => navigation.navigate("JoinEvent" as never)}
        >
          Join private event
        </BasicButton>
        <IconButton
          icon={<Ionicons name="person" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 absolute top-2 right-8"
          onPress={() => navigation.navigate("Profile" as never)}
        />
        <View className="h-12"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
