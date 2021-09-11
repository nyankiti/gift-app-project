const rssParser = require("react-native-rss-parser");

const fetchAudio = async () => {
  const data = await fetch("https://anchor.fm/s/67fb36c0/podcast/rss")
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      return rss;
    });

  return data.items;
};

export default fetchAudio;
