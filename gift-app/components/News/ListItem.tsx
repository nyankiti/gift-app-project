import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

type Props = {
  imageUrl: string;
  title: string;
  author: string;
  onPress: () => void;
};

const ListItem: React.FC<Props> = ({ imageUrl, title, author, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.leftContainer}>
        {!!imageUrl && (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        )}
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

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    // height: 100,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontFamily: "KiwiMaru",
  },
  subText: {
    fontSize: 16,
    fontFamily: "KiwiMaru",
    color: "gray",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
