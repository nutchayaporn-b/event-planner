import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectDonationStore, selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllDonationsByEventId } from "../../services/eventService";
import { Ionicons } from "@expo/vector-icons";
import { Donation } from "../../models/eventModel";
import Spinner from "react-native-loading-spinner-overlay";

export default function SeeAllDonates() {
  const navigation = useNavigation();

  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);
  const [selectDonationState, setSelectDonationState] = useRecoilState(selectDonationStore);

  const { data: donations, isLoading: isDonationsLoading } = useQuery(["donations", selectEventState?.id], () =>
    getAllDonationsByEventId(selectEventState?.id as string)
  );

  const total =
    donations?.reduce((acc, donation) => {
      if (donation.status !== "APPROVED") return acc;
      return acc + Number(donation.amount);
    }, 0) || 0;

  const handleViewDonation = (donation: Donation) => {
    setSelectDonationState(donation);
    navigation.navigate("Organizer/ViewDonation" as never);
  };

  return (
    <SafeAreaView>
      <ScrollView className="flex py-4" contentContainerStyle={{ alignItems: "center" }}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
        />
        <View className="h-16"></View>
        <Text className="text-primary-800 text-3xl font-semibold">{selectEventState?.name}</Text>
        <View className="h-2"></View>
        <Text className="text-primary-100 text-3xl font-semibold">Donations</Text>
        <View className="h-4"></View>
        <View className="flex flex-col w-full">
          <View className="flex flex-row w-full px-8">
            <Text className="text-primary-100 text-xl font-semibold w-2/12 text-center">No.</Text>
            <Text className="text-primary-100 text-xl font-semibold w-4/12 text-center">Name</Text>
            <Text className="text-primary-100 text-xl font-semibold w-3/12 text-center">Amount</Text>
            <Text className="text-primary-100 text-xl font-semibold w-3/12 text-center">Status</Text>
          </View>
          <View className="h-4"></View>
          {isDonationsLoading ? (
            <Spinner
              visible
              textContent={"Loading..."}
              textStyle={{
                color: "#FFF",
              }}
            />
          ) : (
            donations?.map((donation, index) => (
              <Pressable onPress={() => handleViewDonation(donation)}>
                <View key={index} className="flex flex-row w-full px-8">
                  <Text className="text-primary-100 text-md w-2/12 text-center">{index + 1}</Text>
                  <Text className="text-primary-100 text-md w-4/12 text-center">{donation.name}</Text>
                  <Text className="text-primary-100 text-md w-3/12 text-center">{donation.amount}</Text>
                  <Text className="text-primary-100 text-md w-3/12 text-center">{donation.status}</Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
        <View className="mt-4 h-[1px] w-full bg-primary-800"></View>
        <View className="h-4"></View>
        <View className="flex flex-row w-full px-8 items-center">
          <Text className="text-primary-100 text-lg font-semibold">Total: </Text>
          <View className="w-2"></View>
          <Ionicons name="person" size={18} color="black" />
          <Text className="text-primary-100 text-lg font-semibold">{donations?.length}</Text>
          <View className="w-4"></View>
          <Text className="text-primary-100 text-lg font-semibold">{total}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
