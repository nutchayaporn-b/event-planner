import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>
      
      <Button
        title="Login"
        //@ts-ignore
        onPress={() => {navigation.navigate("Home"); navigation.reset({index: 0, routes: [{name: "Home"}]})}}
      />
    </View>
  );
}
