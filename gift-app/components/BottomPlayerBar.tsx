import React, { RefObject, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { width, height } from "../libs/utils/Dimension";
import BottomSheet from "reanimated-bottom-sheet";
import { selectAudio } from "../libs/audio/audioController";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
/* components */
import PlayerButton from "../components/Audio/PlayerButton";
/* context */
import { AudioContext } from "../context/AudioProvider";

type Props = {
  sheetRef: RefObject<BottomSheet>;
};

const BottomPlayerBar = ({ sheetRef }: Props) => {
  const context = useContext(AudioContext);
  const { isPlaying, currentAudio, bottomPlayerBarShown } = context;

  if (!bottomPlayerBarShown) return null;

  const handlePlayPause = async () => {
    if (context.currentAudio !== null) {
      await selectAudio(context.currentAudio, context);
    }
  };

  const handleCrossPress = () => {
    context.updateState(context, { bottomPlayerBarShown: false });
  };

  return (
    <View
      style={{
        position: "absolute",
        top: height - 16,
        height: 70,
        backgroundColor: "lavender",
        width: width,
        zIndex: 1,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          sheetRef.current?.snapTo(height - 20);
        }}
        style={{
          flexDirection: "row",
          width: width,
        }}
      >
        <MaterialIcons name="keyboard-arrow-up" size={30} color="dimgray" />
        {currentAudio?.itunes && currentAudio.itunes.image ? (
          <Image
            source={{ uri: currentAudio?.itunes.image }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginTop: 5,
            }}
          />
        ) : null}
        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <Text style={{ fontFamily: "KiwiMaru", fontSize: 20 }}>
            {currentAudio?.title}
          </Text>
          <Text style={{ fontFamily: "KiwiMaru" }}>Gift Radio</Text>
        </View>
        <View style={{ marginLeft: "auto", position: "relative" }}>
          <Entypo
            name="cross"
            size={24}
            color="dimgray"
            style={{ position: "absolute", left: 66 }}
            onPress={handleCrossPress}
          />
          <PlayerButton
            onPress={handlePlayPause}
            style={{ marginHorizontal: 25, marginTop: 20 }}
            iconType={isPlaying ? "PLAY" : "PAUSE"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomPlayerBar;

const styles = StyleSheet.create({});
