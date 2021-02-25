import React, {createContext, useState} from 'react';
// import auth from '@react-native-firebase/auth';
import * as firebase from 'firebase';
import { auth, db, FirebaseTimestamp } from '../src/firebase';
import Constants from "expo-constants";

import { User, AuthContextProps } from '../types';



if(!firebase.apps.length){
  firebase.initializeApp(Constants.manifest.extra.firebase);
};

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState<User>();

  return ( 
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async( email, password ) => {
          try{
            await auth.signInWithEmailAndPassword(email.trim(), password.trim());
          }catch(e){
            console.log(e);
          }
        },
        register: async (email, password) => {
          try{
            await auth.createUserWithEmailAndPassword(email.trim(), password.trim())
            // auth側と紐づくようにfirestoreにもデータを登録しておく
            .then(() => {
              const userInitialData = {
                uid: auth.currentUser.uid,
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