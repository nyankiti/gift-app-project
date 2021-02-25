import React, { useState, useContext } from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { InputWrapper, InputField, AddImage, SubmitBtn, SubmitBtnText, StatusWrapper } from '../styles/AddPost';
// import ActionButton from 'react-native-action-button';
// import { FloatingAction } from "react-native-floating-action";
import { FloatingActionButton } from '../components/FloatingActionButton';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { pickImage } from "../src/image-picker";
// import storage from '@react-native-firebase/storage';
import { storage, FirebaseTimestamp, db } from '../src/firebase';
import { getExtension, formatDate } from '../utils/file';

/* hookd */
import useUnmountRef from '../hooks/useUnmountRef';
import useSafeState from '../hooks/useSafeState';

/* context */
import { AuthContext } from '../src/AuthProvider';




const AddPostScreen = () => {
  const {user} = useContext(AuthContext);

  const unmountRef = useUnmountRef();
  const [imageUri, setImageUri] = useSafeState(unmountRef, '');
  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState<string>('');

  // 現段階ではcrop機能が使えるreact-native用のimage-pickerの使い型不明
  // 時間があれば調査しよう
  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     // croppingをfalseにするとcrop機能なしの実装となる
  //     cropping: true
  //   }).then(image => {
  //     console.log(image);
  //   });
  // }

  const choosePhotoFromLibrary = async() => {
    const uri = await pickImage();
    setImageUri(uri);
  }

  const uploadImage = async() => {
    if( imageUri == ""){
      return null;
    }

    setUploading(true);

    const uploadUri = imageUri;
    const extension = getExtension(uploadUri);
    const date_for_filename = formatDate();
    const filename = date_for_filename + "." + extension;
    console.log(filename);

    
    let storagePath = `PostedImages/${date_for_filename}.${extension}`;

    const tempUri = await fetch(uploadUri);
    const blob = await tempUri.blob();

    const storageRef = storage.ref(storagePath);


    const task = storageRef.put(blob);
    // const downloadUrl = await uploadImage(imageUri, storagePath);
    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100,
      );
    });

    try{
      await task;

      const urlOfFireStorage = storageRef.getDownloadURL();

      setUploading(false);
      // storageへのuploadが完了したらstateは開放する
      setImageUri(null);

      return urlOfFireStorage
    }catch(e){
      console.log(e);
      return null;
    }

  }

  const submitPost = async() => {
    const imageUrlOfFireStorage = await uploadImage();
    console.log(imageUrlOfFireStorage);

    db.collection('posts').add({
      userId: user.uid,
      post: post,
      postImg: imageUrlOfFireStorage,
      postTime: FirebaseTimestamp.fromDate(new Date()),
      like: null,
      comments: null,
    }).then(() => {
      // firestoreへのuploadが完了すると、stateを開放する
      setPost('');
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully',
      )
    }).catch((error) => {
      console.log("Something went wrong with added to firestore.", error);
    } )
  }

  return ( 
    <View style={styles.container}>
      <InputWrapper>
        { imageUri != null ? <AddImage source={{uri: imageUri}} /> : null }
        <InputField 
          placeholder='Wahts on your mind?'
          mulitiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? ( 
          <StatusWrapper>
            <Text>{ transferred } % Competed!</Text>
            <ActivityIndicator size='large' color='#0000ff' />
          </StatusWrapper>
        ): 
        <SubmitBtn onPress={submitPost}>
          <SubmitBtnText>Post</SubmitBtnText>
        </SubmitBtn>
        }
      </InputWrapper>

      <FloatingActionButton iconName='plus' onPress={choosePhotoFromLibrary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },

});

export default AddPostScreen;