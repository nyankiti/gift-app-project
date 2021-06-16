# gift_app_project  最新開発用
gift合同会社公式アプリ\
王寺駅前自習室Giftに関わりのある全てのひとを繋ぐプラットフォーム


## DEMO
![gift-app-demo](https://user-images.githubusercontent.com/63132753/113952099-f7abc580-984f-11eb-98ae-dce30314030c.jpg)

## Features
Gift内でのニュース、利用者同士高め会えるような記事の表示\
勉強時間、目標管理\
管理者からの連絡の通知\
メンターサービスの利用や自習室の利用方法について問い合わせ用チャット
Giftユーザーの管理（管理者用）


## Technical Details

### データベース
users/{userID}  
  uid  
  displayName
  fname  
  lname  
  userImg  
  city  
  phone  
  email  
  createdAt  
  updatedAt  
  about  


users/{userID}/Goals/{datestring}  
  post: {
    dream
    oneDayGoal
  }
  postTime  


graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;


<!-- ### selection機能
  * Gesture  
  強くスクロールしたときに下に行く速度があがるように工夫
  
  
  * 三角関数   
  三角関数を使用して奥行きを計算し選択肢が回っているように見せる -->

