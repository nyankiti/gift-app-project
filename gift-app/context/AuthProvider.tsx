import React, { createContext, useState } from "react";
// import auth from '@react-native-firebase/auth';
import firebase from "firebase/app";
import { auth, db, FirebaseTimestamp, getUser } from "../libs/firebae";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "../types/user";

type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
};

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest?.extra?.firebase);
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({
    uid: "00000",
    displayName: "ゲストユーザー",
  });

  const login = async (email: string, password: string) => {
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
          }
        });
    } catch (e) {
      console.log("something went wrong in login precess :" + e);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    userName: string
  ) => {
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
            email: email,
            createdAt: FirebaseTimestamp.now(),
            updatedAt: FirebaseTimestamp.now(),
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
          await db
            .collection("users")
            .doc(auth.currentUser?.uid)
            .set(userInitialData);

          // Authcontextの更新
          setUser(userInitialData);
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
  };

  const logout = async () => {
    try {
      await auth.signOut();
      // local storageからのuidの消去
      await AsyncStorage.removeItem("uid");
      setUser({ uid: "00000", displayName: "ゲストユーザー" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
