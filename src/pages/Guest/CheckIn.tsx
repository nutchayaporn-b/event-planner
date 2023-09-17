import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconButton from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import SvgQRCode from "react-native-qrcode-svg";
import { useRecoilState } from "recoil";
import { selectEventStore } from "../../stores/eventStore";
import BasicButton from "../../components/BasicButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import { checkInEventService } from "../../services/eventService";
import { useAuth } from "../../contexts/AuthContext";
export default function CheckIn() {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [selectEventState, setSelectEventState] = useRecoilState(selectEventStore);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    if(data == selectEventState?.code) {
      await checkInEventService(selectEventState as any, user?.uid as string);
      alert(`Check in successful!`);
      navigation.navigate("Guest/ViewEvent" as never);
    }
    else {
      alert(`Invalid QR Code! Please try again.`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="left" size={24} color="white" />}
        buttonClassName="px-2 py-2 bg-primary-800 rounded-full absolute z-[9999] top-16 left-8"
      />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <BasicButton textClassName="text-white" buttonClassName="bg-primary-800 px-8 py-2 rounded-2xl" onClick={() => setScanned(false)}>Tap to Scan Again</BasicButton>}
    </SafeAreaView>
  );
}
