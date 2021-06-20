import * as functions from "firebase-functions";
import * as sendgrid from "@sendgrid/mail";

// 後々にmail送信はbackendのlaravelで扱いたい
export default functions.region("asia-northeast1").firestore
  .document("mail/{documentId}").onCreate(async(snapshot, context) => {
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
    
    // try{
      const msg = {
        to: 'nyankiti20000824@gmail.com',
        from: 'Gift-App <nyancic77@outlook.jp>',
        subject: 'アプリからの質問依頼',

        text: mailData.text, 
        html: html
      }
      await sendgrid.send(msg).then((result) => {
        return console.log('Successfully sent messages: ', result);
      }).catch((error) => {
        console.log(error.toString());
        return console.log("Error sending message: ", error);
      })

  })
