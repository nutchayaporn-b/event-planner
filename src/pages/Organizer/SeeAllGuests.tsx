import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUserByUID } from "../../services/userService";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SeeAllGuests() {
  const navigation = useNavigation();

  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const { data: participants, isLoading: isParticipantsLoading } = useQuery(
    ["participants", selectEventState?.id],
    async () => {
      return (await Promise.all(
        // @ts-ignore
        selectEventState?.participants?.map(async (participant) => {
          const user = await getUserByUID(participant.uid);
          return {
            ...participant,
            ...user,
          } as any;
        })
      )) as any[];
    }
  );

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
      <Text className="text-primary-100 text-3xl font-semibold">Check In</Text>
      <View className="h-4"></View>
      <View className="flex flex-col w-full">
        <View className="flex flex-row w-full px-8">
          <Text className="text-primary-100 text-xl font-semibold w-2/12 text-center">No.</Text>
          <Text className="text-primary-100 text-xl font-semibold w-6/12 text-center">Name</Text>
          <Text className="text-primary-100 text-xl font-semibold w-4/12 text-center">Status</Text>
        </View>
        <View className="h-4"></View>
        {isParticipantsLoading ? (
          <Spinner
            visible
            textContent={"Loading..."}
            textStyle={{
              color: "#FFF",
            }}
          />
        ) : participants?.length === 0 || !participants ? (
          <Text className="text-primary-100 text-xl font-semibold">No participants yet.</Text>
        ) : (
          participants.map((participant, index) => {
            return (
              <View className="flex flex-row w-full px-8">
                <Text className="text-primary-100 text-md font-semibold w-2/12 text-center">{index + 1}</Text>
                <Text className="text-primary-100 text-md font-semibold w-6/12 text-center">
                  {participant.firstName} {participant.lastName}
                </Text>
                <Text className="text-primary-100 text-md font-semibold w-4/12 text-center">
                  {participant.checkIn ? "Checked In" : "Not Check in"}
                </Text>
              </View>
            );
          })
        )}
      </View>
      <View className="mt-4 h-[1px] w-full bg-primary-800"></View>
      <View className="flex flex-col items-start w-full px-8 mt-4">
        <View className="flex flex-row items-center">
          <Text className="text-primary-800 text-lg font-semibold mr-1">Registered Guests</Text>
          <Ionicons name="person" size={18} color="black" />
          <Text className="ml-1 text-primary-800 text-lg font-semibold">{participants?.length}</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-primary-800 text-lg font-semibold mr-1">Checked In</Text>
          <MaterialCommunityIcons name="account-check" size={24} color="black" />
          <Text className="ml-1 text-primary-800 text-lg font-semibold">
            {participants?.filter((participant) => participant.checkIn).length}
          </Text>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-primary-800 text-lg font-semibold mr-1">Not Check In</Text>
          <MaterialCommunityIcons name="account-remove" size={24} color="black" />
          <Text className="ml-1 text-primary-800 text-lg font-semibold">
            {participants?.filter((participant) => !participant.checkIn).length}
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
