import React, {useEffect, useState, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';


/* componet */
import { Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';

/* context */
import { AuthContext } from '../src/AuthProvider';
/* lib */
import { db } from '../src/firebase';




const PostCard = ({item, onDelete}) => {
  const {user} = useContext(AuthContext);

  // item.id はfieldで自分が設定したidではなく、documentのところで自動的に生成されているidのこと
  // console.log(item.id);
  const [userData, setUserData] = useState({
    'userImg': '',
    'fname': '',
    'lname': '',
    'email': '',
    'phone': '',
    'about': '',
    'city': ''
  });


  let likeIcon = item.liked ? 'heart' : 'heart-outline';
  let likeIconColor = item.liked ? '#2e64e5' : '#333';
  let likeText;
  let commentText;

// likeの複数形を条件分岐する
  if(item.likes == 1){
    likeText = '1 Like';
  }else if(item.likes > 1){
    likeText = item.likes + 'Likes';
  }else{
    likeText = 'Like';
  }

  if(item.comments == 1){
    commentText = '1 Comment';
  }else if(item.comments > 1){
    commentText = item.comment + 'Commnets';
  }else{
    commentText = 'Comment';
  }

  const getUser = async() => {
    await db.collection('users').doc(item.userId).get()
      .then(async(documentSnapshot) => {
        if(documentSnapshot.exists){
          setUserData(documentSnapshot.data());
        }
      })
      //なぜかconsole.logには間に合わないがしっかり値はsetできてるっぽい
      console.log(userData);
  }

  useEffect(() => {
    getUser();
  }, []);


  return ( 
    <Card>
      <UserInfo>
        <UserImg  source={{uri: userData.userImg ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5sAAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5sAAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}  />
        <UserInfoText>
          <UserName>{userData.fname ? userData.fname || 'Test' : 'Test' } {userData.lname ? userData.lname || 'User' : 'User' }</UserName>
          {/* postTimeはDateクラスのオブジェクトなので色々なメソッドが使える 
          そのオブジェクトをさらにmomentでラップして表示を整えている*/}
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {/* 投稿に画像が含まれているかどううかで場合分け */}
      {item.postImg != null ?
        <ProgressiveImage
          defaultImageSource={require('../assets/images/default-img.jpg')}
          source={{uri : item.postImg}}
          style={{ width: '100%', height: 250 }} 
          resizeMode='cover'
        /> 
      : 
        <Divider /> 
      }
      <InteractionWrapper>
        <Interaction active={item.liked} >
          <Icon name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={item.liked} >{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Icon name='md-chatbubble-outline' size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid == item.userId ?
        <Interaction onPress={() => onDelete(item.id)} >
          <Icon name='md-trash-bin' size={25} />
        </Interaction>
        : null}  
      </InteractionWrapper>
    </Card>
  );
}

export default PostCard;