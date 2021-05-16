import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, SafeAreaView, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Constants from "expo-constants";
import { db } from '../src/firebase';
import { Text, View } from '../components/Themed';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import { AuthContext } from '../src/AuthProvider';
/* types */




const NewsScreen: React.FC = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<any>([]);

  const getUser = async() => {
    await db.collection('users').doc(user.uid).get()
      .then(async(documentSnapshot) => {
        if(documentSnapshot.exists){
          setUser(documentSnapshot.data());
        }
      })
  }


  const fetchArticles = async() => {
    try{
      const list: any = []

      await db.collection('news').orderBy('created_at', 'desc').get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const {author, html, imageUrl, title, create_at} = doc.data();
          list.push({
            id: doc.id,
            author: author,
            title: title,
            imageUrl: imageUrl,
            html: html,
            create_at: create_at
          });
        })

        setArticles(list);

        if(loading){
          setLoading(false);
        }

      } )
    }catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
      fetchArticles();
  }, []);

  useEffect(() => {
    // login時の最初にuserのcontextをfirestoreの情報で上書きして、どこでもユーザー情報にアクセスできるようにする
    getUser();
    // fetchArticlesと時間をずらすためにloadingがfalseになってから密かにgetUserする
  }, [loading])
  
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
        // onEndReached={}
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