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

export default function Organizer() {
  const navigation = useNavigation();
  const { user } = useAuth();
  return (
    <SafeAreaView>
      <ScrollView className="flex py-4" contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
        <IconButton
          onPress={() => navigation.navigate("Home")}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full z-[9999] absolute top-2 left-8"
        />
        <AddEventCard />
        <IconButton
          icon={<Ionicons name="person" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 absolute top-2 right-8"
          onPress={() => navigation.navigate("Profile")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
