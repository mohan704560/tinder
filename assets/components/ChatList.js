import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import useAuth from "../../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  const matchedData = async () => {
    try {
      const q = query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setMatches([...matches, { id: doc.id, ...doc.data() }]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    matchedData();
  }, []);

  return matches.length > 0 ? (
    <FlatList 
    className="h-full"
    data={matches}
    keyExtractor={item=> item.id}
    renderItem={({item})=><ChatRow matchDetails={item} />}
    />
  ) : (
    <View className="p-5">
      <Text className="text-center text-lg">No matches at the moment</Text>
    </View>
  );
};

export default ChatList;
