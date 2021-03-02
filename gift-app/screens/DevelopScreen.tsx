import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import Constants from "expo-constants";
import xml2js from 'xml2js';
import moment from 'moment';
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

const BasicAuthURL = Constants.manifest.extra.hatenablog.basic_url;

const HatenaConfig = {
  clientID: '',
  clientSecret: '',
  callbackURL: '',
  profileFields: ['id', 'name', 'display', 'picture', 'email']
}

export default function DevelopScreen() {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);


  
  useEffect(() => {
    const item = fetchArticles();
    console.log('ここからコンソールだよ');
    console.log(item);
  }, []);


  // OAuth認証用 時間があれば現行のBasic認証ではなくこっちに変えたい
  // const fetchArticles = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios({
  //       method: 'post',
  //       url: OAuthURL,
  //       headers: {
  //         'Authorization': {
  //           'oauth_callback':"oob",
  //           'oauth_consumer_key':"nfmuJazszARD7A==",
  //           'oauth_nonce':"0c670efea71547422662",
  //           'oauth_signature':"lvQC7AXTRIaqxbjwVGgPlYuNaaw%3D",
  //           'oauth_signature_method':"HMAC-SHA1",
  //           'oauth_timestamp':"1291689730",
  //           'oauth_version':"1.0",
  //         'Content-Type': "application/x-www-form-urlencoded",
  //         'Content-Length': 33
  //         }
  //       },
  //     });
  //     setArticles(response.data.articles);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setLoading(false);
  // };

  const fetchArticles = async() => {
    try{
      // const res = await axios.get(BasicAuthURL, 
      //   {auth: {username: 'nyankiti24', password: 'n2z3gsfwue'}},
      //   );
      const res = await axios.get(BasicAuthURL, {
        auth: {username: Constants.manifest.extra.hatenablog.user_name , password: Constants.manifest.extra.hatenablog.user_password},
        withCredentials: true
      }).then((response)  => {
        const res = response.data.articles
      })
      return res;
    }catch(err){
      console.error(err);
    }
  }
  // fetchした状態ではXMLなので扱いやすいjsonに整形するためのメソッド
  // const extractItemsAndNextUri = async(data) => {
  //   return new Promise((resolve, reject) => {
  //     xml2js.parseString(data.toString(), (err, result) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const entry = result.feed.entry;
  //         const next_url = result.feed.link[1].$.href;
  //         resolve({ entry, next_url });
  //       }
  //     });
  //   });
  // };

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
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});