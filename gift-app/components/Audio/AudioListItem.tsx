import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import color from "../../constants/color";
import { Entypo } from "@expo/vector-icons";
import { width } from "../../libs/utils/Dimension";
import { convertTime } from "../../libs/audio/helper";

const renderPlayPauseIcon = (isPlaying: boolean) => {
  if (isPlaying)
    return (
      <Entypo name="controller-paus" size={40} color={color.ACTIVE_FONT} />
    );
  return <Entypo name="controller-play" size={40} color={color.ACTIVE_FONT} />;
};

type Props = {
  description: string;
  imageUrl: string;
  published: string;
  title: string;
  duration: number;
  onAudioPress: any;
  isPlaying: boolean;
  activeListItem: any;
};

const AudioListItem = ({
  description,
  imageUrl,
  published,
  title,
  duration,
  onAudioPress,
  isPlaying,
  activeListItem,
}: Props) => {
  const day = new Date(published);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
          <View>
            <Text style={styles.title}>
              <Entypo name="dot-single" size={40} color="skyblue" />
              {title}
            </Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.timeText}>
              {day.getMonth()}月{day.getDate()}日{"     "}
              {convertTime(duration)}
            </Text>
          </View>

          <View style={styles.leftContainer}>
            <TouchableWithoutFeedback onPress={onAudioPress}>
              <View
                style={[
                  styles.playButton,
                  {
                    backgroundColor: activeListItem
                      ? color.ACTIVE_BG
                      : color.FONT_LIGHT,
                  },
                ]}
              >
                <Text style={styles.thumbnailText}>
                  {activeListItem ? (
                    renderPlayPauseIcon(isPlaying)
                  ) : (
                    <Entypo
                      name="controller-play"
                      size={40}
                      color={color.ACTIVE_FONT}
                    />
                  )}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <View style={styles.separator} />
    </>
  );
};

export default AudioListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: width - 40,
  },
  topContainer: {
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    flex: 1,
  },
  thumbnail: {
    width: 65,
    height: 65,
    borderRadius: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: "KiwiMaru",
    marginTop: 10,
    color: color.FONT,
    marginLeft: 16,
  },
  timeText: {
    fontSize: 16,
    fontFamily: "KiwiMaru",
    paddingBottom: 4,
    marginTop: -10,
    color: color.FONT,
    marginLeft: 30,
  },

  playButton: {
    height: 50,
    flexBasis: 50,
    backgroundColor: color.FONT_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 28,
    fontWeight: "bold",
    color: color.FONT,
  },
  title: {
    fontSize: 24,
    fontFamily: "KiwiMaru",
    padding: 10,
    marginLeft: -10,
    color: color.FONT,
  },
  separator: {
    width: width - 40,
    backgroundColor: "#333",
    opacity: 0.3,
    height: 0.5,
    alignSelf: "center",
    marginTop: 10,
  },
});
