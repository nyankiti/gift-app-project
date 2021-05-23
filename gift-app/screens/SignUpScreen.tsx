import React, {useState, useContext, useEffect} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Platform, TextInput, StatusBar } from 'react-native';

// react-native moduleがexpoに対応していなくてもexpoが独自のmoduleを用意してくれている可能性がある
import {LinearGradient} from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Loading from '../components/Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Navigation from '../navigation';
import loadFonts from '../utils/loadFonts';
import { windowWidth, windowHeight } from '../utils/Dimentions';
import { RFPercentage } from "react-native-responsive-fontsize";





import { AuthContext } from '../src/AuthProvider';

type Props = {
  navigation: any
}


const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { register } = useContext(AuthContext);


  const textInputChange = (val: string) => {
    if(val.length >= 4){
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      })
    }else{
      setData({
        ...data,
        email: val,
        isValidUser: false
      })
    }
  }

  const handleNameInputChange = (val: string) => {
    setData({
      ...data,
      name: val,
    })
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

  const handleConfirmPasswordChange = (val: string) => {
    setData({
      ...data,
      confirm_password: val,
    })
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const updateConfirmSecureTextEntry = () => {
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

  useEffect(() => {
    loadFonts(setFontLoaded);
  })

  if (fontLoaded) {
    return <Loading />;
  }


  return ( 
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Register Now!</Text>
      </View>
      <View style={styles.formArea} >
        

        <View style={{marginTop: windowHeight*0.03}}></View>

        <Text style={styles.text_footer}></Text>
        <View style={styles.action}>
            <FontAwesome 
              name='user-o'
              color='#05375a'
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
                name='check-circle'
                color='green'
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

        <Text style={[styles.text_footer, {marginTop: 25}]}></Text>
        <View style={styles.action}>
            <FontAwesome 
              name='address-book-o'
              color='#05375a'
              size={20}
            />
            <TextInput 
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(val) => handleNameInputChange(val)}
            />
        </View>

        <Text style={[styles.text_footer, {marginTop: 25}]}></Text>
        <View style={styles.action}>
            <FontAwesome 
              name='lock'
              color='#05375a'
              size={20}
            />
            <TextInput 
              placeholder="New Password"
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
                color='green'
                size={20}
                />
              :
                <Feather 
                name='eye'
                color='green'
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

        <Text style={[styles.text_footer, {marginTop: 25}]}></Text>
        <View style={styles.action}>
            <FontAwesome 
              name='lock'
              color='#05375a'
              size={20}
            />
            <TextInput 
              placeholder="Confirm Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
            >
              {/* 状況に応じて文字を 隠すor見せる でFeatherアイコンを変更する*/}
              {data.secureTextEntry ?  
                <Feather 
                name='eye-off'
                color='green'
                size={20}
                />
              :
                <Feather 
                name='eye'
                color='green'
                size={20}
                />
              }
            </TouchableOpacity>
        </View>

      </View>
      <View style={styles.buttonArea}>
          <View style={styles.button}>
            <TouchableOpacity 
              onPress={() => register(data.email, data.password, data.name)}
              style={styles.signIn}
            >
                <Text style={[styles.textSign, {color: '#EAC799'}]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footer_text}>Go to Sign in Screen</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')} >
            <Text style={styles.footer_button_text}>Sign in</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  header: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: windowWidth*0.05,
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
  },
  buttonArea: {
    flex: 2
  },
  footer: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 10,
      alignSelf: 'center'
  },
  footer_text:{
    fontSize: RFPercentage(2.6),
    fontFamily: 'ComicSnas',
    padding: 10,
  },
  footer_button_text: {
    fontSize: RFPercentage(3.6),
    fontFamily: 'ComicSnas_bd',
    marginLeft: 10,
    // marginTop: 5,
  },
  formArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header_text: {
    fontSize: RFPercentage(5),
    fontFamily: 'ComicSnas',
    marginTop: windowHeight*0.02,
    marginBottom: windowHeight*0.04
  },
  
});



export default SignUpScreen;