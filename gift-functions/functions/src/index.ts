import * as functions from "firebase-functions";
// import * as sendQuestionMail from './sendQuestionMail';
// import * as calcClockLotation from './calcClockLotation';
import * as admin from "firebase-admin";
import * as sendgrid from "@sendgrid/mail";


admin.initializeApp();

// 以下のfunctionsのうち一つだけdepoloyしたい場合はC:\Users\nyanc\OneDrive\ドキュメント\gift-app-project\gift-functions\functionsにて以下のようなコマンドを使う
// firebase deploy --only "functions:sendQuestionMail.default"
// export {
//   sendQuestionMail,
//   calcClockLotation
// }


// 片方だけupdateしたい場合は firebase deploy --only "functions:calcClockLotation" とコマンドを打つ

exports.calcClockLotation =  functions.region("asia-northeast1").firestore
  .document("users/{userId}/seat/{documentId}").onWrite(async(snapshot, context) => {
    const beforeStudyTime = snapshot.before.data()?.studyTime;  
    const afterStudyTime = snapshot.after.data()?.studyTime;
    // console.log(afterData?.studyTime);
    if(afterStudyTime){
      console.log('studytimeが存在するよ');
      var tempTime = afterStudyTime;
      
      if(beforeStudyTime){
        console.log('beforeStudyTimeも存在するよ');
        tempTime = afterStudyTime + beforeStudyTime;
        console.log(tempTime);
      }

      const goalsDocRef =  admin.firestore().collection('users').doc(context.params.userId).collection('goals').doc(context.params.documentId);

      try {
        await goalsDocRef.get().then(async(snapshot) => {
          if(snapshot.exists){
            const targetHours = Number(snapshot.data()?.targetHours);
            console.log('targetHours : '+targetHours);
            // 既に登録されているtargetHoursと比較して大きい方を登録する
            if(targetHours > tempTime){
              tempTime = targetHours;
            }
            await goalsDocRef.set({
              studyTime: tempTime
            },{merge: true})
          }else{
            await goalsDocRef.set({
              studyTime: tempTime
            },{merge: true})
          }
        })          
      }catch(e){
        console.log('エラーだよ'+e);
      }

    }
    // const beforeData = snapshot.before.data();
    // console.log(beforeData);

  })




// 後々にmail送信はbackendのlaravelで扱いたい
exports.sendQuestionMail = functions.region("asia-northeast1").firestore
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
