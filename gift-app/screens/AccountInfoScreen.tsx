import React, {useEffect, useState, useContext} from 'react';
import { Button, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { getExtension } from '../utils/file';


/* component */
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { IconButton } from '../components/IconButton';
import { UserImg } from '../styles/FeedStyles';
import PostCard from '../components/PostCard';

/* types */
import { User } from '../types';

/* lib */
import { FirebaseTimestamp, updateUserRef, uploadImage, getUser, db } from '../src/firebase';
import { pickImage } from "../src/image-picker";
/* context */
import { AuthContext } from '../src/AuthProvider';


export default function AccountInfoScreen({navigation, route}) {
  const {user, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
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
      //なぜかconsole.logには間に合わないがしっかり値はsetできてるっぽい
      console.log(userData);
  }

  const fetchPosts = async () => {
    try{
      const list: any = []

      await db.collection('posts').where('userId', '==', user.uid).orderBy('postTime', 'desc').get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const {userId, post, postImg, postTime, likes, comments} = doc.data();
          list.push({
            id: doc.id,
            userId: userId,
            userName: 'TestName',
            userImg: require('../assets/images/Gift_logo_20210221.jpg'),
            postTime: postTime,
            post: post,
            postImg: postImg,
            liked: false,
            likes: likes,
            comments: comments,
          });
        })

        setPosts(list);

        if(loading){
          setLoading(false);
        }

      } )
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    getUser({setUserData}, user.uid);
    fetchPosts();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const handleDelete = () => {

  }


  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          style={styles.userImg} 
          source={{uri: userData.userImg ? userData.userImg : 'https://lh5.googleusercontent.com/-b0PKyNuQv5sAAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}} 
        />
        <Text style={styles.userName} >{userData.fname ? userData.fname : 'Test'} {userData.lname ? userData.lname : 'User'}</Text>
        <Text>{ route.params ? route.params.userId : user.uid }</Text>
        <Text style={styles.aboutUser} >{userData.about ? userData.about || 'No details added.' : '' }</Text>
        <View style={styles.userBtnWrapper}>

          {route.params ? (
          <>
            <TouchableOpacity style={styles.userBtnTxt} onPress={() => {}}>
              <Text style={styles.userBtn} >Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtnTxt} onPress={() => {}}>
              <Text style={styles.userBtn} >Follow</Text>
            </TouchableOpacity>
          </>  
          ):( 
            <>
            <TouchableOpacity style={styles.userBtnTxt} onPress={() => {navigation.navigate('EditProfileScreen')}}>
              <Text style={styles.userBtn} >Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtnTxt} onPress={() => logout()}>
              <Text style={styles.userBtn} >Logout</Text>
            </TouchableOpacity>
          </>  
          )}

        </View>

        <View style={styles.userInfoWrapper} >
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle} >{posts.length}</Text>
            <Text style={styles.userInfoSubTitle} >Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle} >10,000</Text>
            <Text style={styles.userInfoSubTitle} >Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle} >100</Text>
            <Text style={styles.userInfoSubTitle} >Following</Text>
          </View>
        </View>

        {posts.map((item) => ( 
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});