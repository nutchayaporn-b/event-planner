import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export interface ImageUploaderProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isEdit?: boolean;
  render: React.ReactNode;
}

export default function ImageUploader({
  image = "https://placehold.co/600x400/png",
  setImage,
  isEdit = true,
  render,
}: ImageUploaderProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage("data:image/jpeg;base64," + result.assets[0].base64);
    }
  };

  return (
    <View className="rounded-full w-40 h-40 mt-2 mb-2">
      <Pressable onPress={isEdit ? pickImage : undefined}>
        {image && (
          <Image
            source={{ uri: image }}
            className="rounded-full w-full h-full object-contain"
          />
        )}
      </Pressable>
      {isEdit && <Pressable onPress={() => pickImage()}>{render}</Pressable>}
    </View>
  );
}
