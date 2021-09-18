import * as functions from "firebase-functions";
// import * as sendQuestionMail from './sendQuestionMail';
// import * as calcClockLotation from './calcClockLotation';
import * as admin from "firebase-admin";
import * as sendgrid from "@sendgrid/mail";

admin.initializeApp();

const db = admin.firestore();

exports.deleteUserSeatInfo = functions
  .region("asia-northeast1")
  .pubsub.schedule("0 0 * * *")
  .timeZone("Asia/Tokyo")
  .onRun((context) => {
    const userRef = db.collection("users");
    userRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          try {
            doc.ref.set(
              {
                currentSeat: null,
              },
              { merge: true }
            );
          } catch (e) {
            console.log(
              "something went wrong in updating users current seat : " + e
            );
          }
        });
      })
      .catch((e) => {
        console.log(
          "something went wrong in updating users current seat : " + e
        );
      });
  });

exports.Test = functions
  .region("asia-northeast1")
  .pubsub.schedule("0/5 * * * *")
  .timeZone("Asia/Tokyo")
  .onRun((context) => {
    const userRef = db.collection("users");
    userRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          try {
            doc.ref.set(
              {
                currentSeat: null,
              },
              { merge: true }
            );
          } catch (e) {
            console.log(
              "something went wrong in updating users current seat : " + e
            );
          }
        });
      })
      .catch((e) => {
        console.log(
          "something went wrong in updating users current seat : " + e
        );
      });
  });

exports.getTest = functions
  .region("asia-northeast1")
  .pubsub.schedule("0/5 * * * *")
  .timeZone("Asia/Tokyo")
  .onRun((context) => {
    const userRef = db.collection("users");
    userRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          try {
            console.log(doc.data());
          } catch (e) {
            console.log(
              "something went wrong in updating users current seat : " + e
            );
          }
        });
      })
      .catch((e) => {
        console.log(
          "something went wrong in updating users current seat : " + e
        );
      });
  });

// 後々にmail送信はbackendのlaravelで扱いたい
exports.sendQuestionMail = functions
  .region("asia-northeast1")
  .firestore.document("mail/{documentId}")
  .onCreate(async (snapshot, context) => {
    const mailData = snapshot.data();
    var html = `<div>
    <h4>質問者名 ${mailData.name}</h4>
      <h4>
        教科: ${mailData.subject}
      </h4>
      <p>${mailData.text}</p>
      <h4>添付画像</h4>
      <ul>
        <li>${mailData.img1 || ""}</li>
        <li>${mailData.img2 || ""}</li>
      </ul>
      <h4>希望連絡手段: ${mailData.communicationMethod}</h4>
  </div>`;

    const apiKey = functions.config().sendgrid.apikey;
    sendgrid.setApiKey(apiKey);

    const msg = {
      to: "nyankiti20000824@gmail.com",
      from: "Gift-App <nyancic77@outlook.jp>",
      subject: "アプリからの質問依頼",

      text: mailData.text,
      html: html,
    };
    await sendgrid
      .send(msg)
      .then((result) => {
        return console.log("Successfully sent messages: ", result);
      })
      .catch((error) => {
        console.log(error.toString());
        return console.log("Error sending message: ", error);
      });
  });
