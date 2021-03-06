import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableHighlight, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


/* types */

/* lib */



export default function PostFormExampleScreen() {
  useEffect(() => {
  }, []);


  return (
    <View style={styles.container}>
    <TouchableHighlight onPress={() => {}} style={styles.button}>
      <Text style={styles.buttonText}>
        View Posts
      </Text>
    </TouchableHighlight>
    <TextInput style={styles.title}
      placeholder=" Title"
      />
    <TextInput style={styles.description}
      placeholder=" Description (optional)"
      />
    <TextInput  style={styles.post}
      placeholder=" Post"
      multiline = {true}
      numberOfLines = {4}
    />
    <TouchableHighlight style={styles.button} onPress={() => {}} underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Post</Text>
    </TouchableHighlight>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5
  },
  description: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 5
  },
  post : {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    height: 200,
    padding: 5,
    fontSize: 17
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})
