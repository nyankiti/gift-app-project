import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../components/Loading';
import { db, FirebaseTimestamp } from '../src/firebase';

import { Container, Card, UserInfo, UserInfoText, UserName, UserImg, UserImgWrapper, PostTime, MessageText, TextSection} from '../styles/UsersStyle';


type Props = {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [threads, setThreads] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch threads from Firestore
   */
  useEffect(() => {
    const unsubscribe = db
      .collection('threads')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
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

  const handleButtonPress = ({item}) => {
    console.log(item);
    navigation.navigate('RoomScreen', { thread: item })
  }

  if (loading) {
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
            <UserInfo>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
                  <PostTime>{}</PostTime>
                </UserInfoText>
                <MessageText>{item.latestMessage.text}</MessageText>
              </TextSection>
            </UserInfo>

          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f5f5f5',
    backgroundColor: 'white',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});