import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../../stores/eventStore";
import BasicButton from "../../components/BasicButton";
export default function CheckIn() {
  const navigation = useNavigation();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);
  const handleSeeAllGuests = () => {
    navigation.navigate("SeeAllGuests" as never)
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
      />
      {selectEventState ? (
        <>
          <Text className="text-primary-800 text-3xl font-semibold">{selectEventState.name}</Text>
          <View className="h-4"></View>
          <Text className="text-primary-100 text-xl font-semibold">Check In</Text>
          <View className="h-6"></View>
          {selectEventState && <SvgQRCode value={selectEventState.code} size={240} />}
          <View className="h-12"></View>
          <BasicButton onClick={() => handleSeeAllGuests()} buttonClassName="px-6 py-2 bg-primary-800 rounded-3xl" textClassName="text-white">See All Guests</BasicButton>
        </>
      ) : <Text>Loading...</Text>}
    </SafeAreaView>
  );
}
