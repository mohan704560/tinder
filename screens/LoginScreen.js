import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import * as webBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

webBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "731313467802-pq2i1ovn1qgfnfr53i9opsg7ln5ctbcf.apps.googleusercontent.com",
    iosClientId:
      "731313467802-pp50gotugrup1sme98lmg9lm555l9moo.apps.googleusercontent.com",
  });

  const firebaseSignin = async () => {
    try {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const res = await signInWithCredential(auth, credential);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    firebaseSignin();
  }, [response]);


  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
          style={{ marginHorizontal: "25%" }}
          onPress={() => promptAsync()}
        >
          <Text className="font-semibold text-center">Sign in & get swipe</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
