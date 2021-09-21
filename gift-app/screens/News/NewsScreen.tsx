import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl
} from "react-native";
import { db } from "../../libs/firebae";
/* conponents */
import ListItem from "../../components/News/ListItem";
import Loading from "../../components/Loading";
import Screen from "../Screen";
/* types */
import { NewsTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";

type NewsScreenNavigationProps = StackScreenProps<
  NewsTabParamList,
  "NewsScreen"
>;

const NewsScreen: React.FC<NewsScreenNavigationProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [nextSnapshot, setNextSnapshot] = useState<any>(null);
  const [articles, setArticles] = useState<any>([]);
  var list: any = [];

  const fetchArticles = async () => {
    try {
      await db
        .collection("news")
        .orderBy("created_at", "desc")
        .limit(30)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { author, html, imageUrl, title, create_at } = doc.data();
            list.push({
              id: doc.id,
              author: author,
              title: title,
              imageUrl: imageUrl,
              html: html,
              create_at: create_at,
            });
          });
          setArticles(list);

          setNextSnapshot(querySnapshot.docs[querySnapshot.docs.length - 1]);

          if (loading) {
            setLoading(false);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNextArticles = async () => {
    list = articles;
    try {
      return await db
        .collection("news")
        .orderBy("created_at", "desc")
        .startAt(nextSnapshot)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc)
            const { author, html, imageUrl, title, create_at } = doc.data();
            list.push({
              id: doc.id,
              author: author,
              title: title,
              imageUrl: imageUrl,
              html: html,
              create_at: create_at,
            });
          });
          setArticles(list);

          // 追加で記事を取得するのは一度だけなので以下のstateはnullに戻す
          setNextSnapshot(null);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(async() => {
      await fetchNextArticles()
      setLoading(false)
    }, 1000)
  }

  return (
    <Screen>
      <FlatList
        data={articles}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.imageUrl}
            title={item.title}
            author={"Gift 管理者"}
            onPress={() =>
              navigation.navigate("ArticleScreen", { article: item })
            }
          />
        )}
        onEndReached={() => {
          if (nextSnapshot) {
            fetchNextArticles();
          }
        }}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl 
            refreshing={loading}
            onRefresh={() => handleRefresh()}
          />
        }
      />
      {/* <WebView source={{uri: 'https://nyankiti24.hatenablog.com/edit'}} /> */}
    </Screen>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({});
