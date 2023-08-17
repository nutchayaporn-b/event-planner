import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export interface ImageUploader2Props {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isEdit?: boolean;
  render: React.ReactNode;
}

export default function ImageUploader2({
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
    <>
      <Pressable onPress={isEdit ? pickImage : undefined}>
        {image && (
          <Image
            source={{ uri: image }}
            className="w-[300px] h-[400px] object-contain"
          />
        )}
      </Pressable>
      {!image && isEdit && <Pressable onPress={() => pickImage()}>{render}</Pressable>}
    </>
  );
}
