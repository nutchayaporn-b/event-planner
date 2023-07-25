import React, { useState } from "react";
import { Text, View } from "react-native";
import FormLabel from "../components/FormLabel";
import BasicButton from "../components/BasicButton";
import Divider from "../components/Divider";
import BasicHref from "../components/BasicHref";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const {handleRegister} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center flex-col gap-3 bg-secondary-400">
      <Text className="text-4xl text-primary-200">Register</Text>
      <Text className="text-lg text-primary-200 mb-8">Create your account</Text>
      <FormLabel label="Email" placeholder="Enter your email" value={email} setValue={(text: any) => setEmail(text)} />
      <View className="h-6"></View>
      <FormLabel
        label="Password"
        placeholder="Enter your password"
        value={password}
        setValue={(text: any) => setPassword(text)}
        secure={true}
      />
      <View className="h-6"></View>
      <BasicButton
        buttonClassName="py-2 w-2/3 bg-primary-800 rounded-3xl flex items-center"
        textClassName="text-xl text-white"
        onClick={() => handleRegister(email, password)}
      >
        Register
      </BasicButton>
      <View className="h-3"></View>
      <Divider text="Event Planner" />
      <View className="h-3"></View>
      <View className="flex flex-row items-center">
        <Text className="text-primary-800">Have an account already? </Text>
        <BasicHref text="Login" css="text-primary-800 font-bold" href="Login" />
      </View>
    </View>
  );
}
