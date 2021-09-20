import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { calendar_width } from "../../libs/utils/Dimension";
import DreamCarousel from "./DreamCarousel";
/* types */
import { CarouselItemProps } from "../../types/studyReport";

type Props = {
  dream: string;
  dreamStack: string[];
  setDreamStack: React.Dispatch<React.SetStateAction<string[]>>;
  dreamModalVisible: boolean;
  setDreamModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  carouselItems: CarouselItemProps[];
  setCarouselItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
};

const Dream = memo(
  ({
    dream,
    dreamStack,
    setDreamStack,
    dreamModalVisible,
    setDreamModalVisible,
    carouselItems,
    setCarouselItems,
  }: Props) => {
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
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.dream_text}>{dream}</Text>
        </View>

        {/* <View style={{ flex: 2, marginLeft: 10 }}>
          <DreamCarousel
            dreamStack={dreamStack}
            setDreamStack={setDreamStack}
            carouselItems={carouselItems}
            setCarouselItems={setCarouselItems}
          />
        </View> */}

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
