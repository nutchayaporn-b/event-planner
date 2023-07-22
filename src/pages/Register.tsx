import React from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormLabel from "../components/FormLabel";
import BasicButton from "../components/BasicButton";
import Divider from "../components/Divider";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BasicHref from "../components/BasicHref";

export default function Register() {
  const navigation = useNavigation();
  // navigation.navigate("Home"); navigation.reset({index: 0, routes: [{name: "Home"}]})
  return (
    <View className="flex-1 justify-center items-center flex-col gap-3 bg-secondary-400">
      <Text className="text-4xl text-primary-200">Register</Text>
      <Text className="text-lg text-primary-200 mb-8">Create your account</Text>
      <FormLabel label="Email" placeholder="Enter your email"/>
      <View className="h-6"></View>
      <FormLabel label="Password" placeholder="Enter your password"/>
      <View className="h-6"></View>
      <BasicButton buttonClassName="py-2 w-2/3 bg-primary-800 rounded-3xl flex items-center" textClassName="text-xl text-white">Register</BasicButton>
      <View className="h-3"></View>
      <Divider text="or register with"/>
      <View className="flex flex-row gap-2 items-center justify-center">
        <FontAwesome5 name="facebook" size={48} color="#3a81f2" />
        <View className="w-8"></View>
        <AntDesign name="google" size={50} color="#ff3838" />
      </View>
      <View className="h-3"></View>
      <View className="flex flex-row items-center">
        <Text className="text-primary-800">Have an account already? </Text>
        <BasicHref text="Login" css="text-primary-800 font-bold" href="Login"/>
      </View>
    </View>
  );
}
