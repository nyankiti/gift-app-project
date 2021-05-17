import React, {createContext, useState} from 'react';
// import auth from '@react-native-firebase/auth';
import firebase from 'firebase/app';
import { auth, db, FirebaseTimestamp } from '../src/firebase';
import Constants from "expo-constants";


import { User } from '../types';


type AuthContextValue = {
  user: User| null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
}

if(!firebase.apps.length){
  firebase.initializeApp(Constants.manifest.extra.firebase);
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState<User>();

  return ( 
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        login: async( email, password ) => {
          try{
            await auth.signInWithEmailAndPassword(email.trim(), password.trim())
              .then(() => {
                // setUser
              })
          }catch(e){
            console.log(e);
            return false;
          }
        },
        register: async (email, password, userName) => {
          try{
            await auth.createUserWithEmailAndPassword(email.trim(), password.trim())
            .then((user) => {
            // displayNameに名前の登録(firebase authenticationで管理される名前) 
              user.user.updateProfile({
                displayName: userName
              }).then(() => {
                // displayNameの追加に成功
              }).catch((error: any) => {
                console.log(error);
              })
            // auth側と紐づくようにfirestoreにもデータを登録しておく
              const userInitialData = {
                uid: auth.currentUser.uid,
                displayName: userName,
                fname: '',
                lname: '',
                email: email,
                createdAt: FirebaseTimestamp.now(),
                updatedAt: FirebaseTimestamp.now(),
                userImg: null
              };

              db.collection('users').doc(auth.currentUser.uid).set(userInitialData);
            }).catch(error => {
              console.log("Something went wrong with added user to firestore: ", error)
            })
          }catch(e){
            console.log(e);
          }
        },
        logout: async () => { 
          try{
            await auth.signOut();
          }catch(e){
            console.log(e)
          }
        },
      }}
    
    >
      {children}
    </AuthContext.Provider>
  )
}