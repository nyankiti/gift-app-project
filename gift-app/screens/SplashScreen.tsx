import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, 
  Image, TouchableOpacity, Platform, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
// react-native moduleがexpoに対応していなくてもexpoが独自のmoduleを用意してくれている可能性がある
// import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage } from "react-native-responsive-fontsize";
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import loadFonts from '../utils/loadFonts';

import Loading from '../screens/LoadingScreen';
import { AuthContext } from '../src/AuthProvider';
import { windowWidth, windowHeight } from '../utils/Dimentions';

type Props = {
  navigation: any
}

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    successLogin: true,
  });

  const { login, setUser } = useContext(AuthContext)

  const textInputChange = (val: string) => {
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

  const handlePasswordChange = (val: string) => {
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

  const handleValidUser = (val: string) => {
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

  const handleValidPassword = (val: string) => {
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

  const handlePressLogin = async () => {
    await login(data.email, data.password)
    setData({
      ...data,
      successLogin: false
    })
  }

  useEffect(() => {
    loadFonts(setFontLoaded);
  })

  if (fontLoaded) {
    return <Loading message='読込中' />;
  }


  return ( 
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Lines</Text>
      </View>
      <View style={styles.centerTextArea}>
        <Text style={styles.center_text} >Welcome to Gift Account,</Text>
        <Text style={styles.center_text} >sign in to continue Lines.</Text>
      </View>
      <View style={styles.formArea} >
        

        <View style={{marginTop: windowHeight*0.03}}></View>

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

          <View style={{marginTop: windowHeight*0.05}}></View>
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
          { data.successLogin ? null :
          <Animatable.View animation='fadeInLeft' duration={500}>
            <Text style={styles.errorMsg}>EmailまたはPasswordが間違っています</Text>
          </Animatable.View>
          }
      </View>
      <View style={styles.buttonArea}>
          <View style={styles.button}>
            <TouchableOpacity 
              onPress={handlePressLogin}
              style={styles.signIn}
            >
                <Text style={[styles.textSign, {color: '#EAC799'}]}>Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footer_text}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} >
            <Text style={[styles.footer_text, {fontFamily: 'ComicSnas_bd'}]}>Sign up</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const input_width = windowWidth * 0.8

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor:"black", 
    borderWidth: 1,
    margin: windowWidth*0.03,
  },
  // headerとfooterが2:1となるようにそれぞれchildren要素にもflexを指定
  header: {
    flex: 2,
    justifyContent: 'center',
    // alignItems: 'center'
    marginLeft: windowWidth*0.05,
  },
  header_text: {
    fontSize: RFPercentage(6),
    fontFamily: 'ComicSnas',
    marginTop: windowHeight*0.02,
    marginBottom: windowHeight*0.04
  },
  centerTextArea: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // fontFamilyとfontWeight: 'bold'は同時に指定できないのでfontFamilyで直接太い文字を指定する
  center_text:{
    fontSize: RFPercentage(4.5),
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ComicSnas_bd',
    // fontFamily: 'serif',
    padding: windowHeight*0.02,
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
      flexDirection: 'row',
      paddingVertical: windowHeight*0.03,
      paddingLeft: windowWidth*0.03,
  },
  footer_text:{
    fontSize: RFPercentage(3),
    fontFamily: 'ComicSnas',
    padding: 10,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ComicSnas',
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
      marginTop: windowHeight*0.08
  },
  signIn: {
      // width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: windowWidth*0.06,
  },
  textSign: {
      fontSize: RFPercentage(4),
      // fontWeight: 'bold',
      fontFamily: 'ComicSnas_bd',
  }


});



export default SplashScreen;