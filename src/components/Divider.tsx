import React from "react";
import { View, Text } from "react-native";

export default function Divider({text} : {text: string}) {
  return (
    <View className="flex flex-row gap-2 items-center w-3/4 relative right-2">
      <View className="bg-primary-800 opacity-50 w-1/3 h-[2px]"></View>
      <Text className="text-primary-800 text-lg">{text}</Text>
      <View className="bg-primary-800 opacity-50 w-1/3 h-[2px]"></View>
    </View>
  );
}
