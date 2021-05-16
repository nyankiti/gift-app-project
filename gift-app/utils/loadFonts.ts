import * as Font from 'expo-font';

const loadFonts = async(setFontLoaded: (bool: boolean) => void) => {
  await Font.loadAsync({
    Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
    ComicSnas: require('../assets/fonts/comicsansms3.ttf'),
    ComicSnas_bd: require('../assets/fonts/comicbd.ttf')
  })
  setFontLoaded(false)
};

export default loadFonts;