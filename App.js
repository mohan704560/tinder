// import { NavigationContainer } from "@react-navigation/native";
// import { useEffect, useState } from "react";
// import { TouchableOpacity, Text, SafeAreaView, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   onAuthStateChanged,
//   signInWithCredential,
//   signOut,
// } from "@firebase/auth";
// import { auth } from "./firebaseConfig";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {
//   const [userInfo, setUserInfo] = useState("");
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId:
//       "731313467802-pq2i1ovn1qgfnfr53i9opsg7ln5ctbcf.apps.googleusercontent.com",
//     iosClientId:
//       "731313467802-pp50gotugrup1sme98lmg9lm555l9moo.apps.googleusercontent.com",
//   });

//   const checkLocalUser = async () => {
//     try {
//       const userJSON = await AsyncStorage.getItem("@user");
//       const userData = userJSON ? JSON.parse(userJSON) : null;
//       setUserInfo(userData);
//     } catch (e) {
//       Alert(e.massage);
//     }
//   };

//   const firebaseSignin = async () => {
//     try {
//       if (response?.type === "success") {
//         const { id_token } = response.params;
//         const credential = GoogleAuthProvider.credential(id_token);
//         const res = await signInWithCredential(auth, credential);
//         console.log("res", res);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const googleSignOut = async () => {
//     try {
//       await signOut(auth);
//       await AsyncStorage.removeItem("@user");
//       // await auth.revokeRefreshTokens(userInfo.uid);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     firebaseSignin();
//     checkLocalUser();
//   }, [response]);

//   useEffect(() => {
//     return (unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         console.log("userInfo logged", JSON.stringify(user, null, 2));
//         // setUserInfo(user);
//         await AsyncStorage.setItem("@user", JSON.stringify(user));
//       } else console.log("google login not found");
//     }));
//   });

//   return (
//     <SafeAreaView>
//       <TouchableOpacity onPress={() => promptAsync()}>
//         <Text>Sign in & get swipe</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={googleSignOut}>
//         <Text>Sign Out</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
