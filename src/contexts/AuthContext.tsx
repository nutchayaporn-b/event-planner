import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { User, UserCredential, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

// Define the types for the AuthContext
type AuthContextType = {
  user: User | null;
  handleRegister: (username: string, password: string) => void;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  handleRegister: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

// Implement the AuthProvider component
export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  // Check if the user is already logged in
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const storedUser = JSON.parse((await AsyncStorage.getItem("user")) || "{}");
        if (storedUser) {
          setUser(storedUser);
          //@ts-ignore
          navigation.navigate('Home')
        }
      } catch (error) {
        console.error("Error retrieving user from AsyncStorage:", error);
      }
    };
    checkLoggedInUser();
  }, []);

  const handleRegister = (email: string, password: string) => {
    if(!email) return Toast.show("Email cannot be empty", {duration: 1000, textColor: 'red', backgroundColor:'white', position: Toast.positions.TOP})
    if(!password) return Toast.show("Password cannot be empty", {duration: 1000, textColor: 'red', backgroundColor:'white', position: Toast.positions.TOP})
    createUserWithEmailAndPassword(auth, email, password).then((userCredential:UserCredential) => {
      const user = userCredential.user;
      if(user.emailVerified === false) {
        return sendEmailVerification(user).then(() => {
          return Toast.show('Please verify your email sent to: ' + user.email, {duration:3000, textColor: 'green', backgroundColor:'white', position: Toast.positions.TOP})
        })
      }
      Toast.show('Successfully register your account', {duration:1000, textColor: 'green', backgroundColor:'white', position: Toast.positions.TOP})
    }).catch((error:any) => {
      console.log(error)
      Toast.show(error.message, {duration: 3000, textColor: 'red', backgroundColor:'white', position: Toast.positions.TOP})
    })
  }

  // Login function
  const handleLogin = (email: string, password: string) => {
    if (!email)
      return Toast.show("Email cannot be empty", {
        duration: 1000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });
    if (!password)
      return Toast.show("Password cannot be empty", {
        duration: 1000,
        textColor: "red",
        backgroundColor: "white",
        position: Toast.positions.TOP,
      });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user.emailVerified === false) {
          return sendEmailVerification(user)
            .then(() => {
              return Toast.show("Please verify your email! sent to: " + user.email, {
                duration: 3000,
                textColor: "red",
                backgroundColor: "white",
                position: Toast.positions.TOP,
              });
            })
            .catch((error: any) => {
              console.log(error);
              return Toast.show(error.message, {
                duration: 3000,
                textColor: "red",
                backgroundColor: "white",
                position: Toast.positions.TOP,
              });
            });
        }
        AsyncStorage.setItem("user", JSON.stringify(user))
          .then(() => {
            setUser(user);
            Toast.show("Welcome: " + user.email, {
              duration: 1000,
              textColor: "green",
              backgroundColor: "white",
              position: Toast.positions.TOP,
            });
          })
          .catch((error) => console.error("Error storing user in AsyncStorage:", error));
        //@ts-ignore
        navigation.navigate("Home");
      })
      .catch((error: any) => {
        console.log(error);
        Toast.show(error.message, {
          duration: 3000,
          textColor: "red",
          backgroundColor: "white",
          position: Toast.positions.TOP,
        });
      });
  };

  // Logout function
  const handleLogout = () => {
    // Clear the stored user from AsyncStorage
    AsyncStorage.removeItem("user")
      .then(() => {
        setUser(null);
        Toast.show("Successfully logout!", {
          duration: 1000,
          textColor: "green",
          backgroundColor: "white",
          position: Toast.positions.TOP,
        });
      })
      .catch((error) => console.error("Error removing user from AsyncStorage:", error));
  };

  return <AuthContext.Provider value={{ user, handleRegister, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

// Custom hook to access the AuthContext in components
export const useAuth = (): AuthContextType => useContext(AuthContext);
