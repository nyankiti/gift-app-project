import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import addOAuthInterceptor from "axios-oauth-1.0a";
import {WebView} from 'react-native-webview';
import Constants from "expo-constants";
import moment from 'moment';
// import oauth from 'axios-oauth-client';
import { Text, View } from '../components/Themed';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
/* types */

/* lib */




const DevelopScreen: React.FC = () => {



  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{uri: 'https://nyankiti24.hatenablog.com/'}} />
    </SafeAreaView>
  );
};

export default DevelopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});