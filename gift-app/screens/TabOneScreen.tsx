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
  }, []);



  return (
    <View style={styles.container}>
      
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
