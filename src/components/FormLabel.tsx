import React from "react";
import { View, Text, TextInput } from "react-native";

export interface FormLabelProps {
  label: string;
  placeholder?: string;
  value?: string;
  setValue?: any;
  secure?: boolean
}

export default function FormLabel({ label, placeholder, value, setValue, secure=false }: FormLabelProps) {
  return (
    <View className="flex flex-col mt-2 w-2/3 gap-1">
      <Text className="text-primary-200 text-xl">{label}</Text>
      <TextInput
        value={value}
        secureTextEntry={secure}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder ? placeholder : ""}
        placeholderTextColor={'#9E9A96'}
        className="bg-primary-400 text-primary-800 rounded-xl py-2 px-4 text-xl"
      ></TextInput>
    </View>
  );
}
