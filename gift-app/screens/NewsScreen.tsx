import React, {useEffect, useState} from 'react';
import { StyleSheet, SafeAreaView, FlatList, ScrollView, ActivityIndicator } from 'react-native';
// import {Content} from 'native-base';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import Constants from "expo-constants";
import moment from 'moment';
import base64 from 'react-native-base64'
var parseString = require('react-native-xml2js').parseString;
var DomParser = require('react-native-html-parser').DOMParser;
// import oauth from 'axios-oauth-client';
import { Text, View } from '../components/Themed';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
/* types */



const GiftBlogPageList = [1588494655, 1583932861, 1554912303, 1522322442, 1505971397, 1499956565, 1496681211]


const BasicAuthURL = "https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry";


const pattern = /(src=)["|'](.*?)["|']+/g

const NewsScreen: React.FC = ({navigation}) => {
  let item_list: any = [];
  var articles_list = [];
  const [loading, setLoading] = useState(false);
  const [isLoadingEnabled, setIsLoadingEnabled] = useState(true);
  const [pageCounter, setPageCounter] = useState(1);
  const [articles, setArticles] = useState<any>([]);


  const fetchArticles = async(url: string) => {

      let headers = new Headers();
      // headers.set('Authorization', 'Basic ' + base64.encode(Constants.manifest.extra.hatenablog.user_name + ":" + Constants.manifest.extra.hatenablog.APIKey));
      headers.set('Authorization', 'Basic ' + base64.encode("seiproject" + ":" + "tbevqkdqnc"));
      await fetch(url, { 
      // await fetch('https://blog.hatena.ne.jp/nyankiti24/nyankiti24.hatenablog.com/atom/entry', { 

        method: 'GET',
        headers: headers
      }).then(response => response.text())
      .then((response) => {
        parseString(response, {trim: true}, (err, result) => {
          console.log(result['feed']['entry']);
          const entry = result['feed']['entry'];
          console.log(result['feed']['link'][1]['$']['href']);
          const next_url = result['feed']['link'][1]['$']['href'];

          insertItems(entry, item_list);
          // console.log(item_list);
          // fetchして来た配列を既存の配列とつなげてからstateを更新する
          // item_list.forEach(item => {
          //   if (!articles.includes(item)){
          //     articles_list.push(item);
          //   }
          // })
          setArticles(articles.concat(item_list));
        } )
        // console.log(response);
        return response;
      })

  }
  const fetchMoreArticles = async() => {
    setPageCounter(pageCounter + 1);
    console.log(GiftBlogPageList[pageCounter]);
    await fetchArticles(`https://blog.hatena.ne.jp/seiproject/seiproject.hateblo.jp/atom/entry?page=${GiftBlogPageList[pageCounter]}`);
  }

  const extractImageSrc = (html) => {
    // htmlparserを用いてimgのsrc属性を取るには膨大な時間がかかる
    // const doc = new DomParser().parseFromString(html, 'text/html')
    // 代わりに正規表現を用いる
    const src = html.match(pattern);
    // console.log(src);
    console.log(src[0].slice(5, -1));
    return src[0].slice(5, -1);
  }

  // 下書きを除く記事を配列に追加する。
  const insertItems = (entry: any, item_list: any) => {
    for (let e of entry) {
      if (e["app:control"][0]["app:draft"][0] == "yes") {
        // 下書き記事をスキップする。
        continue;
      }
      const imageUrl = extractImageSrc(e.content[0]["_"]);
      // console.log(e.content[0]["_"]);
      // はてな記事のJSONを生成。
      const item = {
        day: moment(e.published.toString()).format("YYYY-MM-DD"),
        title: e.title.toString(),
        href: e.link[1].$.href,
        html: e.content[0]["_"],
        imageUrl: imageUrl
      }
      item_list.push(item);
    }
  };

  useEffect(() => {
      fetchArticles('https://blog.hatena.ne.jp/seiproject/seiproject.hateblo.jp/atom/entry');
      fetchArticles(`https://blog.hatena.ne.jp/seiproject/seiproject.hateblo.jp/atom/entry?page=${GiftBlogPageList[0]}`);
  }, []);
  

  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <FlatList
        data={articles}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ListItem
            imageUrl={item.imageUrl}
            title={item.title}
            author={'Gift 管理者'}
            onPress={() =>
              navigation.navigate('ArticleScreen', {article: item})
            }
          />
        )}
        onEndReached={pageCounter < GiftBlogPageList.length ? fetchMoreArticles : null}
        onEndReachedThreshold={0.1}
        ListFooterComponent={ActivityIndicator}
      />
      {/* <WebView source={{uri: 'https://nyankiti24.hatenablog.com/edit'}} /> */}
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});