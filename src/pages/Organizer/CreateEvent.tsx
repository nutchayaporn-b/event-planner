import React, { useRef } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { EventType, ILocation } from "../../models/eventModel";
import TextFieldLabel from "../../components/TextFieldLabel";
import FormLabel from "../../components/FormLabel";
import { DatePickerModal } from "react-native-paper-dates";
import BasicButton from "../../components/BasicButton";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useRecoilState } from "recoil";
import { createEventStore } from "../../stores/eventStore";

const initialRegion = {
  latitude: 18.7999965,
  longitude: 98.9498646,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
} as ILocation;

export default function CreateEvent() {
  const navigation = useNavigation();

  const [createEventState, setCreateEventState] = useRecoilState(createEventStore)

  const [typeOfEvent, setTypeOfEvent] = React.useState<EventType>(createEventState?.type || "Regular");
  const [eventName, setEventName] = React.useState(createEventState?.name || "");
  const [description, setDescription] = React.useState(createEventState?.description || "");
  //@ts-ignore
  const [date, setDate] = React.useState<Date | undefined>(createEventState?.date || new Date());
  const [open, setOpen] = React.useState(false);
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const [userPosition, setUserPosition] = React.useState<any>(null);
  const [markerPosition, setMarkerPosition] = React.useState(createEventState?.location || initialRegion);

  React.useEffect(() => {
    if(createEventState?.location) return;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserPosition({
        ...initialRegion,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setMarkerPosition({
        ...initialRegion,
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ ...initialRegion, latitude, longitude });
  };

  const handleGoNext = () => {
    setCreateEventState({
      name: eventName,
      description: description,
      type: typeOfEvent,
      //@ts-ignore
      date: date,
      location: markerPosition
    })
    console.log(createEventState)
    //@ts-ignore
    navigation.navigate('CreateEventImage')
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center mt-10 px-8">
      {/* <ScrollView > */}
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-2 left-8"
      />
      <Text className="text-3xl text-primary-100">Create Event</Text>
      <View className="h-2"></View>
      <Text className="text-xl text-primary-100 self-start font-semibold">
        Type of event
      </Text>
      <View className="flex flex-row items-center self-start mt-2">
        <RadioButton
          value={"Regular"}
          status={typeOfEvent === "Regular" ? "checked" : "unchecked"}
          onPress={() => setTypeOfEvent("Regular")}
        />
        <Text className="text-primary-200 text-[18px]">Regular Event</Text>
        <RadioButton
          value={"Private"}
          status={typeOfEvent === "Private" ? "checked" : "unchecked"}
          onPress={() => setTypeOfEvent("Private")}
        />
        <Text className="text-primary-200 text-[18px]">Private Event</Text>
      </View>
      <View className="self-start flex w-full mt-2">
        <FormLabel
          label="Event Name"
          placeholder=""
          value={eventName}
          setValue={(text: any) => setEventName(text)}
          fullWidth
        />
      </View>
      <View className="self-start flex w-full mt-2">
        <FormLabel
          label="Description"
          placeholder=""
          value={description}
          setValue={(text: any) => setDescription(text)}
          fullWidth
        />
      </View>
      <View className="flex mt-2 self-start">
        <Pressable onPress={() => setOpen(true)}>
          <TextFieldLabel
            label="Event Date"
            value={new Date(date!)?.toDateString()}
            setValue={setDate}
            isEdit={false}
          />
        </Pressable>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
      <View className="flex mt-4 self-start mb-6">
        <Text className="text-primary-200 text-[18px] mb-2">Location</Text>
        <MapView
          className="w-72 h-32"
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          <Marker coordinate={markerPosition} draggable />
        </MapView>
      </View>
      <BasicButton
        textClassName="text-white"
        buttonClassName="px-16 py-2 bg-primary-800 rounded-3xl"
        onClick={() => handleGoNext()}
      >
        Next
      </BasicButton>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
