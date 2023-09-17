import React from "react";
import { View, Text, Pressable } from "react-native";
import { EventModel } from "../models/eventModel";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export interface AddEventCardProps {
}

export default function AddEventCard({}: AddEventCardProps) {

  const navigation = useNavigation()

  return (
    <View className="flex w-4/5 border-b border-solid border-primary-200 items-center pb-4">
      <Pressable onPress={() => navigation.navigate("Organizer/CreateEvent" as never)}>
        <Ionicons name="add" size={90} color="#9E9A96" />
        <Text className="text-primary-100 text-2xl">Add Event</Text>
      </Pressable>
    </View>
  );
}
