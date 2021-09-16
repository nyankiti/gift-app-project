import React from "react";
import { StyleSheet, Image } from "react-native";
import { width } from "../../libs/utils/Dimension";

const Poster = () => {
  return (
    <Image
      source={require("../../assets/images/gift_kanban.jpg")}
      style={styles.container}
    />
  );
};

export default Poster;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginLeft: -85,
    height: width * 0.7 * 1.44,
    width: width * 1.44,
    transform: [{ rotate: "90deg" }],
  },
});
