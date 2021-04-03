import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios';
import addOAuthInterceptor from "axios-oauth-1.0a";
import {WebView} from 'react-native-webview';
import Constants from "expo-constants";
import moment from 'moment';
import base64 from 'react-native-base64'
var parseString = require('react-native-xml2js').parseString;
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

const DevelopScreen: React.FC = ({navigation}) => {
  let item_list: any = [];
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([{
    day: '',
    title: '',
    href: '',
    html: '',
  }]);


  const fetchArticles = async() => {

      let headers = new Headers();
      headers.set('Authorization', 'Basic ' + base64.encode(Constants.manifest.extra.hatenablog.user_name + ":" + Constants.manifest.extra.hatenablog.APIKey));
      await fetch('https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry', { 
        method: 'GET',
        headers: headers
      }).then(response => response.text())
      .then((response) => {
        parseString(response, {trim: true}, (err, result) => {
          console.log(result['feed']['entry']);
          const entry = result['feed']['entry'];
          // console.log(result['feed']['link'][1]['$']['href']);
          const next_url = result['feed']['link'][1]['$']['href'];

          insertItems(entry, item_list)
          console.log(item_list);
          setArticles(item_list);
        } )
        // console.log(response);
        return response;
      })

  }

  // 下書きを除く記事を配列に追加する。
  const insertItems = (entry: any, item_list: any) => {
    for (let e of entry) {
      if (e["app:control"][0]["app:draft"][0] == "yes") {
        // 下書き記事をスキップする。
        continue;
      }
      console.log('AAA');
      console.log(e.content[0]["_"]);
      // はてな記事のJSONを生成。
      const item = {
        day: moment(e.published.toString()).format("YYYY-MM-DD"),
        title: e.title.toString(),
        href: e.link[1].$.href,
        html: e.content[0]["_"]
      }
      item_list.push(item);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <FlatList
        data={articles}
        showsVerticalScrollIndicator={true}
        renderItem={({item}) => (
          <ListItem
            imageUrl='https://thumb.photo-ac.com/a9/a9e8d7bcc93603347b5ae99dad27538e_t.jpeg'
            title={item.title}
            author={'早田健太郎'}
            onPress={() =>
              navigation.navigate('Article', {article: item})
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* <WebView source={{uri: 'https://nyankiti24.hatenablog.com/edit'}} /> */}
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