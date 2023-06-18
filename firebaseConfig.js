// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUlAZ0CkhsxPZe_3tHTZ_K-Z4ZIxrFWiQ",
  authDomain: "tinder2-26c31.firebaseapp.com",
  projectId: "tinder2-26c31",
  storageBucket: "tinder2-26c31.appspot.com",
  messagingSenderId: "591979176083",
  appId: "1:591979176083:web:6ae36dd0a9fd94c3186d66",
  measurementId: "G-BPL396CT3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// iosClientID : 731313467802-pp50gotugrup1sme98lmg9lm555l9moo.apps.googleusercontent.com
// androidClientID : 731313467802-pq2i1ovn1qgfnfr53i9opsg7ln5ctbcf.apps.googleusercontent.com