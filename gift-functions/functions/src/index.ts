// import * as functions from "firebase-functions";
import * as sendMail from './sendMail';
import * as admin from "firebase-admin";

admin.initializeApp();

// 以下のfunctionsのうち一つだけdepoloyしたい場合は以下のようなコマンドを使う
// firebase deploy --only "functions:sendMail.default"
module.exports = {
  sendMail
}

