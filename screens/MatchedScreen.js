import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedProfile, userSwiped } = params;

  return (
    <View className="h-full bg-red-500 pt-20" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-20">
        <Image
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
          alt="matchPic"
          className="h-16 w-full"
        />
      </View>
      <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have linked each other.
      </Text>
      <View className="flex-row justify-evenly mt-5">
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: loggedProfile.photoURL }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <TouchableOpacity
        className="bg-white m-5 px-10 py-6 rounded-full mt-20"
        onPress={() => {
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
