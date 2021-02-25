import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import React, {useEffect, useState, useCallback} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Navigation from '../navigation';

import { auth } from "../src/firebase";



/* types */
import { RootStackParamList } from '../types';
/* lib */


//Propsの型情報(types)はそれぞれのreact componentで異なるのでtype.tsでは管理せず、各ファイルの初めに定義する 
// 型引数の２つ目はデフォルト値
type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Auth">;
  route : RouteProp<RootStackParamList, "Auth">;
}

type Username = {
  name : string,
}

export default function AccountInfoScreen( {navigation, route}: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    // onAuthStateChangedの引数のuserにはfirebaseが自動的にログインしたユーザーの情報を入れてくれる
    // つまりuserになにかの情報が入っていれば認証が成功しているということ
    auth.onAuthStateChanged((user) => {
      // userが存在すればトップページへ遷移
      user && (() => {navigation.navigate("Root")})
    })
  }, []);


  // useCallbackを使ってstateをメモ化すると動きが早くなる
  const inputUsername = useCallback( callback:(event) => {
    setUsername(event.target.value)
  }, deps: [setUsername]);

  const inputPassword = useCallback( callback:(event) => {
    setUsername(event.target.value)
  }, deps: [setPassword]);

  return (
    <View style={styles.container}>
      <TextInput
        name="UserName"
        label="UserName"
        value={username}
        // onChangeText={text => setUsername(text)}
        onChangeText={inputUsername}
        style={styles.InputText}
      />
      <TextInput
        name="password"
        label="Password"
        value={password}
        // onChangeText={text => setPassword(text)}
        onChangeText={setPassword}
        style={styles.InputText}
      />
      <TouchableOpacity onPress={ () => {navigation.navigate("Root")} } style={styles.button} ><Text>ログイン</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgreen'
  },
  InputText: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: '10px'
  }
});
