import React, { useState, useCallback, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { deleteDreamSpecifiedByIndex } from "../../libs/studyReportController";
import { width } from "../../libs/utils/Dimension";
import { Entypo } from "@expo/vector-icons";
/* types */
import {
  RenderCarouselItemProps,
  CarouselItemProps,
} from "../../types/studyReport";
/* context */
import { AuthContext } from "../../context/AuthProvider";

type Props = {
  dreamStack: string[];
  setDreamStack: React.Dispatch<React.SetStateAction<string[]>>;
  carouselItems: CarouselItemProps[];
  setCarouselItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>;
};

const CarouselScreen: React.FC<Props> = ({
  dreamStack,
  setDreamStack,
  carouselItems,
  setCarouselItems,
}) => {
  const { user } = useContext(AuthContext);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const ref = useRef<Carousel<CarouselItemProps>>(null);

  const handleCardDiscardCrossPress = (index: number) => {
    // console.log(index);
    deleteDreamSpecifiedByIndex(
      index,
      user?.uid,
      dreamStack,
      setDreamStack,
      carouselItems,
      setCarouselItems
    );
  };

  const renderItem = useCallback(({ item }: RenderCarouselItemProps) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: 10,
          borderColor: "gray",
          borderWidth: 1,
          // marginTop: 10,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => handleCardDiscardCrossPress(item.index)}
        >
          <Entypo
            name="cross"
            size={24}
            color="black"
            style={{ position: "absolute", right: -5, top: -5 }}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.dream_text}>
          {item.text}
          {item.index}
        </Text>
      </View>
    );
  }, []);

  return (
    <View>
      <Pagination
        dotsLength={dreamStack.length}
        activeDotIndex={activeIndex}
        dotStyle={{ marginTop: -6, paddingTop: -4 }}
      />
      <Carousel
        layout="tinder"
        ref={ref}
        data={carouselItems}
        slideStyle={styles.slideStyle}
        // sliderHeight={100}
        // itemHeight={60}
        sliderWidth={width * 0.5}
        itemWidth={160}
        renderItem={renderItem}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        // firstItem={dreamStack.length - 1}
        inactiveSlideScale={0.75}
        inactiveSlideOpacity={0.5}
        // vertical={true}
      />
    </View>
  );
};

export default CarouselScreen;

const styles = StyleSheet.create({
  dream_text: {
    fontFamily: "KiwiMaru",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  slideStyle: {
    // margin: -4,
    // marginBottom: -4,
    // paddingBottom: -12,
    // paddingTop: -12,
    // marginTop: -4,
    // marginTop: -10,
    // paddingBottom: 10,
    // marginLeft: -10,
    // marginRight: -10,
  },
});
