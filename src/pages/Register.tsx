import React, { useState } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-root-toast';
import FormLabel from "../components/FormLabel";
import BasicButton from "../components/BasicButton";
import Divider from "../components/Divider";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import BasicHref from "../components/BasicHref";
import {getAuth, createUserWithEmailAndPassword, UserCredential, sendEmailVerification} from 'firebase/auth'

export default function Register() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(email: string, password: string) {
    if(!email) return Toast.show("Email cannot be empty", {duration: 1000, textColor: 'red', backgroundColor:'white', position: Toast.positions.TOP})
    if(!password) return Toast.show("Password cannot be empty", {duration: 1000, textColor: 'red', backgroundColor:'white', position: Toast.positions.TOP})
    createUserWithEmailAndPassword(auth, email, password).then((userCredential:UserCredential) => {
      const user = userCredential.user;
      if(user.emailVerified === false) {
        return sendEmailVerification(user).then(() => {
          return Toast.show('Please verify your email sent to: ' + user.email, {duration:3000, textColor: 'green', backgroundColor:'white', position: Toast.positions.TOP})
        })
      }
      Toast.show('Successfully register your account', {duration:1000, textColor: 'green', backgroundColor:'white', position: Toast.positions.TOP})
    }).catch((error:any) => {
      console.log(error)
      Toast.show(error.message, {duration: 3000, textColor: 'red', backgroundColor:'white', position: Toast.positions.TOP})
    })
  }
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
      <Divider text="or register with" />
      <View className="flex flex-row gap-2 items-center justify-center">
        <FontAwesome5 name="facebook" size={48} color="#3a81f2" />
        <View className="w-8"></View>
        <AntDesign name="google" size={50} color="#ff3838" />
      </View>
      <View className="h-3"></View>
      <View className="flex flex-row items-center">
        <Text className="text-primary-800">Have an account already? </Text>
        <BasicHref text="Login" css="text-primary-800 font-bold" href="Login" />
      </View>
    </View>
  );
}
