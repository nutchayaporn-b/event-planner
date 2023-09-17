import React from "react";
import { View, Text, ImageBackground, Pressable } from "react-native";
import IconButton from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../../stores/eventStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { joinEventService } from "../../services/eventService";
import { useAuth } from "../../contexts/AuthContext";
import { EventModel } from "../../models/eventModel";
import Toast from "react-native-root-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function ViewEvent() {
  const navigation = useNavigation();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const registeredEvent = selectEventState?.participants?.find((p) => p.uid === user?.uid);

  const handleJoinEvent = async () => {
    if (registeredEvent)
      return Toast.show("You already joined this event", {
        duration: 3000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });
    await joinEventService(selectEventState as EventModel, user?.uid as string);
    Toast.show("Successfully joined event", {
      duration: 3000,
      textColor: "green",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });
    navigation.navigate("Guest/RegisterEvent" as never);
    queryClient.invalidateQueries(["events"]);
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
      />
      <View className="flex w-full">
        {selectEventState?.image ? (
          <ImageBackground source={{ uri: selectEventState.image }} resizeMode="cover" imageStyle={{ opacity: 0.13 }}>
            <View className="flex w-full h-[500px] items-center py-4">
              <Text className="text-primary-800 text-3xl font-semibold">{selectEventState.name}</Text>
              <Text className="text-primary-100 text-xl font-semibold">{selectEventState.type + " Event"}</Text>
              <View className="h-6"></View>
              {!registeredEvent ? (
                <Pressable
                  onPress={() => handleJoinEvent()}
                  className="flex w-[70%] border-b border-primary-800 border-solid py-4 mt-4"
                >
                  <Text className="text-3xl text-start font-semibold text-primary-100">Join Event</Text>
                </Pressable>
              ) : (
                <>
                  <NavLine name="Check In" />
                  <NavLine name="Donate" />
                  <NavLine name="Message" />
                  <NavLine name="Agenda" />
                </>
              )}
            </View>
          </ImageBackground>
        ) : (
          <View></View>
        )}
      </View>
    </SafeAreaView>
  );
}

function NavLine({ name }: { name: string }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(`Guest/${name.replaceAll(" ", "")}` as never)}
      className="flex w-[70%] border-b border-primary-800 border-solid py-4 mt-4"
    >
      <Text className="text-3xl text-start font-semibold text-primary-100">{name}</Text>
    </Pressable>
  );
}
