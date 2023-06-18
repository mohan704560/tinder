import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  collection,
  setDoc,
  addDoc,
  where,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import generatedId from "../lib/generateId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swiperRef = useRef(null);
  const [profile, setProfile] = useState([]);

  useLayoutEffect(() => {
    unsub();
    fetchCards();
  }, []);

  const unsub = async () => {
    try {
      const data = await getDoc(doc(db, "users", user.uid));
      if (!data.exists()) {
        navigation.navigate("Modal");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCards = async () => {
    const passedUserId = ["test"];
    const swipedUserId = ["test"];
    let profiles = [];
    let passesCollections = await getDocs(
      collection(db, "users", user.uid, "passes")
    );
    passesCollections.forEach((doc) => passedUserId.push(doc.id));
    let swipedCollections = await getDocs(
      collection(db, "users", user.uid, "swipes")
    );
    swipedCollections.forEach((doc) => swipedUserId.push(doc.id));

    try {
      const dataCollections = await getDocs(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserId, ...swipedUserId])
        )
      );
      dataCollections.forEach((doc) => {
        if (doc.id !== user.uid) profiles.push({ ...doc.data() });
      });
      setProfile(profiles);
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const swipeLeft = async (cardIndex) => {
    if (!profile[cardIndex]) return;

    let userSwiped = profile[cardIndex];
    try {
      const passesRef = doc(db, "users", user.uid, "passes", userSwiped.id);
      await setDoc(passesRef, userSwiped);
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const swipeRight = async (cardIndex) => {
    if (!profile[cardIndex]) return;

    let userSwiped = profile[cardIndex];
    const loggedProfile = (await getDoc(doc(db, "users", user.uid))).data();
    // check if the user swiped on you...
    let myProfile = (await getDoc(
      doc(db, "users", userSwiped.id, "swipes", user.uid)
    )).data();
    if (myProfile) {
      // userhas matched with you before you matched with them...

      const passesRef = doc(db, "users", user.uid, "swipes", userSwiped.id);
      await setDoc(passesRef, userSwiped);
      //create a match!!
      setDoc(doc(db, "matches", generatedId(user.uid, userSwiped.id)), {
        users: {
          [user.uid]: loggedProfile,
          [userSwiped.id]: userSwiped,
        },
        usersMatched: [user.uid, userSwiped.id],
        timeStamp: serverTimestamp(),
      });
      navigation.navigate("Match", { loggedProfile, userSwiped });
    } else {
      // User has swiped as first interation between the two or didn't get swiped on

      try {
        const passesRef = doc(db, "users", user.uid, "swipes", userSwiped.id);
        await setDoc(passesRef, userSwiped);
      } catch (e) {
        console.log("e :>> ", e);
      }
    }
  };

  const data = [
    {
      id: 1,
      displayName: "Akshay Kumar",
      photoURL:
        "https://images.indulgexpress.com/uploads/user/imagelibrary/2018/11/29/original/Akshay-Kumar.jpg",
      job: "Actor",
      age: 55,
    },
    {
      id: 2,
      displayName: "Aamir Khan",
      photoURL:
        "https://www.youngisthan.in/wp-content/uploads/2016/09/Aamir-Khan.jpg",
      job: "Actor",
      age: 52,
    },
    {
      id: 3,
      displayName: "Imran Khan",
      photoURL:
        "https://www.hdnicewallpapers.com/Walls/Big/Imran%20Khan/Popular_Bollywood_Actor_Imran_Khan_HD_Images.jpg",
      job: "Actor",
      age: 32,
    },
    {
      id: 4,
      displayName: "Ranbir Kapoor",
      photoURL:
        "https://imagevars.gulfnews.com/2019/06/11/190611-Ranbir-Kapoor_16b46a41ffd_large.jpg",
      job: "Actor",
      age: 35,
    },
    {
      id: 5,
      displayName: "Ritik Roshan",
      photoURL:
        "https://filmfare.wwmindia.com/content/2020/jul/hrithikroshanadvice11594033698.jpg",
      job: "Actor",
      age: 45,
    },
    {
      id: 6,
      displayName: "Shahrukh Khan",
      photoURL:
        "https://enews.hamariweb.com/wp-content/uploads/2020/09/shahrukh-khan.png",
      job: "Actor",
      age: 52,
    },
    {
      id: 7,
      displayName: "Shushant Rajput",
      photoURL:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https:%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F06%2F14%2FSushant-Singh-Rajput-.jpg",
      job: "Actor",
      age: 35,
    },
    {
      id: 8,
      displayName: "Aiswarya Rai",
      photoURL:
        "https://cdn.britannica.com/75/124975-050-32A8692C/Aishwarya-Bachchan-Rai.jpg",
      job: "Actor",
      age: 45,
    },
    {
      id: 9,
      displayName: "Priyanka Chopera",
      photoURL:
        "https://www.hdwallpapers.in/thumbs/2017/priyanka_chopra_bollywood_2017-t2.jpg",
      job: "Actor",
      age: 42,
    },
    {
      id: 10,
      displayName: "Alia Bhatt",
      photoURL: "https://images.indianexpress.com/2021/07/Alia-Bhatt-1200.jpeg",
      job: "Actor",
      age: 32,
    },
    {
      id: 11,
      displayName: "Dipika Padukone",
      photoURL:
        "https://www.filmibeat.com/wimg/desktop/2019/07/deepika-padukone_12.jpg",
      job: "Actor",
      age: 35,
    },
    {
      id: 12,
      displayName: "Samantha Prabhu",
      photoURL:
        "https://www.filmibeat.com/ph-big/2017/09/samantha-ruth-prabhu-unseen-photos_150642296750.jpg",
      job: "Actor",
      age: 35,
    },
    {
      id: 13,
      displayName: "Kareena Kapoor",
      photoURL:
        "https://www.masala.com/cloud/2021/07/27/Nar1ooOo-Kareena-Kapoor.jpg-5.jpg",
      job: "Actor",
      age: 50,
    },
    {
      id: 14,
      displayName: "Ananya Panday",
      photoURL:
        "https://media.vogue.in/wp-content/uploads/2019/12/ananya-panday-2-1920x1080.jpg",
      job: "Actor",
      age: 24,
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      {/* header */}
      <View className="items-center flex-row justify-between px-5">
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
        >
          <Image
            source={{ uri: user.photoURL }}
            className="h-10 w-10 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            className="h-14 w-14"
            source={require("../assets/tinder_logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#ff5864" />
        </TouchableOpacity>
      </View>

      {/* End of header */}
      {/* chat */}
      <View className="flex-1 -mt-6">
        {profile.length > 0 && (
          <Swiper
            ref={swiperRef}
            containerStyle={{ backgroundColor: "transparent" }}
            stackSize={7}
            cards={profile}
            cardIndex={0}
            animateCardOpacity
            infinite={true}
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              swipeRight(cardIndex);
            }}
            backgroundColor="#4FD0E9"
            overlayLabels={{
              left: {
                title: "NOPE",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "MATCH",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) => {
              return card ? (
                <View className="relative bg-white h-3/4 rounded-xl">
                  <Image
                    className="absolute top-0 h-full w-full rounded-xl"
                    source={{ uri: card.photoURL }}
                  />
                  <View className="absolute flex-row bottom-0 bg-white w-full justify-between items-center h-20 px-6 py-2 rounded-b-xl shadow-xl">
                    <View>
                      <Text className="text-xl font-bold">
                        {card.displayName}
                      </Text>
                      <Text>{card.job}</Text>
                    </View>
                    <Text className="text-2xl font-bold">{card.age}</Text>
                  </View>
                </View>
              ) : (
                <View className="relative bg-white h-3/4 rounded-xl justify-center items-center">
                  <Text className="font-bold pb-5">No more profiles</Text>
                  <Image
                    className="h-20 w-20"
                    source={{ uri: "https://links.papareact.com/6gb" }}
                  />
                </View>
              );
            }}
          />
        )}
      </View>
      <View className="flex flex-row justify-evenly mb-4">
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          onPress={() => swiperRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => swiperRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
