import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import LoadingScreen from '../screens/LoadingScreen';
/* componet */

/* types */

/* lib */

/* context */
import { AuthContext } from '../src/AuthProvider';



export default function NewsDetailScreen() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {user} = useContext(AuthContext);
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async() => {
    setIsLoading(true);

    setIsLoading(false);
  }

  if(isLoading) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={styles.container} >
      <Text>記事詳細</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
