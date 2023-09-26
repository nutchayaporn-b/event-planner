import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../../stores/eventStore";
export default function Agenda() {
  const navigation = useNavigation();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const agendas = selectEventState?.agendas || [];
  const haveAgenda = agendas?.length !== 0;

  return (
    <SafeAreaView>
      <ScrollView className="flex py-4" contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
        />
        <View className="h-12"></View>
        <Text className="text-3xl text-primary-800 font-semibold">{selectEventState?.name}</Text>
        <View className="h-4"></View>
        <Text className="text-3xl text-primary-100">Agenda</Text>
        <View className="h-4"></View>
        <View className="h-[1px] w-full bg-primary-800"></View>
        {haveAgenda ? (
          agendas.map((agenda, index) => (
            <React.Fragment>
              <View key={index} className="w-2/3 flex flex-col mt-4 mb-4">
                <Text className="text-primary-100 text-lg">Time</Text>
                <View className="h-2"></View>
                <Text className="text-primary-800 text-2xl">{agenda.time}</Text>
                <View className="h-2"></View>
                <Text className="text-primary-100 text-lg">Details</Text>
                <View className="h-2"></View>
                <Text className="text-primary-800 text-2xl">{agenda.description}</Text>
              </View>
              <View className="h-[1px] w-full bg-primary-800"></View>
            </React.Fragment>
          ))
        ) : (
          <Text className="text-primary-800 font-semibold text-3xl">No Agenda</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
