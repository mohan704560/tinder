import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (userInfo) => {
    setUser(userInfo);
  };
  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("@user");
      // await auth.revokeRefreshTokens(userInfo.uid);
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  const checkLocalUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUser(userData);
    } catch (e) {
      // Alert(e.massage);
    }
  };

  const memoedValue = useMemo(() => ({ user, login, logout }), [user]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (userInfo) => {
      if (userInfo) {
        setUser(userInfo);
        await AsyncStorage.setItem("@user", JSON.stringify(userInfo));
      }
    });
    checkLocalUser();
    return () => unsub();
  },[]);

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
