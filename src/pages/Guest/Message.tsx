import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../../stores/eventStore";
import { useAuth } from "../../contexts/AuthContext";
import BasicButton from "../../components/BasicButton";
import { sendMessageService } from "../../services/eventService";
import Toast from "react-native-root-toast";
export default function Message() {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const [text, setText] = useState("");

  const handleTextChange = (text: string) => {
    // check if text is exceed 100 characters or more than 5 lines
    if(text.length > 100 || text.split("\n").length > 5) return;
    setText(text);
  }

  const handleSendMessage = async () => {
    await sendMessageService(selectEventState as any, user?.uid as string, text);
    Toast.show("Send Message Success", {
      duration: Toast.durations.SHORT,
      backgroundColor: "#4caf50",
      shadow: true,
      animation: true,
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
    });
    navigation.navigate("Guest/ViewEvent" as never);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
      />
      <Text className="text-primary-800 text-3xl font-semibold">{selectEventState?.name}</Text>
      <View className="h-4"></View>
      <Text className="text-primary-100 text-3xl font-semibold">Message</Text>
      <View className="h-16"></View>
      <TextInput
        className="w-3/4 h-40 border-2 border-primary-800 rounded-lg px-4 py-3 max-h-32 text-primary-800 text-lg"
        multiline
        textAlignVertical="top"
        numberOfLines={5}
        placeholder="Meesage to organizer..."
        value={text}
        onChangeText={(text) => handleTextChange(text)}
      />
      <BasicButton
        buttonClassName="w-3/4 py-2 text-center bg-primary-800 rounded-lg mt-4 "
        textClassName="text-white text-lg text-center"
        onClick={() => handleSendMessage()}
      >Send</BasicButton>
    </SafeAreaView>
  );
}
