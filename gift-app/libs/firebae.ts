import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
// import RNFetchBlob from 'react-native-fetch-blob';
import Constants from "expo-constants";
import { User } from "../types/user";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest?.extra?.firebase);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;

// export const getUser = async (
//   user: User,
//   setUser: any
//   // setUser: React.Dispatch<React.SetStateAction<User>>
// ) => {
//   await db
//     .collection("users")
//     .doc(user?.uid)
//     .get()
//     .then(async (documentSnapshot: any) => {
//       if (documentSnapshot.exists) {
//         setUser(documentSnapshot.data());
//       }
//     });
// };

export const getUser = async (
  uid: string,
  setUser: any
  // setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  await db
    .collection("users")
    .doc(uid)
    .get()
    .then(async (documentSnapshot: any) => {
      if (documentSnapshot.exists) {
        setUser(documentSnapshot.data());
      }
    });
};
