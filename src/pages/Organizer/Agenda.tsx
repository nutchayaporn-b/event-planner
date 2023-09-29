import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FormLabel from "../../components/FormLabel";
import BasicButton from "../../components/BasicButton";
import { selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Agenda, EventModel } from "../../models/eventModel";
import { updateAgendasService } from "../../services/eventService";
import Toast from "react-native-root-toast";
import { generateUniqueId } from "../../utils/common";

export default function AgendaPage() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const [agendas, setAgendas] = React.useState<Agenda[]>(selectEventState?.agendas || []);

  const haveAgenda = agendas?.length !== 0;

  const handleSaveAgenda = async () => {
    setSelectEventState({ ...selectEventState, agendas: agendas || [] });
    await updateAgendasService(selectEventState as EventModel, agendas || []);
    Toast.show("Update Agenda Success", {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      backgroundColor: "#4caf50",
      textColor: "#fff",
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        className="flex py-4"
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onPress={() => {
            navigation.goBack();
          }}
          icon={<AntDesign name="left" size={24} color="white" />}
          buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
        />
        <View className="h-36"></View>
        <Text className="text-3xl text-primary-800 font-semibold">{selectEventState?.name}</Text>
        <View className="h-4"></View>
        <Text className="text-3xl text-primary-100">Agenda</Text>
        <View className="h-4"></View>
        {haveAgenda ? (
          agendas?.map((agenda, index) => (
            <View className="w-2/3">
              <AgendaItem
                key={index}
                agenda={agenda}
                onChange={(agenda) => {
                  const newAgendas = agendas?.map((item) => {
                    if (item.id === agenda.id) {
                      return agenda;
                    }
                    return item;
                  });
                  setAgendas(newAgendas || []);
                }}
                onDelete={() => {
                  const newAgendas = agendas?.filter((item) => item.id !== agenda.id);
                  setAgendas(newAgendas || []);
                }}
              />
              <View className="h-[1px] w-full bg-primary-800"></View>
            </View>
          ))
        ) : (
          <View className="flex flex-col items-center mt-2 mb-2">
            <IconButton
              onPress={() => {
                setAgendas([
                  ...(agendas || []),
                  { id: generateUniqueId(), time: "", description: "" },
                ]);
              }}
              icon={<AntDesign name="plus" size={120} color="#A8A29C" />}
            />
            <Text className="text-primary-200 text-3xl">Add Agenda</Text>
          </View>
        )}
        {haveAgenda && (
          <View className="flex flex-col items-center mt-2 mb-2">
            <IconButton
              onPress={() => {
                setAgendas([
                  ...(agendas || []),
                  { id: generateUniqueId(), time: "", description: "" },
                ]);
              }}
              icon={<AntDesign name="plus" size={70} color="#A8A29C" />}
            />
            <Text className="text-primary-200 text-xl">Add Agenda</Text>
          </View>
        )}
        <View className="h-8"></View>
        <BasicButton
          textClassName="text-white"
          buttonClassName="w-2/3 flex items-center py-2 bg-primary-800 rounded-3xl"
          onClick={() => {
            handleSaveAgenda();
          }}
        >
          SAVE
        </BasicButton>
        <View className="h-4"></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AgendaItem({
  agenda,
  onChange,
  onDelete,
}: {
  agenda: Agenda;
  onChange?: (agenda: Agenda) => void;
  onDelete?: () => void;
}) {
  const [time, setTime] = React.useState(agenda.time);
  const [description, setDescription] = React.useState(agenda.description);

  React.useEffect(() => {
    if (onChange) {
      onChange({ ...agenda, time, description });
    }
  }, [time, description]);

  return (
    <View className="flex flex-col items-center mt-4 mb-8">
      <IconButton
        onPress={() => {
          if (onDelete) {
            onDelete();
          }
        }}
        icon={<AntDesign name="delete" size={24} color="#A8A29C" />}
        buttonClassName="absolute z-[9999] top-0 right-0"
      />
      <FormLabel label="Time" value={time} setValue={setTime} fullWidth />
      <FormLabel label="Description" value={description} setValue={setDescription} fullWidth />
    </View>
  );
}
