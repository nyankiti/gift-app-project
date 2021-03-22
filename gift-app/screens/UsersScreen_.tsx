import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
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
import {getUsers} from '../src/firebase'; 



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



type Props = {
  navigation: StackNavigationProp<UsersStackParamList, "User">;
  route : RouteProp<UsersStackParamList, "User">;
}


const UserScreen: React.FC<Props> = ({navigation, route}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const users = await getUsers();
    setUsers(users) 
  }

  const onPressUser = (user: User) => {
    // ここのnavigateで指定した型のものがroute.paramsから取得できる
    // 画面遷移の処理はここではなく、ChatStackNavigatorで実装されている
    navigation.navigate("UserDetal", { user });
  };


  const UserItems = users.map((user, index) => (
    <View key={index.toString()}>
      <Text>{user.name}</Text>
    </View>
  ))

  return (
    <Container>
      <FlatList 
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card onPress={() => navigation.navigate('UserDetailScreen', {userName: item.userName})}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
