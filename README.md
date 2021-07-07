# gift_app_project 
王寺駅前自習室Giftに関わりのある全てのひとを繋ぐプラットフォーム  
Android版  
https://play.google.com/store/apps/details?id=com.gift.studyroom  
IOS版  
Coming Soon  
<!-- 画像はGithubを使って利用する（ソースコードに含めない） -->

## Features
### News画面
|<img src="https://user-images.githubusercontent.com/63132753/122671234-a1b8ae00-d200-11eb-9baa-2b3a9612e79d.jpg" width='123' >|<img src="https://user-images.githubusercontent.com/63132753/122672049-82bc1b00-d204-11eb-815d-4275968c4148.jpg" width='123'>|Gift自習室内の情報を共有するための画面。<br>バックエンドと連携して、ユーザーもリッチテキストでニュースを投稿できるようにする予定|
|---|---|---|

### Study Report画面
|<img src="https://user-images.githubusercontent.com/63132753/122671341-125fca80-d201-11eb-90f9-575ad114ea50.jpg" width='123' >|Giftを利用するにあたっての夢とその日の目標を管理する画面。<br>カレンダーで過去のボタンを押すとその日の勉強時間と目標が表示される。勉強時間は座席管理画面から自動的に計算される|
|---|---|

### Chat画面
|<img src="https://user-images.githubusercontent.com/63132753/122671723-ff4dfa00-d202-11eb-8290-c3ddd0d2b2ac.jpg" width='123' >|<img src="https://user-images.githubusercontent.com/63132753/122671748-1d1b5f00-d203-11eb-8a1e-c9d0e9b44feb.jpg" width='123'>|管理者とユーザーが連絡するための機能。現在はテキストメッセージのみで、管理者対ユーザーのみがチャットできる使用。<br>現段階ではUXに欠けるのでユーザーと管理者とのやり取りは基本的にLineかメールを奨励。|
|---|---|---|

### 座席管理画面
|<img src="https://user-images.githubusercontent.com/63132753/122671369-328f8980-d201-11eb-832c-7328d3335f5a.jpg" width='123' >|入室した際に座席を登録し、現在空いている座席をリアルタイムで確認するための画面<br>自習室内の安全管理のためのユーザー管理と、メンターサービスを利用する際のユーザーの勉強時間管理にもデータを利用する予定|
|---|---|

### 質問・相談作成画面
|<img src="https://user-images.githubusercontent.com/63132753/122671402-5521a280-d201-11eb-8603-929343db7b1a.jpg" width='123' >|<img src='https://user-images.githubusercontent.com/63132753/122671428-784c5200-d201-11eb-8aca-7d096c091a2b.jpg' width='123'>|受験用の勉強の質問サポートや、相談などを申請するため画面<br>入力した内容はsendgridを経由してオーナーへメールで送信される仕様|
|---|---|---|

### その他の画面
|ログイン画面|登録画面|Drawer|
|---|---|---|
|<img src="https://user-images.githubusercontent.com/63132753/122671844-7c796f00-d203-11eb-9b6c-c348fc08862c.jpg" width='123'>|<img src="https://user-images.githubusercontent.com/63132753/122671814-6370be00-d203-11eb-8a7e-a9856eeb3121.jpg" width='123' >|<img src="https://user-images.githubusercontent.com/63132753/122671472-b3e71c00-d201-11eb-81ec-3b7c6e3a9e8b.jpg" width='123' >|
|||

## Technical Details

### ユーザー管理
Firebase authentication を利用

### StudyReport画面のイラスト
SVGに値を動的に渡して利用して時計の針を回転   
```
<Svg>

....

  <G id='arrow' transform={`rotate(${calcClockRotation()}, ${SVGWidth/2}, ${SVGWidth/2})`}>
    <Line id="secondHandLine" x1={SVGWidth/2} y1={SVGWidth/2} x2={SVGWidth/2} y2="10" fill='black' stroke="black" strokeWidth="4" markerEnd="url(#arrow)" /> 
    <Polygon id='arrow' points="-10,0 10,0 0,-10" x={SVGWidth/2} y ={SVGWidth/2-35} fill="black" stroke="none" />            
  </G>

....

</Svg>
```

### メール送信  
[sendgrid api](https://sendgrid.com/)を利用

### ニュース画面
現段階ではFirebaseに記事のhtmlを保存して取得。
開発中のWebアプリから記事投稿できるようにする予定



## 開発予定の機能
- 管理者からユーザーへ最新の情報を共有するための機能
- 通知機能
- チャット機能の拡張
- 勉強管理画面のUX向上、Googleカレンダーとの連携？？


<!-- ### selection機能
  * Gesture  
  強くスクロールしたときに下に行く速度があがるように工夫
  
  
  * 三角関数   
  三角関数を使用して奥行きを計算し選択肢が回っているように見せる -->

