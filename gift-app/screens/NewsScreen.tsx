import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, SafeAreaView, FlatList, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constants from "expo-constants";
import { Text, View } from '../components/Themed';
import LoadingScreen from '../screens/LoadingScreen';
/* componet */
import { Container } from '../styles/FeedStyles';
import PostCard from '../components/PostCard';
// import { NewsScreenSkeleton } from '../components/NewsScreenSkeleton';

/* types */

/* lib */
import { db, storage } from '../src/firebase';

/* context */
import { AuthContext } from '../src/AuthProvider';
import Navigation from '../navigation/index copy';

type Props = {
  navigation: any
}


const NewsScreen: React.FC<Props> = ({navigation}) => {


  const {user} = useContext(AuthContext);

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  // データ更新時にfetchPostしてページを更新する
  useEffect(() => {
    fetchPosts();
    console.log(Constants.manifest.extra);
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted])

  const fetchPosts = async () => {
    try{
      const list: any = []

      await db.collection('posts').orderBy('postTime', 'desc').get()
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

// 投稿消去ボタンを押したときに確認を取るメソッド
  const handleDelete = (postId) => {
    console.log("Aaaaaaaaaaaaaaa");
    // Alertが発火していな模様 原因不明（20210223）
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel'
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false}
    );
  }


  const deletePost = (postId) => {
    // postImgはstorageに保存しているので画像の有無で条件分岐する
    db.collection('posts').doc(postId).get()
    .then((documentSnapshot => {
      if ( documentSnapshot.exists ){
        const { postImg } = documentSnapshot.data();

        if( postImg != null ){
          const storageRef = storage.refFromURL(postImg);
          const imageRef = storage.ref(storageRef.fullPath);

          imageRef.delete().then(() => {
            console.log(`${postImg} has been deleted successfully`);

            deleteFirestoreData(postId);
          }).catch((e) => {
            console.log(e);
          })
        } else {
          deleteFirestoreData(postId);
        }
      } 
    }))
  }

  const deleteFirestoreData = (postId) => {
    db.collection('posts').doc(postId).delete().then(() => {
      Alert.alert(
        'Post deleted!',
        'Your post has been deleted successfully!'
      )
    setDeleted(true);
    }).catch((e) => {
      console.log('Error deleting posts.', e);
    })
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <ScrollView contentContainerStyle={styles.container} > */}
      <Container>
        <FlatList 
          data={posts}
          renderItem={({item}) => <PostCard item={item} onDelete={handleDelete} />}
          keyExtractor={item=>item.id}
          showsVerticalScrollIndicator={false}
          />
      </Container>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

