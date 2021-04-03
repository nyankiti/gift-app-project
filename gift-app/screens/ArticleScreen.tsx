import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';
import HTML from 'react-native-render-html'; 

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



  return (
    <SafeAreaView style={styles.container}>
      {/* <WebView
        source={{uri: article.href}}
        startInLoadingState={true}
        renderLoading={() => {
          return <Loading />;
        }}
      /> */}
      <HTML
        html={ article.html }
        baseFontStyle={{
          fontSize: 14,
          lineHeight: 22,
          textAlign: 'justify',
        }}
      />
    </SafeAreaView>
  );
};
export default ArticleScreen;