import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
// import RNFetchBlob from 'react-native-fetch-blob';
import Constants from "expo-constants";
import { User } from "../types/user";
import {
  getExtension,
  formatDateUntilMinute,
  formatDateUntilDay,
} from "./utils/file";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest?.extra?.firebase);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;

/* docRefrences  user情報を含むdocrefはここでは定義できない.... */
export const seatDocRef = db.collection("seat").doc(formatDateUntilDay());

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
  const userDocRef = db.collection("users").doc(uid);
  await userDocRef.get().then(async (documentSnapshot: any) => {
    if (documentSnapshot.exists) {
      setUser(documentSnapshot.data());
    }
  });
};

export const uploadImageToStorage = async (
  image: any,
  user: User,
  setTransferred: React.Dispatch<React.SetStateAction<number>>,
  setImage: React.Dispatch<React.SetStateAction<any>>
) => {
  if (image == "") {
    return null;
  }

  const uploadUri = image;
  const extension = getExtension(uploadUri);
  const date_for_filename = formatDateUntilMinute();
  const filename = date_for_filename + "." + extension;
  console.log(filename);

  let storagePath = `users/${user.uid}.${extension}`;

  const tempUri = await fetch(uploadUri);
  const blob = await tempUri.blob();

  const storageRef = storage.ref(storagePath);

  const task = storageRef.put(blob);
  // const downloadUrl = await uploadImage(imageUri, storagePath);
  task.on("state_changed", (taskSnapshot) => {
    setTransferred(
      Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    );
  });

  try {
    await task;

    const urlOfFireStorage = storageRef.getDownloadURL();

    setImage(null);

    return urlOfFireStorage;
  } catch (e) {
    console.log(e);
    return null;
  }
};
