// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// exports.calcClockLotation =  functions.region("asia-northeast1").firestore
//   .document("users/{userId}/seat/{documentId}").onWrite(async(snapshot, context) => {  

//     const beforeData = snapshot.before.data();
//     console.log(beforeData);
//     // const afterData = snapshot.after.data();
//     // console.log(afterData);

//     // const userId = context.params.userId;
//     // const documentId = context.params.documentId;

//     // console.log(userId);
//     // console.log(documentId);

//     // const goalsDocRef =  admin.firestore().collection('users').doc(userId).collection('goals').doc(documentId);
//     // try{
//     //   await goalsDocRef.get().then(async(snapshot) => {
//     //     if(snapshot.exists){
//     //       console.log(snapshot.data());
//     //     }
//     //   })
//     // }catch(e){
//     //   console.log('エラーだよ'+e)
//     // }

//   })
