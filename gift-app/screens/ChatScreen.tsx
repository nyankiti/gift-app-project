import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { db } from '../src/firebase';
/* context */
import { AuthContext } from '../src/AuthProvider';
import { auth } from 'firebase';

const chatsRef = db.collection('chats');


const ChatScreen = ({route}: any) => {
  const { item } = route.params;
  const {user} = useContext<any>(AuthContext);
  // const user = auth().currentUser.toJSON()
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
  //   const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
  //     const messagesFirestore = querySnapshot
  //     // docChangesメソッドを用いてfirestoreが追加されたときのみ呼び出すように条件分岐する
  //         .docChanges()
  //         .filter(({ type }: any) => type === 'added')
  //         .map(({ doc }: any) => {
  //             const message = doc.data()
  //             return { ...message, createdAt: message.createdAt.toDate() }
  //         })
  //         .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime())
  //     appendMessages(messagesFirestore)
  //   })
  // return () => unsubscribe()
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     // messageを送る相手
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: require('../assets/images/default-img.jpg'),
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'Hello world',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: require('../assets/images/Gift_logo_20210221.jpg'),
    //     },
    //   },
    // ]);
  }, []);

  const appendMessages = useCallback((messages) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, [messages]);


  // 以下のメソッドで管理者(Junyaさんの情報を呼んでくる)
  // junya@gmail.com   Junjun24  uid: sKGRITQAW1WSeLDIIdabix84ZBo1
  const readAdminUser = async () => {
    try{
      const AdminUserRef = await db.collection('users').doc('sKGRITQAW1WSeLDIIdabix84ZBo1');
      AdminUserRef.get().then((doc: any) => {
        if(doc.exists){
          console.log(doc.data().uid);
          const adminUserId = doc.data().uid;
          return adminUserId;
        }
      })
    }catch(e){
      console.log(e);
    }
  }

  const handleSend = async(messages: any) => {
    // const writes = messages.map((m: any) => chatsRef.add(m))
    const writes = messages.map((m: any) => db.collection('chats').doc('createdBy'+user.uid).collection('messages').add(m))
    // 上で定義したwritesの処理が終了するまでawaitさせる
    await Promise.all(writes)
  }

  // 個別でのチャットを実現するための処理-----------------------------------
  useEffect(() => {
//ログイン中の人のchatroomにuserリストで選択したuserの名前を使ったドキュメントを作成する
    const unsubscribe = db.collection('users').doc(user.uid).collection('chat_room').doc('chatroom of '+item.fname+item.lname).collection('messages').onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
      // docChangesメソッドを用いてfirestoreが追加されたときのみ呼び出すように条件分岐する
          .docChanges()
          .filter(({ type }: any) => type === 'added')
          .map(({ doc }: any) => {
              const message = doc.data()
              return { ...message, createdAt: message.createdAt.toDate() }
          })
          .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime())
      appendMessages(messagesFirestore)
    })
  return () => unsubscribe()
  }, []);


  // -----------------------------------------------------------------------

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{
        // _id: 'sKGRITQAW1WSeLDIIdabix84ZBo1',
        _id: user.uid,
        name: item.fname+item.lname,
        avatar: item.userImg,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});