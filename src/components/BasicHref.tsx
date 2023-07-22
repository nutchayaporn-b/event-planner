import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable ,Text } from "react-native";

export interface BasicHrefProps {
  href: string;
  css?: string;
  text: string;
}

export default function BasicHref({ href, css, text }: BasicHrefProps) {
  const navigation = useNavigation()
  //@ts-ignore
  return <Pressable onPress={() => {navigation.navigate(href)}}><Text className={css ? css : ""}>{text}</Text></Pressable>;
}
