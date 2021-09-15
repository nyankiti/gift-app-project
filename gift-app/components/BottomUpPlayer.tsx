import React, { useContext, useState, RefObject } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  changeAudio,
  moveAudio,
  pause,
  playFromMiddle,
  playFromMiddleByPosition,
  selectAudio,
} from "../libs/audio/audioController";
import { height, width } from "../libs/utils/Dimension";
import color from "../constants/color";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { convertTimeToPlaybak, convertTime } from "../libs/audio/helper";
import BottomSheet from "reanimated-bottom-sheet";
/* components */
import PlayerButton from "../components/Audio/PlayerButton";
/* context */
import { AudioContext } from "../context/AudioProvider";

type Props = {
  sheetRef: RefObject<BottomSheet>;
};

const BottomUpPlayer = ({ sheetRef }: Props) => {
  const [currentPosition, setCurrentPosition] = useState<
    string | number | null
  >();
  const context = useContext(AudioContext);
  const { playbackPosition, playbackDuration, currentAudio } = context;

  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  const handlePlayPause = async () => {
    if (context.currentAudio !== null) {
      await selectAudio(context.currentAudio, context);
    }
  };

  const handleNext = async () => {
    await changeAudio(context, "next");
  };

  const handlePrevious = async () => {
    await changeAudio(context, "previous");
  };

  return (
    <View style={styles.container}>
      <View style={styles.audioCountContainer}>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={32}
          color="dimgray"
          onPress={() => sheetRef.current?.snapTo(0)}
        />
        <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1} / ${
          context.totalAudioCount
        }`}</Text>
      </View>
      <View style={styles.midBannerContainer}>
        {currentAudio?.itunes && currentAudio?.itunes.image ? (
          <Image
            source={{ uri: currentAudio?.itunes.image }}
            style={{ width: 300, height: 300, borderRadius: 150 }}
          />
        ) : (
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
          />
        )}
      </View>
      <View style={{}}>
        <Text numberOfLines={1} style={styles.audioTitle}>
          {currentAudio?.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <Text>
            {currentAudio?.itunes && currentAudio?.itunes.duration
              ? convertTimeToPlaybak(Number(currentAudio?.itunes.duration))
              : null}
          </Text>
          <Text>
            {currentPosition
              ? currentPosition
              : convertTime(Math.floor(context.playbackPosition / 1000))}
          </Text>
        </View>
        <Slider
          style={{ width: width, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={calculateSeebBar()}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
          onValueChange={(value) => {
            currentAudio?.itunes && currentAudio.itunes.duration
              ? setCurrentPosition(
                  convertTimeToPlaybak(
                    value * Number(currentAudio?.itunes.duration)
                  )
                )
              : null;
          }}
          onSlidingStart={async () => {
            if (!context.isPlaying) return;

            try {
              if (context.playbackObj) {
                await pause(context.playbackObj);
              }
            } catch (error) {
              console.log("error inside onSlidingStart callback", error);
            }
          }}
          // slideのvalueによらずユーザーがslideをreleaseしたときに発火する
          onSlidingComplete={async (value) => {
            const position =
              value * Number(currentAudio?.itunes.duration) * 1000;
            await playFromMiddleByPosition(context, position);
            setCurrentPosition(null);
          }}
        />
        <View style={styles.audioControllers}>
          <PlayerButton iconType="PREV" onPress={handlePrevious} />
          <PlayerButton
            onPress={handlePlayPause}
            style={{ marginHorizontal: 25 }}
            iconType={context.isPlaying ? "PLAY" : "PAUSE"}
          />
          <PlayerButton iconType="NEXT" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};

export default BottomUpPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    height: height,
    // zIndex: 99,
  },
  audioControllers: {
    width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  audioCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  audioCount: {
    textAlign: "right",
    color: color.FONT_LIGHT,
    fontSize: 16,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioTitle: {
    fontSize: 16,
    color: color.FONT,
    padding: 15,
  },
});
