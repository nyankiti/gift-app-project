import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/storage';
import 'firebase/functions';
// import RNFetchBlob from 'react-native-fetch-blob';
import Constants from "expo-constants";


/*  types */
import { User } from '../types';


/* 
firebaseConfigの値をここにそのまま書くのはセキュリティー的に良くないので
expo-constantsというパッケージを用いてコマンドラインから入力して管理する

*/

// ここで初期化することでreactの中でfirebaseが使えるようになる
if(!firebase.apps.length){
  firebase.initializeApp(Constants.manifest.extra.firebase);
};


// 各firebaseのメソッドをいちいち呼び出すのは冗長なので先に呼び出してexportしておく
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;


const getUser = async(props) => {
  await db.collection('users').doc(props.uid).get()
    .then(async(documentSnapshot) => {
      if(documentSnapshot.exists){
        props.setUserData(documentSnapshot.data());
      }
    })
}



export const getUsers = async() => {
  const snapshot = await firebase.firestore().collection("users").get();
  const users = snapshot.docs.map(doc => doc.data() as User);

  return users;
};


export const updateUserRef = async (userId: string) =>{
  return await firebase.firestore().collection('users').doc(userId);
};

export const uploadImage = async (uri: string, path: string) => {
  // api通信のためのfetch関数を用いる
  // jQuery ajax,get()で代用できる関数だが、少しfetchの方が便利？
  // オリジン間のリソースの共有(CROS Cross-Origin Resource Sharing)であるのでSame-Origin Policyに従う必要がある(mode: 'corsを指定する)
  // const localUri = await fetch(uri, {mode: 'cors', credentials: 'include'});
  const localUri = await fetch(uri);


  console.log(localUri);
  console.log(uri);
  // firestorageでは画像はblob形式にして軽い状態で保存するのが良い
  const blob = await localUri.blob();

  // storageにアップロードする
  const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";
  try{
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  }catch(err){
    console.log(err);
  }
  return downloadUrl;
}