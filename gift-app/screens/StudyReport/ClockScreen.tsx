import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { useSharedValue } from "react-native-reanimated";
import color from "../../constants/color";
import { setTotalStudyTimeViaClockGesture } from "../../libs/studyReportController";
import { height } from "../../libs/utils/Dimension";
import {
  PADDING,
  formatDuration2,
  radToMinutes,
  absoluteDuration,
  preFormatDuration,
} from "../../constants/clock";

import CircularSlider from "../../components/StudyReport/ClockGesture/CircularSlider";
/* context */
import { OthersContext } from "../../context/OthersProvider";
/* types */
import { StudyReportTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";

type ClockNavigationProps = StackScreenProps<
  StudyReportTabParamList,
  "ClockScreen"
>;

const ClockScreen: React.FC<ClockNavigationProps> = ({ route, navigation }) => {
  const { setTotalStudyTime } = useContext(OthersContext);

  const hand = useSharedValue(0.5 * Math.PI);
  const top = useSharedValue(0.5 * Math.PI);

  const duration = useDerivedValue(() => {
    const d = absoluteDuration(hand.value, top.value);
    return formatDuration2(radToMinutes(d));
  });

  const ab_duration = useDerivedValue(() => {
    const d = absoluteDuration(hand.value, top.value);
    const preFormatD = preFormatDuration(radToMinutes(d));
    return preFormatD.hours * 60 + preFormatD.minutes;
  });

  const handleButtonPress = async () => {
    await setTotalStudyTimeViaClockGesture(
      route.params.uid,
      ab_duration.value,
      route.params.dateString
    );
    setTotalStudyTime(ab_duration.value);
    navigation.navigate("StudyReportScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.values}></View>
      <CircularSlider hand={hand} top={top} />

      <ReText style={styles.duration} text={duration} />

      <Button
        mode="contained"
        onPress={() => handleButtonPress()}
        style={styles.button}
      >
        <Text style={{ fontFamily: "KiwiMaru" }}>登録する</Text>
      </Button>
      <Text style={{ fontFamily: "KiwiMaru", paddingTop: 20 }}>
        ここで勉強時間を入力すると、こちらの時間が優先されます
      </Text>
    </View>
  );
};

export default ClockScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: PADDING,
    alignItems: "center",
    height: height,
  },
  values: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  duration: {
    fontSize: 24,
    textAlign: "center",
    marginTop: PADDING,
    fontFamily: "KiwiMaru",
  },
  button: {
    marginTop: 10,
    backgroundColor: color.BASE_COLOR,
    width: 100,
  },
});
