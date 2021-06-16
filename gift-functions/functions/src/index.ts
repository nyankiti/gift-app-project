import * as functions from "firebase-functions";
import * as sendgrid from "@sendgrid/mail";
import {sendgrid_apikey} from "../apikey";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// functionsの後でregionを追加できる  asia-northeast1 は東京
export const helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


// sendgrid の webhook用のfunction
// 後々にmail送信はbackendのlaravelで扱いたい
// exports.sendgridEmail = functions.region("asia-northeast1").firestore
//   .document("users/{userID}/questions/{datestring}").onCreate( async (change, context) => {
//     // fメールの内容を取ってくる
//     const mailSnap = await db.collection('users').doc(context.paramas.userId).get()
//     const apiKey = sendgrid_apikey;
//     sendgrid.setApiKey(apiKey);
//     const mailData = snapshot.val();
//     var text = `<div>
//     <h4>Information</h4>
//     <div>
//     ${mailData}
//     </div>
//   </div>`;
//     const msg = {
//       to: 'nyankiti20000824@gmail.com',
//       from : 'giftapp',
//       subject: 'Gift生質問',
//       html: text,
//     }
//     await sendgrid.send(msg);

//   })

