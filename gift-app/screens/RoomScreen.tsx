import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import {Bubble, GiftedChat, Send, SystemMessage} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { db, FirebaseTimestamp } from '../src/firebase';
/* context */
import { AuthContext } from '../src/AuthProvider';
import { auth } from 'firebase';

const chatsRef = db.collection('chats');


const RoomScreen = ({route}: any) => {
  const { user }: any = useContext(AuthContext);
  const { thread }: any = route.params;
  const currentUser = user.toJSON();

  const [messages, setMessages] = useState<any>();
  const [userImg, setUserImg] = useState<string>();

  useEffect(() => {
    const messagesListener = db.collection('THREADS').doc(thread._id)
    .collection('MESSAGES').orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: '',
          createdAt: new Date().getTime(),
          ...firebaseData
        };

        // systemData出ない場合は送信しているユーザーの情報をとってくる
        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.email,
            // avatar: firebaseData.user.userImg,
            avatar: firebaseData.user.userImg,
          };
        }

        return data;
      });

      setMessages(messages);
    });

  return () => messagesListener();
  }, []);

  const getCurrentUserImg = async() => {
    await db.collection('users').doc(user.uid).get()
      .then(async(documentSnapshot) => {
        if(documentSnapshot.exists){
          const data = documentSnapshot.data();
          setUserImg(data.userImg);
        }
      })
  }
  useEffect(() => {
    getCurrentUserImg();
    console.log(userImg)
  }, [userImg])

  const handleSend = async(messages: any) => {
    const text = messages[0].text;

    db.collection('THREADS').doc(thread._id).collection('MESSAGES').add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: currentUser.uid,
        email: currentUser.email,
        userImg: userImg,
      }
    });

    await db.collection('THREADS').doc(thread._id).set(
      {
        latestMessage: {
          text: text,
          createdAt: new Date().getTime(),
        }
      },
      // mergeをtrueに指定してfirestoreに登録すると、setする全てのdocumentをoverwriteせずに、現在参照している箇所のみ変更してくれる
      { merge: true }
    );
  }

  const appendMessages = useCallback((messages) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, [messages]);

  
  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

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
      <View style={styles.bottomComponentContainer}>
        <FontAwesome name='angle-double-down' size={22} color='#333' />
      </View>
    );
  };

  // renderSystemMessageがうまく機能していない、、
  const  renderSystemMessage = ({props}: any) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  return (
    <View style={{backgroundColor: 'lightcyan', flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: currentUser.uid }}
        renderBubble={renderBubble}
        placeholder='Type your message here...'
        showUserAvatar
        alwaysShowSend
        renderSend={renderSend}
        renderLoading={renderLoading}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        // renderSystemMessage={renderSystemMessage}
      />
    </View>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});