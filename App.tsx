import React, { useCallback, useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
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

import ViewEvent from "./src/pages/Guest/ViewEvent";
import RegisterEvent from "./src/pages/Guest/RegisterEvent";
import GuestCheckIn from "./src/pages/Guest/CheckIn";
import GuestDonate from "./src/pages/Guest/Donate";
import GuestMessage from "./src/pages/Guest/Message";
import SeeAllMessages from "./src/pages/Organizer/SeeAllMessages";
import EditEvent from "./src/pages/Organizer/EditEvent";
import EditEventImage from "./src/pages/Organizer/EditEventImage";
import Agenda from "./src/pages/Organizer/Agenda";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

registerTranslation("en", en);

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
  const [appIsReady, setAppIsReady] = useState(false);

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
