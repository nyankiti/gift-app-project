import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useFonts } from 'expo-font';

/* componet */
import { Container, Card, UserInfo, UserImg, UserName, UserInfoText, PostTime, PostText, PostImg, InteractionWrapper, Interaction, InteractionText, Divider} from '../styles/FeedStyles';
import ProgressiveImage from './ProgressiveImage';

/* context */
import { AuthContext } from '../src/AuthProvider';
/* lib */
import { db } from '../src/firebase';
import { User } from '../types';

type Props = {
  item: any;
  onDelete: () => void;
}

const PostCard: React.FC<Props> = ({item, onDelete}) => {
  const { user } = useContext(AuthContext);
  
  const [loaded] = useFonts({
    Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
    ComicSnas: require('../assets/fonts/comicsansms3.ttf')
  });
  
  // 以下のif文を入れるとrendering失敗する 
  // if (!loaded) {
  //   return null;
  // }

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
  }

  useEffect(() => {
    getUser();
  }, []);


  return ( 
    <Card>
      <UserInfo>
        <UserImg  source={{uri: userData.userImg ? userData.userImg || 'https://lh5.googleusercontent.com/-b0PKyNuQv5sAAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5sAAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}  />
        <UserInfoText>
          {/* 原因は不明だが fontFamily={"'ComicSnas, Anzumozi'"} とわたすとうまく動作する*/}
          <UserName fontFamily={"'ComicSnas, Anzumozi'"} >{userData.fname ? userData.fname || 'Test' : 'Test' } {userData.lname ? userData.lname || 'User' : 'User' }</UserName>
          {/* postTimeはDateクラスのオブジェクトなので色々なメソッドが使える 
          そのオブジェクトをさらにmomentでラップして表示を整えている*/}
          <PostTime fontFamily={"'ComicSnas, Anzumozi'"} >{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText fontFamily={"'ComicSnas, Anzumozi'"} >{item.post}</PostText>
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
          <InteractionText active={item.liked} fontFamily={"'ComicSnas, Anzumozi'"} >{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Icon name='md-chatbubble-outline' size={25} />
          <InteractionText fontFamily={"'ComicSnas, Anzumozi'"} >{commentText}</InteractionText>
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



// const styles = StyleSheet.create({
//   userName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     fontFamily: 'ComicSnas, Anzumozi',
//   },
//   PostTime: {
//     fontSize: 12,
//     fontFamily: 'ComicSnas, Anzumozi',
//     color: '#666'
//   },
//   PostText: {
//     fontSize: 14,
//     fontFamily: 'ComicSnas, Anzumozi',
//     paddingLeft: 15,
//     paddingRight: 15,
//     marginBottom: 15,
//   }
// })


// export const UserName = styled.Text`
//     font-size: 14px;
//     font-weight: bold;
//     font-family: ${props => props.fontFamily };

    
// `;

// export const PostTime = styled.Text`
//     font-size: 12px;
//     font-family: ${props => props.fontFamily };
//     color: #666;
// `;

// export const PostText = styled.Text`
//     font-size: 14px;
//     font-family: ${props => props.fontFamily };
//     padding-left: 15px;
//     padding-right: 15px;
//     margin-bottom: 15px;
// `;

export default PostCard;