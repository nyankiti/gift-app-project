import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import Constants from "expo-constants";
import xml2js from 'xml-js';
var convert = require('xml-js');
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

// const BasicAuthURL = Constants.manifest.extra.hatenablog.basic_url;
const BasicAuthURL = "https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry";

const encoded = btoa('nyankiti24:n2z3gsfwue');
const auht = 'Basic ' + encoded;

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
    console.log(item);
    setArticles(item)
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

  // 20210311------------------------------------------------------------------------------------------
  // const fetchArticles = async() => {
  //     // const res = await axios.get('https://qiita.com/api/v2/comments/:comment_id', {
  //     //   auth: {username: Constants.manifest.extra.hatenablog.user_name , password: Constants.manifest.extra.hatenablog.user_password},
  //     //   withCredentials: true
  //     // }
      
  //   try{
  //     const res = await fetch('https://qiita.com/api/v2/', {
  //       // mode: 'no-cors',
  //       method: 'GET',
  //       // credentials: 'include',
  //       // headers: {
  //       //   "Authorization": 'Basic '+btoa('nyankiti24:n2z3gsfwue'),
  //       // },
  //     }).then((response)  => {
  //         // const jsonResponse = convert.xml2json(response.);
  //         console.log(response);
  //     })
  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  // ---axiosではcrosポリシー引っかかる------------------------------------------------------------------------------------

  const fetchArticles = async() => {
    try{
    const res = await axios.get('https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry', {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      // },
      // proxy: {
      //   host: '127.0.0.1',
      //   port: 19006
      // },
      auth: {username: Constants.manifest.extra.hatenablog.user_name , password: Constants.manifest.extra.hatenablog.user_password},
      // withCredentials: false,

      })
    }catch(err){
      console.log(err);
    }
  }
  //     // const res = await fetch('https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry', {
  //     //   mode: 'no-cors',
  //     //   method: 'GET',
  //     //   credentials: 'include',
  //     //   headers: {
  //     //     "Authorization": 'Basic'+btoa('nyankiti24:n2z3gsfwue'),
  //     //   },
  //     ).then((response)  => {
  //         // const jsonResponse = convert.xml2json(response.);
  //         console.log(response);
  //     })
  //   }catch(error){
  //     console.log(error);
    // }
  // }
  // ---------------------------------------------------------------------------------

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
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});