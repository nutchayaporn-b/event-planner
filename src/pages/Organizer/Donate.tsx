import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FormLabel from "../../components/FormLabel";
import BasicButton from "../../components/BasicButton";
import { selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventModel } from "../../models/eventModel";
import { updateEventService } from "../../services/eventService";

export default function Donate() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);
  const [accountNumber, setAccountNumber] = React.useState(selectEventState?.donation?.accountNumber || "");
  const [name, setName] = React.useState(selectEventState?.donation?.holderName || "");
  const [bank, setBank] = React.useState(selectEventState?.donation?.bankName || "");
  const [pageState, setPageState] = React.useState<"VIEW" | "EDIT">("VIEW");

  const { mutate: updateEventMutate } = useMutation((event: EventModel) => updateEventService(event), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      setSelectEventState((prev) => ({ ...prev, donation: { accountNumber, bankName: bank, holderName: name } }));
    },
  });

  const handleSave = () => {
    updateEventMutate({
      ...selectEventState,
      donation: {
        accountNumber: accountNumber,
        bankName: bank,
        holderName: name,
      },
    });
    setPageState("VIEW");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center mt-10 px-8">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
      />
      <Text className="text-3xl text-primary-800">{selectEventState?.name}</Text>
      <Text className="text-3xl text-primary-100">Donate</Text>
      <View className="self-start flex w-full mt-4">
        <FormLabel
          label="Account Number:"
          placeholder=""
          value={accountNumber}
          setValue={(text: any) => setAccountNumber(text)}
          fullWidth
        />
      </View>
      <View className="self-start flex w-full mt-4">
        <FormLabel label="Holder Name:" placeholder="" value={name} setValue={(text: any) => setName(text)} fullWidth />
      </View>
      <View className="self-start flex w-full mt-4">
        <FormLabel label="Bank Name:" placeholder="" value={bank} setValue={(text: any) => setBank(text)} fullWidth />
      </View>
      <View className="h-8"></View>
      <BasicButton
        textClassName="text-white"
        buttonClassName="w-2/3 flex items-center py-2 bg-primary-800 rounded-3xl"
        onClick={() => (pageState === "VIEW" ? setPageState("EDIT") : handleSave())}
      >
        {pageState === "VIEW" ? "EDIT" : "SAVE"}
      </BasicButton>
      <View className="h-4"></View>
      <BasicButton
        textClassName="text-white"
        buttonClassName="w-2/3 flex items-center py-2 bg-primary-800 rounded-3xl"
        onClick={() => console.log("see a")}
      >
        See All Donates
      </BasicButton>
    </SafeAreaView>
  );
}
