import React, { useCallback, useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { config } from "./config";
import { AuthProvider } from "./src/contexts/AuthContext";
import Profile from "./src/pages/Profile";
import Home from "./src/pages/Home";
import Guest from "./src/pages/Guest";
import Organizer from "./src/pages/Organizer";
import CreateEvent from "./src/pages/CreateEvent";

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

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

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
    <RootSiblingParent>
      <NavigationContainer onReady={onLayoutRootView}>
        <AuthProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Guest" component={Guest} />
            <Stack.Screen name="Organizer" component={Organizer} />
            <Stack.Screen name="CreateEvent" component={CreateEvent} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
