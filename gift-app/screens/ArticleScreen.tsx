import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';
import HTML from 'react-native-render-html'; 
import { windowHeight, windowWidth } from '../utils/Dimentions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ArticleScreen = ({route}) => {
  // const {route} = props;
  const {article} = route.params;

  useEffect(() => {
    console.log(article.html)
  }, [])

  const renderHTML = () => {
    // fontSize: 150% を修正するコードをここに
    let html = article.html
  }


  return (
    <ScrollView style={styles.container}>
      {/* <WebView
        source={{uri: article.href}}
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
          // fontSize: 14,
          // lineHeight: 22,
          // textAlign: 'justify',
        }}
      />
    </ScrollView>
  );
};
export default ArticleScreen;