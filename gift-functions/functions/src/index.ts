// import * as functions from "firebase-functions";
import * as sendQuestionMail from './sendQuestionMail';
import * as admin from "firebase-admin";

admin.initializeApp();

// 以下のfunctionsのうち一つだけdepoloyしたい場合は以下のようなコマンドを使う
// firebase deploy --only "functions:sendQuestionMail.default"
module.exports = {
  sendQuestionMail
}

