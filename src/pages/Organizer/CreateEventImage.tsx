import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageUploader from "../../components/ImageUploader";
import ImageUploader2 from "../../components/ImageUploader2";
import BasicButton from "../../components/BasicButton";
import { useRecoilState } from "recoil";
import { createEventStore } from "../../stores/eventStore";
import { createEvent } from "../../services/eventService";
import { useAuth } from "../../contexts/AuthContext";
import { EventModel } from "../../models/eventModel";
import Toast from "react-native-root-toast";
import { useQueryClient } from "@tanstack/react-query/build/lib/QueryClientProvider";
import * as Location from "expo-location";
import { schedulePushNotification } from "../../utils/noti";

export default function CreateEventImage() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {user} = useAuth()
  const [image, setImage] = useState("");
  const [createEventState, setCreateEventState] =
    useRecoilState(createEventStore);

    const [location, setLocation] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        if(!createEventState) return
  
        let position = (
          await Location.reverseGeocodeAsync({
            latitude: createEventState.location?.latitude as number,
            longitude: createEventState.location?.longitude as number,
          })
        )[0];
        setLocation((position.city || position.region) + ", " + (position.district ? position.district  + ", " : "") + position.name + ", " + position.postalCode);
      })();
    }, []);

  const handleConfirm = async () => {
    try{
      const newEventId = await createEvent({...createEventState, image, locationName: location}, user?.uid as string)
      Toast.show(
        "Create event id: " + newEventId,
        {
          duration: 3000,
          textColor: "green",
          backgroundColor: "white",
          position: Toast.positions.TOP,
        }
      );
      schedulePushNotification("Event created", "Your event has been created " + createEventState?.name, null, 2);
      setCreateEventState(null);
      queryClient.invalidateQueries(['events'])
      //@ts-ignore
      return navigation.navigate('Organizer');
    }catch(error:any){
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center mt-10 px-8">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-[40px] left-8"
      />
      <Text className="text-3xl text-primary-100">Create Event</Text>
      <ImageUploader2
        image={image}
        setImage={setImage}
        render={
          <View className="flex w-4/5 min-h-[450px] items-center justify-center">
            <Ionicons name="add" size={128} color="#9E9A96" />
            <Text className="text-primary-100 text-3xl">Add Event Image</Text>
          </View>
        }
      />
      <BasicButton
        buttonClassName="bg-primary-800 px-4 py-2 rounded-3xl"
        textClassName="text-white text-xl"
        onClick={handleConfirm}
      >
        Confirm
      </BasicButton>
    </SafeAreaView>
  );
}
