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
      <SafeAreaView>
      <StatusBar backgroundColor='#EAC799' barStyle='light-content' />
      <View style={styles.header}>
        <Text style={styles.text_header} >Resister Now!</Text>
      </View>
      <Animatable.View 
        animation='fadeInUpBig'
        style={styles.footer}
      >
        <Text style={styles.text_footer}>Email</Text>
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

        <Text style={[styles.text_footer, {marginTop: 35}]}>Your Name</Text>
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

        <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
        <View style={styles.action}>
            <FontAwesome 
              name='lock'
              color='#05375a'
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

        <Text style={[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>
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


        <View style={styles.button}>
          <TouchableOpacity 
            onPress={() => register(data.email, data.password, data.name)}
            style={styles.signIn}
          >
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}
              >
              <Text style={[styles.textSign, {color: '#ffff'}]}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SplashScreen')}
            // goBackメソッドでも同じ動作を実現できる
            // onPress={() => navigation.goBack()}
            style={[styles.signIn, {borderColor:"#EAC799", borderWidth: 1, marginTop: 15}]}
          >
            <Text style={[styles.textSign, {color: '#EAC799'}]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#EAC799'
  },
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      marginTop: 50,
      marginBottom:10
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
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
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
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
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});



export default SignUpScreen;