import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { calendar_width } from "../../libs/utils/Dimension";
// import SwipePicker from "react-native-swipe-picker";
// const SwipePicker = require('react-native-swipe-picker')

type Props = {
  dream: string;
  dreamStack: string[];
  dreamModalVisible: boolean;
  setDreamModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dream = memo(
  ({ dream, dreamStack, dreamModalVisible, setDreamModalVisible }: Props) => {
    const render = () => {
      dreamStack.map(() => {});
    };
    return (
      <View style={styles.dream_container}>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text
            style={{
              fontFamily: "ComicSnas",
              fontSize: 24,
              textAlign: "center",
            }}
          >
            Dream:
          </Text>
          {/* <SwipePicker
            items={[
              {
                value: 1,
                label: global,
              },
            ]}
          /> */}
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.dream_text}>{dream}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <FontAwesome5.Button
            name="pencil-alt"
            size={22}
            backgroundColor="rgba(0, 0, 0, 0)"
            color="#2e64e5"
            onPress={() => setDreamModalVisible(!dreamModalVisible)}
          />
        </View>
      </View>
    );
  }
);

export default Dream;

const styles = StyleSheet.create({
  dream_container: {
    flexDirection: "row",
    width: calendar_width,
    justifyContent: "space-around",
  },
  dream_text: {
    fontFamily: "KiwiMaru",
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
});
