import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator} from 'react-native';
import Loading from '../components/Loading';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import * as Font from 'expo-font';



const ArticleScreen: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  const loadFonts = async() => {
    await Font.loadAsync({
      Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
      ComicSnas: require('../assets/fonts/comicsansms3.ttf'),
      ComicSnas_bd: require('../assets/fonts/comicbd.ttf'),
    })
    setFontLoaded(false)
  }
  useEffect(() => {
    loadFonts();
  }, []);


  if (fontLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>準備中...</Text>
    </SafeAreaView>
  );
};
export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 20,
    color: "#888",
  },
});