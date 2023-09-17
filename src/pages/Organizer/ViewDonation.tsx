import React from "react";
import IconButton from "../../components/IconButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { selectDonationStore, selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import BasicButton from "../../components/BasicButton";
import { updateDonationStatusService } from "../../services/eventService";
import Toast from "react-native-root-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function ViewDonation() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);
  const [selectDonationState, setSelectDonationState] = useRecoilState(selectDonationStore);

  const handleApprove = async () => {
    await updateDonationStatusService(selectEventState as any, selectDonationState?.uid as string, "APPROVED");
    Toast.show("Approve Success", {
      duration: Toast.durations.SHORT,
      backgroundColor: "#4caf50",
      shadow: true,
      animation: true,
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
    });
    queryClient.invalidateQueries(["donations"]);
    queryClient.invalidateQueries(["events"]);
    navigation.navigate("Organizer/SeeAllDonates" as never);
  };

  const handleNotApprove = async () => {
    await updateDonationStatusService(selectEventState as any, selectDonationState?.uid as string, "NOT APPROVED");
    Toast.show("Not approve donation", {
      duration: Toast.durations.SHORT,
      backgroundColor: "#f44336",
      shadow: true,
      animation: true,
      textColor: "#fff",
      position: Toast.positions.BOTTOM,
    });
    queryClient.invalidateQueries(["donations"]);
    queryClient.invalidateQueries(["events"]);
    navigation.navigate("Organizer/SeeAllDonates" as never);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
      />
      <View className="h-16"></View>
      <Text className="text-primary-800 text-3xl font-semibold">{selectEventState?.name}</Text>
      <View className="h-2"></View>
      <Text className="text-primary-100 text-3xl font-semibold">Donation Info</Text>
      <View className="h-4"></View>
      <View className="flex flex-col items-start w-full px-12">
        <Text className="text-primary-800 text-xl font-semibold">Name: {selectDonationState?.name}</Text>
        <View className="h-2"></View>
        <Text className="text-primary-800 text-xl font-semibold">Amount: {selectDonationState?.amount}</Text>
        <View className="h-2"></View>
        <Text className="text-primary-800 text-xl font-semibold">Status: {selectDonationState?.status}</Text>
      </View>
      <View className="h-2"></View>
      <Image source={{ uri: selectDonationState!.image }} className="w-[300px] h-[400px] object-cover" />
      <View className="flex flex-row justify-between w-2/3 mt-4">
        <BasicButton buttonClassName="px-6 py-2 bg-[#9E9A96]" textClassName="text-white" onClick={() => handleNotApprove()}>
          Not Approve
        </BasicButton>
        <BasicButton buttonClassName="px-6 py-2 bg-primary-800" textClassName="text-white" onClick={()=> handleApprove()}>
          Approve
        </BasicButton>
      </View>
    </SafeAreaView>
  );
}
