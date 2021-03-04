import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, 
  Image, TouchableOpacity, Platform, TextInput } from 'react-native';
// react-native moduleがexpoに対応していなくてもexpoが独自のmoduleを用意してくれている可能性がある
// import LinearGradient from 'react-native-linear-gradient';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';

import { AuthContext } from '../src/AuthProvider';


const SplashScreen = ({navigation}) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { login } = useContext(AuthContext)

  const [loaded] = useFonts({
    Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
    ComicSnas: require('../assets/fonts/comicsansms3.ttf')
  });

  const textInputChange = (val) => {
    if(val.trim().length >= 4){
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,

      })
    }else{
      setData({
        ...data,
        email: val,
        isValidUser: false
      })
    }
  }

  const handlePasswordChange = (val) => {
    if(val.trim().length >= 8){
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      })
    }else{
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      })
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4){
      setData({
        ...data,
        isValidUser: true
      })
    }else{
      setData({
        ...data,
        isValidUser: false
      })
    }
  }

  const handleValidPassword = (val) => {
    if (val.trim().length >= 8){
      setData({
        ...data,
        isValidPassword: true
      })
    }else{
      setData({
        ...data,
        isValidPassword: false
      })
    }
  }




  return ( 
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Lines</Text>
      </View>
      <View style={styles.centerTextArea}>
        <Text style={styles.center_text} >Welcome to Gift Account,</Text>
        <Text style={styles.center_text} >sign in to continue Lines.</Text>
      </View>
      <View style={styles.formArea} >
        

        <Text style={[styles.text_footer, {marginTop: 20}]}></Text>

          <View style={styles.action}>
              <FontAwesome 
                name='user-o'
                color='#EAC799'
                size={20}
              />
              <TextInput 
                placeholder="Your Email"
                style={styles.textInput}
                autoCapitalize='none'
                onChangeText={(val) => textInputChange(val)}
                onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              />
              {/* テキスト入力されたことを確認してcheck-circleのアイコンを表示させる */}
              {data.check_textInputChange ?
              <Animatable.View
                animation='bounceIn'
              >
                <Feather 
                  name='check'
                  color='#EAC799'
                  size={20}
                  />
              </Animatable.View>
              : null  }
          </View>
          { data.isValidUser ? null :
            <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={styles.errorMsg}>Emailは4文字以上必要です</Text>
            </Animatable.View>
          }

          <Text style={[styles.text_footer, {marginTop: 40}]}></Text>
          <View style={styles.action}>
              <FontAwesome 
                name='lock'
                color='#EAC799'
                size={20}
              />
              <TextInput 
                placeholder="Your Password"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize='none'
                onChangeText={(val) => handlePasswordChange(val)}
                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
              />
              <TouchableOpacity
                onPress={updateSecureTextEntry}
              >
                {/* 状況に応じて文字を 隠すor見せる でFeatherアイコンを変更する*/}
                {data.secureTextEntry ?  
                  <Feather 
                  name='eye-off'
                  color='#EAC799'
                  size={20}
                  />
                :
                  <Feather 
                  name='eye'
                  color='#EAC799'
                  size={20}
                  />
                }
              </TouchableOpacity>
          </View>
          { data.isValidPassword ? null :
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={styles.errorMsg}>Passwordは8文字以上必要です</Text>
          </Animatable.View>
          }
      </View>
      <View style={styles.buttonArea}>
          <View style={styles.button}>
            <TouchableOpacity 
              onPress={() => {
                login(data.email, data.password)
              }}
              style={styles.signIn}
            >
                <Text style={[styles.textSign, {color: '#EAC799'}]}>Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footer_text}>Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} >
            <Text style={[styles.footer_text, {fontWeight: 'bold'}]}>Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const {width} = Dimensions.get("screen");
const input_width = width * 0.8

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor:"black", 
    borderWidth: 1,
    margin: 30,
  },
  // headerとfooterが2:1となるようにそれぞれchildren要素にもflexを指定
  header: {
    flex: 2,
    justifyContent: 'center',
    // alignItems: 'center'
    marginLeft: 45
  },
  header_text: {
    fontSize: 40,
    fontFamily: 'ComicSnas, Anzumozi',
  },
  centerTextArea: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center_text:{
    fontSize: 30,
    fontFamily: 'ComicSnas, Anzumozi',
    padding: 15,
  },
  formArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonArea: {
    flex: 2
  },
  footer: {
      flex: 1,
      paddingVertical: 50,
      paddingHorizontal: 30,
  },
  footer_text:{
    fontSize: 15,
    fontFamily: 'ComicSnas, Anzumozi',
    padding: 10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAC799',
    paddingBottom: 5,
    width: input_width,
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'flex-start',
      marginTop: 50
  },
  signIn: {
      // width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 20,
  },
  textSign: {
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'ComicSnas, Anzumozi',
  }


});



export default SplashScreen;