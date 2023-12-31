import React from "react";
import { View, Text, Pressable } from "react-native";
import BasicButton from "../components/BasicButton";
import { useAuth } from "../contexts/AuthContext";
import IconButton from "../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import ImageUploader from "../components/ImageUploader";
import TextFieldLabel from "../components/TextFieldLabel";
import DateTimePicker from "@react-native-community/datetimepicker";
import { refetchUser, saveFullUser } from "../services/userService";
import Toast from "react-native-root-toast";
import { FullUser } from "../models/userModel";
import { User } from "firebase/auth";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

export default function Profile() {
  const navigation = useNavigation();
  const { user, handleLogout, reValidateUser } = useAuth();

  const [image, setImage] = React.useState(
    user?.photoURL || "https://placehold.co/600x400/png"
  );
  const [isEdit, setIsEdit] = React.useState(false);
  const [firstName, setFirstName] = React.useState(user?.firstName);
  const [lastName, setLastName] = React.useState(user?.lastName);
  const [gender, setGender] = React.useState(user?.gender);

  const [date, setDate] = React.useState<Date | undefined>(
    new Date(user?.dateOfBirth || new Date())
  );
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

  const handleEdit = async () => {
    if (!firstName)
      return Toast.show("First Name cannot be blank", {
        duration: 3000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });

    if (!lastName)
      return Toast.show("Last Name cannot be blank", {
        duration: 3000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });

    if (!gender)
      return Toast.show("Gender cannot be blank", {
        duration: 3000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });

    if (!date)
      return Toast.show("Date cannot be blank", {
        duration: 3000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });

    try {
      const result = await saveFullUser({
        ...user,
        firstName,
        lastName,
        gender,
        dateOfBirth: date?.toDateString() || new Date().toDateString(),
        photoURL: image,
      } as FullUser);
      setIsEdit(false);

      if (!result)
        return Toast.show("Failed to update user", {
          duration: 3000,
          textColor: "red",
          backgroundColor: "white",
          position: Toast.positions.TOP,
        });

      await reValidateUser(user as User);

      Toast.show("Successfully updated user", {
        duration: 3000,
        textColor: "green",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });
    } catch (error: any) {
      console.log(error);
      Toast.show(error.message, {
        duration: 3000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute top-16 left-8"
      />
      <Text className="text-primary-200 text-3xl font-semibold mb-2">
        Profile
      </Text>
      <ImageUploader
        image={image}
        setImage={setImage}
        isEdit={isEdit}
        render={
          <IconButton
            icon={<Entypo name="edit" size={16} color="white" />}
            buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute bottom-2 right-2"
            onPress={() => console.log("imageuploader")}
          />
        }
      />
      {!isEdit && (
        <View className="flex flex-row items-center justify-center mb-3">
          <Text className="text-primary-800 text-lg mr-2">Information</Text>
          <IconButton
            onPress={() => setIsEdit(true)}
            icon={<AntDesign name="edit" size={16} color="black" />}
          />
        </View>
      )}
      <View className="flex justify-center">
        <View className="flex flex-row mb-6">
          <TextFieldLabel
            label="First Name"
            isEdit={isEdit}
            value={firstName}
            setValue={setFirstName}
          />
          <View className="w-12"></View>
          <TextFieldLabel
            label="Last Name"
            isEdit={isEdit}
            value={lastName}
            setValue={setLastName}
          />
        </View>
        <View className="flex mb-5">
          <TextFieldLabel
            label="Gender"
            isEdit={isEdit}
            value={gender}
            setValue={setGender}
          />
        </View>
        <View className="flex mb-5">
          <Pressable onPress={() => isEdit && setOpen(true)}>
            <TextFieldLabel
              label="Date Of Birth"
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
      </View>
      {isEdit ? (
        <BasicButton
          buttonClassName="py-2 w-2/3 bg-primary-800 rounded-3xl flex items-center"
          textClassName="text-xl text-white"
          onClick={() => handleEdit()}
        >
          Confirm
        </BasicButton>
      ) : (
        <BasicButton
          buttonClassName="py-2 w-2/3 bg-primary-800 rounded-3xl flex items-center"
          textClassName="text-xl text-white"
          onClick={() => handleLogout()}
        >
          Logout
        </BasicButton>
      )}
    </SafeAreaView>
  );
}
