import React, {useEffect, useState, useContext} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';

import { createSecureServer } from 'http2';
/* components */
import {UserComponet} from '../components/User';
import { Container, Card, UserInfo, UserInfoText, UserName, UserImg, UserImgWrapper, PostTime, MessageText, TextSection} from '../styles/UsersStyle';

/* types */
import {UsersStackParamList, User} from '../types';
/* lib */
import { db, FirebaseTimestamp } from '../src/firebase'; 
import { AuthContext } from '../src/AuthProvider';


type Props = {
  navigation: StackNavigationProp<UsersStackParamList, "User">;
  route : RouteProp<UsersStackParamList, "User">;
}


// test用のダミーデータ
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/images/Gift_logo_20210221.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/images/Gift_logo_20210221.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/images/Gift_logo_20210221.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/images/Gift_logo_20210221.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/images/Gift_logo_20210221.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];


export default function UserScreen({navigation, route}: Props) {
  const [users, setUsers] = useState<any>([]);
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const {user} = useContext<any>(AuthContext);


  useEffect(() => {
    console.log(user);
    // const unsubscribe = db
    //   .collection('MESSAGE_THREADS')
    //   .orderBy('latestMessage.createdAt', 'desc')
    //   .onSnapshot(querySnapshot => {
    //     const threads: any = querySnapshot.docs.map(documentSnapshot => {
    //       return {
    //         _id: documentSnapshot.id,
    //         name: '',
    //         latestMessage: { text: '' },
    //         ...documentSnapshot.data()
    //       }
    //     })

    //     setThreads(threads)
    //     console.log(threads)
    //     if (loading) {
    //       setLoading(false)
    //     }
    //   })

    // return () => unsubscribe()
    fetchUsers()
  }, [])


  const fetchUsers = async () => {
    try{
      const list: any = []

      await db.collection('users').get()
      .then((querySnapshot) => {
        // .docsメソッドを用いることで通常のjavascript Arrayに変換されるのでindexを引数に取れるArrayになる
        querySnapshot.docs.forEach((doc, index) => {
          const {uid, fname, lname, about, userImg} = doc.data();
          list.push({
            uid: uid,
            fname: fname,
            lname: lname,
            about: about,
            userImg: userImg,
            index: index,
          });
        })
        console.log(list);
        setUsers(list);

        if(loading){
          setLoading(false);
        }

      } )
    }catch(e){
      console.log(e);
    }
  }

  function handleButtonPress(item: any) {
    if (item.uid.length > 0) {
      // ログイン中のユーザーから選択したユーザーへのチャットルームの作成
      db.collection('chats').doc('createdBy'+user.uid).set({
          _id: user.uid,
          name: 'chatRoomOf'+user.uid,
          latestMessage: {
            text: `${user.uid}'s chatroom created. Welcome!`,
            createdAt: FirebaseTimestamp.fromDate(new Date()),
          }
        })
        .then(() => {
          navigation.navigate('ChatScreen', {item :item})
        })
    }
  }

  if (loading) {
    return <ActivityIndicator size='large' color='#555' />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.index}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleButtonPress(item)}>
            <View style={styles.row}>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.nameText}>{item.fname}{item.lname}</Text>
                </View>
                <Text style={styles.contentText}>
                  {item.about.slice(0, 90)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dee2eb'
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '500'
  },
  row: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flexShrink: 1
  },
  header: {
    flexDirection: 'row'
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#000'
  },
  dateText: {},
  contentText: {
    color: '#949494',
    fontSize: 16,
    marginTop: 2
  },
  separator: {
    backgroundColor: '#555',
    height: 0.5,
    flex: 1
  }
})
