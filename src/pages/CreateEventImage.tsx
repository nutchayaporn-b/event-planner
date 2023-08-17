import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageUploader from "../components/ImageUploader";
import ImageUploader2 from "../components/ImageUploader2";

export default function CreateEventImage() {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  return (
    <SafeAreaView className="flex-1 justify-center items-center mt-10 px-8">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
      />
      <Text className="text-3xl text-primary-100">Create Event</Text>
      <View className="h-4"></View>
      <ImageUploader2
        image={image}
        setImage={setImage}
        render={
          <View className="flex w-4/5 border-b border-solid border-primary-200 items-center pb-4">
            <Ionicons name="add" size={90} color="#9E9A96" />
            <Text className="text-primary-100 text-2xl">Add Event Image</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
