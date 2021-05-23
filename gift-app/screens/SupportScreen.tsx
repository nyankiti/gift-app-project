import React, {useState, useContext, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { db, FirebaseTimestamp } from '../src/firebase';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { registerForPushNotificationsAsync } from '../src/notification';
import loadFonts from '../utils/loadFonts';
import Loading from '../screens/LoadingScreen';

/* context */
import { AuthContext } from '../src/AuthProvider';

import { SupportTabParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type SupportTabNavigationProp = StackNavigationProp<SupportTabParamList> ;

type Props = {
  navigation: SupportTabNavigationProp;
  route: any
}



const SupportScreen: React.FC<Props> = ({navigation}) => {
  const {user, setUser, logout} = useContext(AuthContext);
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  // const [userData, setUserData] = useState({
  //   'userImg': '',
  //   'fname': '',
  //   'lname': '',
  //   'email': '',
  //   'phone': '',
  //   'about': '',
  //   'city': ''
  // });


  const getUser = async() => {
    await db.collection('users').doc(user?.uid).get()
      .then(async(documentSnapshot) => {
        if(documentSnapshot.exists){
          setUser(documentSnapshot.data());
        }
      })
    
      // notificationのテスト
      // const pushToken = await registerForPushNotificationsAsync();
      // console.log(pushToken);
  }

  const handleChatButtonPress = async() => {
    const threadDocRef = await db.collection('threads').doc(user?.uid);

    // ここのコードはuser contextが書き換わる前に読まれると危険なので危ない気がする
    // if(exsits(user.fname)

    threadDocRef.set({
      // このnameはチャットルームの名前
        // name: userData.fname + userData.lname,
        name: 'Gift管理者へ問い合わせ',
        createdBy: user?.fname + user?.lname,
        creatersId: user?.uid,
        openChat: false,
        latestMessage: {
          text: `giftについて質問してみよう`,
          createdAt: new Date().getTime(),
        }
      }
    )
    console.log(user);
    // 始めていメッセージルームを作成した場合はシステムメッセージを入れておく
    if((await threadDocRef.collection('messages').get()).empty){
      threadDocRef.collection('messages').add({
        text: `giftについて質問してみよう`,
        createdAt: new Date().getTime(),
        system: true
    })
    }

    navigation.navigate('Chat');
  }

  useEffect(() => {
    loadFonts(setFontLoaded);
    // getUser();
    console.log(user);
  }, []);

  if (fontLoaded) {
    return <Loading message='読込中' />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
          <View style={styles.slide}>
            <Image
              source={require('../assets/images/gift_heart_outline.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>{
            navigation.navigate('GiftInfoScreen')
          }}>
          <View style={styles.categoryIcon}>
            <Ionicons name="information" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>Giftについて</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={handleChatButtonPress}>
          <View style={styles.categoryIcon}>
            <Ionicons name="chatbubbles" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => {navigation.navigate('GiftInfoScreen')}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="information" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>Wifi</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {navigation.navigate('GiftInfoScreen')}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="information" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>infomation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {navigation.navigate('GiftInfoScreen')}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="cake" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>infomation2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {navigation.navigate('EditProfileScreen')}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="account" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {navigation.navigate('GiftInfoScreen')}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="fitness" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>infomation4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {navigation.navigate('GiftInfoScreen')}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="flask" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>infomation5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {logout()}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="exit-to-app" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    height: windowHeight*0.2,
    width: '90%',
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  wrapper: {

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '50%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth*0.14,
    height: windowWidth*0.14,
    backgroundColor: '#EAC799',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    fontFamily: 'ComicSnas',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});