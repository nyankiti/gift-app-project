// studyReportScreen の値は頻繁に更新されるので、値の変更する回数が少ないDream部分とmodalは切り出してメモ化

import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Provider, Portal } from "react-native-paper";
import {
  width,
  height,
  calendar_width,
  SVGClockWidth,
} from "../../libs/utils/Dimension";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
// const Calendar = require('react-native-calendars')
import {
  fetchDream,
  fetchTargetByDate,
  fetchTotalStudyTime,
} from "../../libs/studyReportController";
import { formatDateUntilDay } from "../../libs/utils/file";
/* components */
import Screen from "../Screen";
import Dream from "../../components/StudyReport/Dream";
import TargetModal from "../../components/StudyReport/TargetModal";
import DreamModal from "../../components/StudyReport/DreamModal";
import StudyClock from "../../components/StudyReport/StudyClock";
/* context */
import { AuthContext } from "../../context/AuthProvider";
import { OthersContext } from "../../context/OthersProvider";
/* types */
import { Target } from "../../types/studyReport";
/* types */
import { StudyReportTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";
import { CarouselItemProps } from "../../types/studyReport";

type StudyReportNavigationProps = StackScreenProps<
  StudyReportTabParamList,
  "StudyReportScreen"
>;

const backgroundImage = require("../../assets/images/notebook.jpg");

const StudyReportScreen: React.FC<StudyReportNavigationProps> = ({
  navigation,
}) => {
  const { user } = useContext(AuthContext);
  const {
    totalStudyTime,
    setTotalStudyTime,
    selectedDateString,
    setSelectedDateString,
  } = useContext(OthersContext);
  // dreamは配列をstackのように扱うことで最新の夢から順番に参照できるようにする
  const [dreamStack, setDreamStack] = useState<string[]>(["夢を記入しよう"]);
  const [dream, setDream] = useState<string>("夢を記入しよう");
  // targetはカレンダーと紐付く１日ごとの目標
  const [target, setTarget] = useState<Target>({
    "1": "",
  });

  const [dreamModalVisible, setDreamModalVisible] = useState<boolean>(false);
  const [targetModalVisible, setTargetModalVisible] = useState<boolean>(false);

  const [carouselItems, setCarouselItems] = useState<CarouselItemProps[]>([
    {
      text: "夢を記入しよう",
      index: 0,
    },
  ]);

  const handleCalendarDayPress = async (response: any) => {
    setSelectedDateString(response.dateString);
    await fetchTargetByDate(user?.uid, response.dateString, setTarget);
    await fetchTotalStudyTime(
      user?.uid,
      response.dateString,
      setTotalStudyTime
    );
  };

  const renderDate = (): string => {
    // 今日を選択中の場合
    if (selectedDateString == formatDateUntilDay()) return "今日";
    return selectedDateString.substr(5).replace("-", "/");
  };

  const renderStudyHours = (): string => {
    if (totalStudyTime === 0) {
      return "";
    }
    const res = Math.floor((totalStudyTime / 60) * 10) / 10;
    return `${res}時間`;
  };

  const renderTargets = () => {
    const temp = Object.values(target).filter((v) => v !== "");

    if (temp.length === 0) {
      return <Text style={styles.target_text}>目標を{"\n"}記入しよう！</Text>;
    }

    return temp.map((v, i) => (
      <Text key={i.toString()} style={styles.target_list_text}>
        ・ {v}
      </Text>
    ));
  };

  useEffect(() => {
    fetchDream(user?.uid, setDreamStack, setDream, setCarouselItems);
    fetchTargetByDate(user?.uid, selectedDateString, setTarget);
    fetchTotalStudyTime(user?.uid, selectedDateString, setTotalStudyTime);
  }, []);

  return (
    <Screen>
      <ScrollView>
        <Provider>
          <Portal>
            <DreamModal
              visible={dreamModalVisible}
              setVisible={setDreamModalVisible}
              dream={dream}
              setDream={setDream}
              uid={user?.uid}
              dreamStack={dreamStack}
              setDreamStack={setDreamStack}
              setCarouselItems={setCarouselItems}
            />
            <TargetModal
              visible={targetModalVisible}
              setVisible={setTargetModalVisible}
              target={target}
              setTarget={setTarget}
              uid={user?.uid}
              dateString={selectedDateString}
            />
          </Portal>

          <ImageBackground source={backgroundImage} style={styles.container}>
            <Dream
              dream={dream}
              dreamStack={dreamStack}
              setDreamStack={setDreamStack}
              dreamModalVisible={dreamModalVisible}
              setDreamModalVisible={setDreamModalVisible}
              carouselItems={carouselItems}
              setCarouselItems={setCarouselItems}
            />

            <View style={styles.purpose_container}>
              <TouchableOpacity
                style={{
                  flexDirection: "column",
                  width: SVGClockWidth,
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("ClockScreen", {
                    uid: user?.uid,
                    dateString: selectedDateString,
                  })
                }
              >
                <Text style={styles.second_text}>
                  {renderDate() + "の\n"}勉強時間
                </Text>
                <StudyClock
                  SVGWidth={SVGClockWidth}
                  totalStudyTime={totalStudyTime}
                  text_in_clock={selectedDateString.slice(-2)}
                />
                <Text style={styles.second_text}>{renderStudyHours()}</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.6,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  <View>
                    <Text style={styles.second_text}>{renderDate()}の目標</Text>
                  </View>
                  <View style={{}}>
                    <FontAwesome5.Button
                      name="pencil-alt"
                      size={22}
                      backgroundColor="rgba(0, 0, 0, 0)"
                      color="#2e64e5"
                      onPress={() => setTargetModalVisible(!targetModalVisible)}
                    />
                  </View>
                </View>
                <View style={styles.target_text_container}>
                  {renderTargets()}
                </View>
              </View>
            </View>

            <View style={styles.calendar_container}>
              <FontAwesome
                name="map-pin"
                size={20}
                color="red"
                style={styles.pin_left}
              />
              <FontAwesome
                name="map-pin"
                size={20}
                color="red"
                style={styles.pin_right}
              />
              <Calendar
                markedDates={{
                  selectedDateString: {
                    selected: true,
                  },
                }}
                onDayPress={handleCalendarDayPress}
                // current={formatDateUntilDay()}
                renderArrow={(direction: any) => (
                  <FontAwesome
                    name={`arrow-${direction}` as "arrow-right" | "arrow-left"}
                    color="#05375a"
                    size={15}
                  />
                )}
                // renderArrow={(right) => (<FontAwesome name='arrow-right' color='#05375a' size={15}/>)}
                theme={{
                  // 透明にすることもできる
                  // calendarBackground: "rgba(0, 0, 0, 0)",
                  calendarBackground: "#f5f5f5",

                  selectedDayBackgroundColor: "#C0D6DF",
                  selectedDayTextColor: "#000000",
                  selectedDotColor: "#EAC799",

                  dayTextColor: "#000000",
                  textDisabledColor: "#729DAF",
                  dotColor: "#DBE9EE",

                  monthTextColor: "#000000",
                  textMonthFontWeight: "bold",

                  arrowColor: "#000000",
                }}
              />
            </View>
          </ImageBackground>
        </Provider>
      </ScrollView>
    </Screen>
  );
};

export default StudyReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    paddingTop: 20,
    alignItems: "center",
    width: width,
  },
  purpose_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: calendar_width,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f8ff",
    marginTop: height * 0.005,
    paddingBottom: 10,
    paddingTop: 10,
  },
  second_text: {
    fontFamily: "KiwiMaru",
    fontSize: 20,
    textAlign: "center",
  },
  target_text: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "KiwiMaru",
    fontSize: 16,
    paddingHorizontal: 4,
  },
  target_list_text: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "KiwiMaru",
    fontSize: 20,
    paddingHorizontal: 2,
  },
  target_text_container: {
    marginLeft: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    padding: 24,
    justifyContent: "center",
  },
  pin_left: {
    position: "absolute",
    top: 0,
    left: 70,
    elevation: 3,
    zIndex: 3,
  },
  pin_right: {
    position: "absolute",
    top: 0,
    right: 70,
    elevation: 3,
    zIndex: 3,
  },
  calendar_container: {
    marginTop: height * 0.04,
    paddingBottom: 40,
    width: calendar_width,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f8ff",
    position: "relative",
  },
});
