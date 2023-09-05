import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth from "./hooks/useAuth";
import ModalScreen from "./screens/ModalScreen";
import MatchedScreen from "./screens/MatchedScreen";
import MessageScreen from "./screens/MessageScreen";

const stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      {user !== null ? (
        <>
          <stack.Screen name="Home" component={HomeScreen} />
          <stack.Screen name="Chat" component={ChatScreen} />
          <stack.Screen name="Modal" component={ModalScreen} />
          <stack.Screen name="Match" component={MatchedScreen} />
          <stack.Screen name="Message" component={MessageScreen} />
        </>
      ) : (
        <stack.Screen name="Login" component={LoginScreen} />
      )}
    </stack.Navigator>
  );
};

export default StackNavigator;
