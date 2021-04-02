import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import addOAuthInterceptor from "axios-oauth-1.0a";
import {WebView} from 'react-native-webview';
import Constants from "expo-constants";
import moment from 'moment';
import base64 from 'react-native-base64'
// import oauth from 'axios-oauth-client';
import { Text, View } from '../components/Themed';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
/* types */

/* lib */

// import * as dotenv from 'dotenv';
// dotenv.config({ pash: __dirname+'/.env' });
// require('dotenv').config({path: __dirname+'/.env'})




const OAuthInitialURL = 'https://www.hatena.com/oauth/initiate';

// const BasicAuthURL = Constants.manifest.extra.hatenablog.basic_url;
const BasicAuthURL = "https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry";

// const encoded = btoa('nyankiti24:n2z3gsfwue');
// const auth = 'Basic ' + encoded;

const HatenaConfig = {
  clientID: '',
  clientSecret: '',
  callbackURL: '',
  profileFields: ['id', 'name', 'display', 'picture', 'email']
}

const DevelopScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);


  
  useEffect(() => {
    const item = fetchArticles();
    setArticles(item)
  }, []);


  const fetchArticles = async() => {

      let headers = new Headers();
      headers.set('Authorization', 'Basic ' + base64.encode(Constants.manifest.extra.hatenablog.user_name + ":" + Constants.manifest.extra.hatenablog.APIKey));
      fetch('https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry', { 
        method: 'GET',
        headers: headers
      }).then(response => response.text())
      .then((response) => {
        console.log(response);
        return response;
      })

  }

  // 下書きを除く記事を配列に追加する。
  const insertItems = (entry, item_list) => {
    for (let e of entry) {
      if (e["app:control"][0]["app:draft"][0] == "yes") {
        // 下書き記事をスキップする。
        continue;
      }

    // はてな記事のJSONを生成。
    const item = {
      day: moment(e.published.toString()).format("YYYY-MM-DD"),
      title: e.title.toString(),
      href: e.link[1].$.href
    }
    item_list.push(item);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* {articles} */}
      {/* {loading && <Loading />}
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() =>
              props.navigation.navigate('Article', {article: item})
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}
      <WebView source={{uri: 'https://nyankiti24.hatenablog.com/edit'}} />
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