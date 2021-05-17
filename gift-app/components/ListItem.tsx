import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import Loading from '../screens/LoadingScreen';
import loadFonts from '../utils/loadFonts';






type Props = {
  imageUrl: string;
  title: string;
  author: string;
  onPress: () => void;
}

const ListItem :React.FC<Props> = ({imageUrl, title, author, onPress}) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  // const loadFonts = async() => {
  //   await Font.loadAsync({
  //     Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
  //     ComicSnas: require('../assets/fonts/comicsansms3.ttf')
  //   })
  //   setFontLoaded(false)
  // }
  useEffect(() => {
    loadFonts(setFontLoaded);
  }, []);

  if (fontLoaded) {
    return <Loading message='' />;
  }


  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        {!!imageUrl && <Image style={styles.image} source={{uri: imageUrl}} />}
      </View>
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.text}>
          {title}
        </Text>
        <Text style={styles.subText}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: RFPercentage(4),
    fontFamily: 'Anzumozi',
  },
  subText: {
    fontSize: RFPercentage(2),
    fontFamily: 'Anzumozi',
    color: 'gray',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});


export default ListItem;
