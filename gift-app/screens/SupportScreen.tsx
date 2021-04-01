import React, {useState, useContext, useEffect} from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from 'react-native';

import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { db, FirebaseTimestamp } from '../src/firebase';
import { windowHeight, windowWidth } from '../utils/Dimentions';
/* context */
import { AuthContext } from '../src/AuthProvider';


type Props = {
  navigation: any
}

const SupportScreen: React.FC<Props> = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    'userImg': '',
    'fname': '',
    'lname': '',
    'email': '',
    'phone': '',
    'about': '',
    'city': ''
  });


  const getUser = async() => {
    await db.collection('users').doc(user.uid).get()
      .then(async(documentSnapshot) => {
        if(documentSnapshot.exists){
          setUserData(documentSnapshot.data());
        }
      })
  }

  const handleChatButtonPress = async() => {
    const threadDocRef = await db.collection('threads').doc(user.uid);
    // console.log((await threadDocRef.get()).data);

    threadDocRef.set({
        name: userData.fname + userData.lname,
        createdBy: userData.fname + userData.lname,
        latestMessage: {
          text: `giftについて質問してみよう`,
          createdAt: new Date().getTime(),
        }
      }
    )
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
    getUser();
  }, []);

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
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Restaurant'})
          }>
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
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Fastfood Center'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="information" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>Wifi</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="information" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>infomation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="cake" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>cake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="bell-circle" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>aaaa</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="fitness" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>hahaha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="flask" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>hihihi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="apple" size={35} />
          </View>
          <Text style={styles.categoryBtnTxt}>apple</Text>
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