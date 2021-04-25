import React, {useEffect, useContext, useState, createRef, useRef} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Alert, Platform } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Font from 'expo-font';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

/* conponent */
import Loading from '../components/Loading';


/* types */
import {User} from '../types';

/* lib */
import { FirebaseTimestamp, db, storage } from '../src/firebase';
import { pickImage } from "../src/image-picker";
import { getExtension, formatDateUntilMinute } from '../utils/file'

/* context */
import { AuthContext } from '../src/AuthProvider';




const EditProfileScreen = () => {
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState({
    'userImg': '',
    'fname': '',
    'lname': '',
    'email': '',
    'phone': '',
    'about': '',
    'city': ''
  });


  const bs = useRef();
  const fall = new Animated.Value(1);

  const loadFonts = async() => {
    await Font.loadAsync({
      Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
      // ComicSnas: require('../assets/fonts/comicsansms3.ttf'),
      ComicSnas_bd: require('../assets/fonts/comicbd.ttf')
    })
    setFontLoaded(false)
  }


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

  const handleUpdate = async() => {
    let imgUrl = await uploadImage()

    if( imgUrl == null && userData.userImg ){
      imgUrl = userData.userImg;

    }

    db.collection('users').doc(user.uid).update({
      fname: userData.fname,
      lname: userData.lname,
      about: userData.about,
      phone: userData.phone,
      city: userData.city,
      userImg: imgUrl,
    }).then(() => {
      Alert.alert(
        'Profile Update!',
        'Your profile has been updated successfully'
      );
    })
    await getUser();
  }

  const uploadImage = async() => {
    
    if( image == ""){
      return null;
    }

    setUploading(true);

    const uploadUri = image;
    const extension = getExtension(uploadUri);
    const date_for_filename = formatDateUntilMinute();
    const filename = date_for_filename + "." + extension;
    console.log(filename);

    
    let storagePath = `users/${user.uid}.${extension}`;

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
      setImage(null);

      return urlOfFireStorage
    }catch(e){
      console.log(e);
      return null;
    }

  }

  const choosePhotoFromLibrary = async() => {
    const uri = await pickImage();
    setImage(uri);
    bs.current.snapTo(1);
  }

  
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    loadFonts();
  })

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo </Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButtonTitle} >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButtonTitle} onPress={choosePhotoFromLibrary} >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButtonTitle} onPress={() => bs.current.snapTo(1)} >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  if (fontLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <BottomSheet 
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      {/* Opacityを以下のように指定することでBottomSheetが出てきたときに後ろの画面を透明にしている */}
      <Animated.View style={{margin: 20, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0))}} >

        <View style={{margin: 20}} >
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View style={{
                height: 100, 
                width: 100, 
                borderRadius: 15, 
                justifyContent: 'center', 
                alignItems: 'center',
              }}>
                <ImageBackground
                  source={{
                    uri: image ? image : userData.userImg ? userData.userImg  || 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg' : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}
                >
                  <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{marginTop: 10, fontSize: 18, fontFamily: 'ComicSnas_bd'}}>
              {userData ? userData.fname : ''} {userData ? userData.lname : ''}
            </Text>
          </View>
          <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData.fname ? userData.fname : ''}
            onChangeText={(txt) => setUserData({...userData, fname: txt})}
            style={styles.textInput}
          />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" size={20} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData.lname ? userData.lname : ''}
              onChangeText={(txt) => setUserData({...userData, lname: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="ios-clipboard-outline" color="#333333" size={20} />
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="About Me"
              placeholderTextColor="#666666"
              value={userData.about ? userData.about : ''}
              onChangeText={(txt) => setUserData({...userData, about: txt})}
              autoCorrect={true}
              style={[styles.textInput, {height: 40}]}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color="#333333" size={20} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              value={userData.phone ? userData.phone : ''}
              onChangeText={(txt) => setUserData({...userData, phone: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Icon name="map-marker-outline" size={20} />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData.city ? userData.city : ''}
              onChangeText={(txt) => setUserData({...userData, city: txt})}
              style={styles.textInput}
            />
          </View>
          <FormButton buttonTitle='Update' onPress={handleUpdate} />
        </View>
      </Animated.View>
    </View>
  );
}

export default EditProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    fontFamily: 'Anzumozi',
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    // fontSize: 17,
    // fontWeight: 'bold',
    // color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 18,
    fontFamily: 'Anzumozi',
  },
});