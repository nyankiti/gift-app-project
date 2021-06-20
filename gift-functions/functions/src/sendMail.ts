import * as functions from "firebase-functions";
import * as sendgrid from "@sendgrid/mail";
// import * as admin from "firebase-admin";


/* 以下のデータが送られてくる
communicationMethod: "line"
img1: "https://firebasestorage.googleapis.com/v0/b/gift-app-project.appspot.com/o/mail%2FzHBbV8enFlR3AEi9D0DbgzamHB63%2Fy7dg8n.jpeg?alt=media&token=e69a76bc-2801-40c2-a5dc-3d14e1c8bb5e"
img2: null
name: null
subject: "日本史"
text: "聖徳太子って誰ですか"
userId: "zHBbV8enFlR3AEi9D0DbgzamHB63"
*/

// sendgrid の webhook用のfunction
// 後々にmail送信はbackendのlaravelで扱いたい
export default functions.region("asia-northeast1").firestore
  .document("mail/{documentId}").onCreate(async(snapshot, context) => {
    // const docId = context.params.documentId;
    const mailData = snapshot.data();
    var html = `<div>
    <h4>教科: ${mailData.subject}</h4>
      <h4>
        Name - ${mailData.name || ""}
      </h4>
      <p>${mailData.text}</p>
      <h4>添付画像</h4>
      <ul>
        <li>${mailData.img1 || ""}</li>
        <li>${mailData.img2 || ""}</li>
      </ul>
      <h4>希望連絡手段: ${mailData.communicationMethod}</h4>
  </div>`;

    // メールの内容の取得
    // メールのデータが上で取れたのでわざわざfirestoreに取りに行く必要なし
    const apiKey = functions.config().sendgrid.apikey;
    sendgrid.setApiKey(apiKey);
    
    // try{
      const msg = {
        to: 'nyancic77@outlook.jp',
        from: 'Gift-App <nyankiti20000824@gmail.com>',
        subject: 'アプリからの質問依頼',
        // templateId: 'd-04ab840d55d444d8a71462d25fe0c0ee ',
        // substitutionWrapper: ['{{', '}}'],
        // substitutions: {
        //   name: mailData.name,
        //   userId: mailData.userId,
        //   text: mailData.text,
        //   subject: mailData.subject,
        //   img1: mailData.img1,
        //   img2: mailData.img2,
        //   communicationMethod: mailData.communicationMethod
        // }
        text: mailData.text, 
        html: html
      }
      await sendgrid.send(msg).then((result) => {
        return console.log('Successfully sent messages: ', result);
      }).catch((error) => {
        console.log(error.toString());
        // 以下のようにするとエラーログが詳細に見れる
        // const {message, code, response} = error;
        // const {header, body} = response;
        // console.log(message);
        // console.log(code);
        // console.log(header);
        // console.log(body);
        // return console.log("Error sending message: ", error);
      })

  })

