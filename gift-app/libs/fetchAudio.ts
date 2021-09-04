// import * as rssParser from "react-native-rss-parser";
const rssParser = require("react-native-rss-parser");
import { anchorRssUri } from "../constants/endpoint";

const fetchAudio = async (
  setSongs: React.Dispatch<React.SetStateAction<any>>
) => {
  const data = await fetch(anchorRssUri)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      return rss;
    });
  console.log(data.items);
  setSongs(data.items);
  return data.items;
};

export default fetchAudio;
