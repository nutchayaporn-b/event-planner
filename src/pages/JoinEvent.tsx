import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import IconButton from "../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import FormLabel from "../components/FormLabel";
import BasicButton from "../components/BasicButton";
import { getEventByCode } from "../services/eventService";
import Toast from "react-native-root-toast";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../stores/eventStore";

export default function JoinEvent() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);
  const [code, setCode] = React.useState("");

  const handleJoinEvent = async () => {
    const event = await getEventByCode(code);
    if(!event) return Toast.show("Event not found", {
      duration: 3000,
      textColor: "red",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });

    if(event.participants?.find(p => p.uid === user?.uid)) return Toast.show("You already joined this event", {
      duration: 3000,
      textColor: "red",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });

    setSelectEventState(event);
    navigation.navigate("Guest/ViewEvent" as never);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
      />
      <Text className="text-primary-100 font-semibold text-3xl">Private Event</Text>
      <View className="h-24"></View>
      <FormLabel label="Enter Code" placeholder="Event code here..." value={code} setValue={setCode} />
      <View className="h-8"></View>
      <BasicButton
        buttonClassName="bg-primary-800 px-12 py-2 rounded-2xl"
        textClassName="text-white"
        onClick={() => handleJoinEvent()}
      >
        Confirm
      </BasicButton>
      <View className="h-[250px]"></View>
    </SafeAreaView>
  );
}
