import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { createSecureServer } from 'http2';

/* types */
import {User} from '../types';
/* lib */
import {getUsers} from '../src/firebase'; 




export default function TabOneScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const users = await getUsers();
    setUsers(users) 
  }


  const UserItems = users.map((user, index) => (
    <View key={index.toString()}>
      <Text>{user.name}</Text>
    </View>
  ))

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      {UserItems}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
