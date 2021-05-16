import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text,TouchableHighlight } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import { db, FirebaseTimestamp } from '../src/firebase';
import loadFonts from '../utils/loadFonts';
import { RFPercentage } from "react-native-responsive-fontsize";
import { AuthContext } from '../src/AuthProvider';


import { Container, Card, UserInfo, UserInfoText, UserName, UserImg, UserImgWrapper, PostTime, MessageText, TextSection} from '../styles/UsersStyle';


type Props = {
  navigation: any;
}

const ChatHomeScreen: React.FC<Props> = ({ navigation }) => {
  const {user} = useContext(AuthContext);
  const [threads, setThreads] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection('threads').where('creatersId', 'in', [user.uid, 'open'])
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          console.log(documentSnapshot.id);
          // if(user.uid == documentSnapshot.id){
            return {
              // ここの_id(documentSnapshot.id)がチャットルームのidとなり、チャット画面に受け渡されるので要チェック
              _id: documentSnapshot.id,
              // give defaults
              name: '',
              latestMessage: {
                text: "",
              },
              ...documentSnapshot.data()
            };
          // }
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadFonts(setFontLoaded);
  })

  const handleButtonPress = ({item}) => {
    console.log(item);
    navigation.navigate('RoomScreen', { thread: item })
  }

  if (fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RoomScreen', {thread: item})}
            // onPress={handleButtonPress(item)}
            // onPress={() => {navigation.navigate('RoomScreen')}}
          >
            {/* <List.Item
              title={item.name}
              description='Item description'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            /> */}
            <View style={styles.user_info}>
              <View style={styles.text_section}>
                <View style={styles.user_info_text}>
                  <Text style={styles.user_name}>{item.name}</Text>
                  <Text style={styles.post_time} >{}</Text>
                </View>
                <Text style={styles.message_text}>{item.latestMessage.text}</Text>
              </View>
            </View>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default ChatHomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f5f5f5',
    backgroundColor: 'white',
    flex: 1
  },
  listTitle: {
    fontSize: RFPercentage(4),
    fontFamily: 'Anzumozi',
  },
  listDescription: {
    fontSize: RFPercentage(3)
  },
  user_info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_section: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  user_info_text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  user_name: {
    fontSize: RFPercentage(3.6),
    fontFamily: 'Anzumozi',
  },
  post_time: {
    fontSize: RFPercentage(2),
    color: '#666',
    fontFamily: 'Anzumozi',
  }, 
  message_text:  {
    fontSize: RFPercentage(3),
    color: '#333333',
    fontFamily: 'Anzumozi'
  }
});