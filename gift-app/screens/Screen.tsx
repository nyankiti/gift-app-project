import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import color from "../constants/color";

// paddingTopにStatusBarの高さを指定するためなど、全てのScreenはこのFCを継承する
const Screen: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_BG,
    // 以下のようにStatuBarの高さを全体から変更することもできる
    // paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
