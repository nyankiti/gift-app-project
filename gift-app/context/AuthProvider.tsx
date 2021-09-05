import React, { createContext, useState } from "react";
// import auth from '@react-native-firebase/auth';
import firebase from "firebase/app";
import { auth, db, FirebaseTimestamp, getUser } from "../libs/firebae";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types/user";

type AuthContextValue = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  login: (email: string, password: string, navigation: any) => void;
  register: (
    email: string,
    password: string,
    name: string,
    navigation: any
  ) => void;
  logout: (navigation: any) => void;
};

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest?.extra?.firebase);
}

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        login: async (email, password, navigation) => {
          console.log(email);
          try {
            await auth
              .signInWithEmailAndPassword(email.trim(), password.trim())
              .then(async (user) => {
                if (user.user?.uid) {
                  // user情報をcontextへ保存
                  getUser(user.user?.uid, setUser);
                  // local storageへuidの保存
                  try {
                    await AsyncStorage.setItem("uid", user.user?.uid);
                  } catch (e) {
                    console.log(e);
                  }
                  navigation.navigate("SeatBookingScreen");
                }
              });
          } catch (e) {
            console.log(e);
            return false;
          }
        },
        register: async (email, password, userName, navigation) => {
          try {
            await auth
              .createUserWithEmailAndPassword(email.trim(), password.trim())
              .then(async (user) => {
                // displayNameに名前の登録(firebase authenticationで管理される名前)
                user.user
                  ?.updateProfile({
                    displayName: userName,
                  })
                  .then(() => {
                    // displayNameの追加に成功
                  })
                  .catch((error: any) => {
                    console.log(error);
                  });
                // auth側と紐づくようにfirestoreにもデータを登録しておく
                const userInitialData = {
                  uid: auth.currentUser?.uid,
                  displayName: userName,
                  fname: "",
                  lname: "",
                  email: email,
                  createdAt: FirebaseTimestamp.now(),
                  updatedAt: FirebaseTimestamp.now(),
                  userImg: null,
                };

                // local storageへのuidの保存
                if (user.user?.uid) {
                  try {
                    await AsyncStorage.setItem("uid", user.user?.uid);
                  } catch (e) {
                    console.log(e);
                  }
                }
                // firestoreへの登録
                db.collection("users")
                  .doc(auth.currentUser?.uid)
                  .set(userInitialData);

                navigation.navigate("SeatBookingScreen");
              })
              .catch((error) => {
                console.log(
                  "Something went wrong with added user to firestore: ",
                  error
                );
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async (navigation) => {
          try {
            await auth.signOut();
            // local storageからのuidの消去
            await AsyncStorage.removeItem("uid");
            setUser({ uid: "00000", displayName: "ゲストユーザー" });
            navigation.navigate("SignInScreen");
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
