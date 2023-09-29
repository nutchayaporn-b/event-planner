import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { config } from "./config";
import { AuthProvider } from "./src/contexts/AuthContext";
import Profile from "./src/pages/Profile";
import Home from "./src/pages/Home";
import Guest from "./src/pages/Guest";
import Organizer from "./src/pages/Organizer";
import CreateEvent from "./src/pages/Organizer/CreateEvent";
import { en, registerTranslation } from "react-native-paper-dates";
import Donate from "./src/pages/Organizer/Donate";
import { RecoilRoot } from "recoil";
import CreateEventImage from "./src/pages/Organizer/CreateEventImage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageEvent from "./src/pages/Organizer/ManageEvent";
import CheckIn from "./src/pages/Organizer/CheckIn";
import JoinEvent from "./src/pages/JoinEvent";
import SeeAllGuests from "./src/pages/Organizer/SeeAllGuests";
import SeeAllDonates from "./src/pages/Organizer/SeeAllDonates";
import ViewDonation from "./src/pages/Organizer/ViewDonation";
import SeeAllMessages from "./src/pages/Organizer/SeeAllMessages";
import EditEvent from "./src/pages/Organizer/EditEvent";
import EditEventImage from "./src/pages/Organizer/EditEventImage";
import Agenda from "./src/pages/Organizer/Agenda";

import ViewEvent from "./src/pages/Guest/ViewEvent";
import RegisterEvent from "./src/pages/Guest/RegisterEvent";
import GuestCheckIn from "./src/pages/Guest/CheckIn";
import GuestDonate from "./src/pages/Guest/Donate";
import GuestMessage from "./src/pages/Guest/Message";
import GuestAgenda from "./src/pages/Guest/Agenda";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

registerTranslation("en", en);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token ?? ""));

    //@ts-ignore
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      //@ts-ignore
      setNotification(notification);
    });

    //@ts-ignore
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
    
    return () => {
      //@ts-ignore
      Notifications.removeNotificationSubscription(notificationListener.current);
      //@ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <NavigationContainer onReady={onLayoutRootView}>
              <AuthProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen name="JoinEvent" component={JoinEvent} />
                  <Stack.Screen name="Guest" component={Guest} />
                  <Stack.Screen
                    name="Guest/RegisterEvent"
                    component={RegisterEvent}
                  />
                  <Stack.Screen name="Guest/CheckIn" component={GuestCheckIn} />
                  <Stack.Screen name="Guest/Donate" component={GuestDonate} />
                  <Stack.Screen name="Guest/Message" component={GuestMessage} />
                  <Stack.Screen name="Guest/ViewEvent" component={ViewEvent} />
                  <Stack.Screen name="Guest/Agenda" component={GuestAgenda} />
                  <Stack.Screen name="Organizer" component={Organizer} />
                  <Stack.Screen
                    name="Organizer/CreateEvent"
                    component={CreateEvent}
                  />
                  <Stack.Screen name="Organizer/Donate" component={Donate} />
                  <Stack.Screen
                    name="Organizer/CreateEventImage"
                    component={CreateEventImage}
                  />
                  <Stack.Screen
                    name="Organizer/ManageEvent"
                    component={ManageEvent}
                  />
                  <Stack.Screen name="Organizer/CheckIn" component={CheckIn} />
                  <Stack.Screen
                    name="Organizer/SeeAllGuests"
                    component={SeeAllGuests}
                  />
                  <Stack.Screen
                    name="Organizer/SeeAllDonates"
                    component={SeeAllDonates}
                  />
                  <Stack.Screen
                    name="Organizer/ViewDonation"
                    component={ViewDonation}
                  />
                  <Stack.Screen
                    name="Organizer/Message"
                    component={SeeAllMessages}
                  />
                  <Stack.Screen
                    name="Organizer/EditEvent"
                    component={EditEvent}
                  />
                  <Stack.Screen
                    name="Organizer/EditEventImage"
                    component={EditEventImage}
                  />
                  <Stack.Screen
                    name="Organizer/Agenda"
                    component={Agenda}
                  />
                </Stack.Navigator>
              </AuthProvider>
            </NavigationContainer>
          </TouchableWithoutFeedback>
        </RootSiblingParent>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: "your-project-id" })).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
