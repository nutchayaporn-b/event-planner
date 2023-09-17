import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { EventModel } from "../models/eventModel";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import IconButton from "./IconButton";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../stores/eventStore";

export interface EventCardProps {
  event: EventModel;
  view: "GUEST" | "ORGANIZER";
}

export default function EventCard({ event, view }: EventCardProps) {

  const navigation = useNavigation();

  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const copyToClipboard = async () => {
    Toast.show("Copy event code to clipboard", {
      duration: 2000,
      textColor: "green",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });
    await Clipboard.setStringAsync(event?.id || "");
  };

  const handleClickEvent = () => {
    setSelectEventState(event) 
    navigation.navigate((view === "GUEST" ? "Guest/ViewEvent" : "Organizer/ManageEvent") as never);
  }

  return (
    <View className="flex w-[95%] items-center border-b-2 py-4 border-primary-800 border-solid relative">
      <Pressable onPress={() => handleClickEvent()}>
        {event.image && <Image source={{ uri: event.image }} className="w-[300px] h-[300px] object-cover" />}
      </Pressable>
      {event.type === "Private" && 
        <IconButton
          icon={<EvilIcons name="share-apple" size={36} color="white" />}
          buttonClassName="bg-primary-800 flex items-center justify-center rounded-full px-1 py-2 absolute right-[20px] top-24"
          onPress={() => copyToClipboard()}
        />
      }
      <Pressable onPress={() => handleClickEvent()}>
      <View className="flex w-4/5 relative">
        {/* <IconButton icon={<AntDesign name="edit" size={24} color="black" />} buttonClassName="absolute right-0 top-6" onPress={() => navigation.navigate("EditEvent")} /> */}
        <Text className="text-primary-800 mt-4 text-xl font-semibold">{event.name}</Text>
        {event.description && <Text className="text-primary-100 mt-2 text-lg mb-1">{event.description}</Text>}
        <Text className="text-primary-100 text-lg mb-1">{moment(event.date?.toDate()).format("MMMM Do YYYY")}</Text>
        <View className="flex flex-row items-center">
          <EvilIcons name="location" size={32} color="black" className="mr-2" />
          <Text className="text-primary-100 text-[14px">{event.locationName}</Text>
        </View>
      </View>
      </Pressable>
    </View>
  );
}
