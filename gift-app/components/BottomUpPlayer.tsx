import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { height } from "../libs/utils/Dimension";

const BottomUpPlayer = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: height * 0.9,
        zIndex: 99,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );
};

export default BottomUpPlayer;

const styles = StyleSheet.create({});
