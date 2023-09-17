import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { selectEventStore } from "../../stores/eventStore";
import { useRecoilState } from "recoil";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
import ImageUploader2 from "../../components/ImageUploader2";
import FormLabel from "../../components/FormLabel";
import BasicButton from "../../components/BasicButton";
import { donateEventService } from "../../services/eventService";
import { useAuth } from "../../contexts/AuthContext";

export default function Donate() {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);

  const copyToClipboard = async (text: string) => {
    Toast.show("Copy to clipboard", {
      duration: 2000,
      textColor: "green",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });
    await Clipboard.setStringAsync(text);
  };

  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");

  const handleDonate = async () => {

    if(!name) return Toast.show("Please input name", {
      duration: 2000,
      textColor: "red",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });

    if(!amount) return Toast.show("Please input amount", {
      duration: 2000,
      textColor: "red",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });

    if(!image) return Toast.show("Please upload image", {
      duration: 2000,
      textColor: "red",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });

    // check if amount is number by regex also cannot start with 0 and cannot be 0
    const regex = /^[1-9]\d*$/;
    if(!regex.test(amount)) return Toast.show("Please input valid amount", {
      duration: 2000,
      textColor: "red",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });

    await donateEventService(selectEventState as any, user?.uid as string, name, image, amount);
    Toast.show(`Donated to ${selectEventState?.name} with amount ${amount}`
    , {
      duration: 2000,
      textColor: "green",
      backgroundColor: "white",
      position: Toast.positions.TOP,
    });
  };

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
        <Text className="text-3xl text-primary-100 font-semibold">Donate</Text>
        <View className="h-4"></View>
        <View className="flex flex-row w-full px-8 items-center">
          <Text className="text-primary-800 text-lg font-semibold">Account Number: </Text>
          <Text className="text-primary-100 text-lg font-semibold mr-2">
            {selectEventState?.donation?.accountNumber}
          </Text>
          <IconButton
            onPress={() => copyToClipboard(selectEventState?.donation?.accountNumber as string)}
            icon={<Feather name="copy" size={24} color="black" />}
          />
        </View>
        <View className="flex flex-row w-full px-8 items-center">
          <Text className="text-primary-800 text-lg font-semibold">Bank Name: </Text>
          <Text className="text-primary-100 text-lg font-semibold mr-2">{selectEventState?.donation?.bankName}</Text>
        </View>
        <View className="flex flex-row w-full px-8 items-center">
          <Text className="text-primary-800 text-lg font-semibold">Holder Name: </Text>
          <Text className="text-primary-100 text-lg font-semibold mr-2">{selectEventState?.donation?.holderName}</Text>
        </View>
        <ImageUploader2
          image={image}
          setImage={setImage}
          render={
            <View className="flex flex-row items-center justify-center w-[300px] h-[400px] bg-primary-200 rounded-md">
              <Feather name="upload" size={24} color="white" />
              <Text className="text-white text-lg font-semibold ml-2">Upload Image</Text>
            </View>
          }
        />
        <View className="h-4"></View>
        <FormLabel
          label="Name"
          placeholder=""
          value={name}
          setValue={(text: any) => setName(text)}
        />
        <FormLabel
          label="Amount"
          placeholder=""
          value={amount}
          setValue={(text: any) => setAmount(text)}
        />
        <View className="h-6"></View>
        <BasicButton 
          buttonClassName="w-2/3 flex items-center py-2 bg-primary-800 rounded-3xl"
          textClassName="text-white"
          onClick={() => handleDonate()}
        >
          Donate
        </BasicButton>
        <View className="h-16"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
