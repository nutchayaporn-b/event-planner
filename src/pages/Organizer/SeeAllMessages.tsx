import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectDonationStore, selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getUserByUID } from "../../services/userService";
import Spinner from "react-native-loading-spinner-overlay";

export default function SeeAllMessages() {
  const navigation = useNavigation();

  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const { data: messages, isLoading: isLoadingMessages } = useQuery(["messages"], async () => {
    return (await Promise.all(
      // @ts-ignore
      selectEventState?.messages?.map(async (message) => {
        const user = await getUserByUID(message.uid);
        return {
          ...message,
          ...user,
        } as any;
      })
    )) as any[];
  });

  const [selectMessage, setSelectMessage] = React.useState<any>();

  const handlePreviewMessage = (message: any) => {
    setSelectMessage(message);
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
        <Text className="text-primary-100 text-3xl font-semibold">Messages</Text>
        <View className="h-4"></View>
        <View className="flex flex-col w-full">
          <View className="flex flex-row w-full px-8">
            <Text className="text-primary-100 text-xl font-semibold w-2/12 text-center">No.</Text>
            <Text className="text-primary-100 text-xl font-semibold w-6/12 text-center">Name</Text>
            <Text className="text-primary-100 text-xl font-semibold w-4/12 text-center">Message</Text>
          </View>
          <View className="h-4"></View>
          {isLoadingMessages ? (
            <Spinner
              visible
              textContent={"Loading..."}
              textStyle={{
                color: "#FFF",
              }}
            />
          ) : (
            messages?.map((message, index) => (
              <Pressable onPress={() => handlePreviewMessage(message)} className="flex flex-row w-full px-8">
                <Text className="text-primary-100 text-md font-semibold w-2/12 text-center">{index + 1}</Text>
                <Text className="text-primary-100 text-md font-semibold w-6/12 text-center">{message.firstName} {message.lastName}</Text>
                <Text className="text-primary-100 text-md font-semibold w-4/12 text-center">Click to see message</Text>
              </Pressable>
            ))
          )}
        </View>
        {
          selectMessage && (
            <View className="w-full top-[50%] translate-y-[50%] absolute bg-primary-800 rounded-lg p-4 h-80">
              <IconButton
                icon={<AntDesign name="close" size={24} color="white" />}
                buttonClassName="rounded-full absolute z-[9999] top-2 right-2"
                onPress={() => setSelectMessage(undefined)}
              />
              <Text className="text-white text-lg font-semibold text-center">{selectMessage?.firstName} {selectMessage?.lastName}</Text>
              <View className="h-4"></View>
              <Text className="text-white text-md font-semibold text-center">{selectMessage?.message}</Text>
            </View>
          )
        }
        <View className="mt-4 h-[1px] w-full bg-primary-800"></View>
        <View className="h-[40vh]"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
