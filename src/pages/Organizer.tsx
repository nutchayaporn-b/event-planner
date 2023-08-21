import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import EventCard from "../components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEventCard from "../components/AddEventCard";
import { useAuth } from "../contexts/AuthContext";
import IconButton from "../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { getEventsByUID } from "../services/eventService";
import { EventModel } from "../models/eventModel";
import { useQuery } from "@tanstack/react-query/build/lib/useQuery";

export default function Organizer() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const {data: events, isLoading: isEventsLoading} = useQuery(['events'], () => getEventsByUID(user?.uid as string))
  return (
    <SafeAreaView>
      <ScrollView
        className="flex py-4"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onPress={() => navigation.navigate("Home" as never)}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full z-[9999] absolute top-2 left-8"
        />
        {isEventsLoading && <Text>Loading...</Text>}
        {events && 
          events.map(e => (
            <EventCard key={e.id} event={e}/>
          ))
        }
        <AddEventCard />
        <IconButton
          icon={<Ionicons name="person" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 absolute top-2 right-8"
          onPress={() => navigation.navigate("Profile" as never)}
        />
        <View className="h-8"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
