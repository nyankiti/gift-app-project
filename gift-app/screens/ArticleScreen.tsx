import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';
import HTML from 'react-native-render-html';
var DomParser = require('react-native-html-parser').DOMParser;
import { windowHeight, windowWidth } from '../utils/Dimentions';
import * as Font from 'expo-font';



const ArticleScreen = ({route}) => {
  // const {route} = props;
  const {article} = route.params;
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
    console.log(article.html);
    // extractImageSrc(article.html);
  }, []);


  const extractImageSrc = (html) => {
    const doc = new DomParser().parseFromString(html, 'text/html')
    console.log(doc);
  }


  const renderHTML = () => {
    // fontSize: 150% を修正するコードをここに
    let html = article.html
  }

  if (fontLoaded) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      {/* <WebView
        source={{html: article.html}}
        startInLoadingState={true}
        renderLoading={() => {
          return <Loading />;
        }}
      /> */}
      <HTML
        // html={ article.html }
        source={{html: article.html}}
        contentWidth={windowWidth*0.9}
        baseFontStyle={{
          fontSize: 20,
          fontFamily: 'Anzumozi',
          // lineHeight: 22,
          textAlign: 'justify',
        }}
        tagsStyles={{strong: {fontSize: 25, fontFamily: 'ComicSnas_bd'}}}
        // ignoredTags={['span']}
      />
    </ScrollView>
  );
};
export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});