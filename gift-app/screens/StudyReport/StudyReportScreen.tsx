// studyReportScreen の値は頻繁に更新されるので、値の変更する回数が少ないDream部分とmodalは切り出してメモ化

import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  StatusBar,
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
import { FlatList } from "react-native-gesture-handler";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

const backgroundImage = require("../../assets/images/notebook.jpg");

const StudyReportScreen = () => {
  const { user } = useContext(AuthContext);
  const {
    totalStudyTime,
    setTotalStudyTime,
    selectedDateString,
    setSelectedDateString,
  } = useContext(OthersContext);
  // dreamは配列をstackのように扱うことで最新の夢から順番に参照できるようにする
  const [dreamStack, setDreamStack] = useState<string[]>([]);
  const [dream, setDream] = useState<string>("夢を記入しよう！");
  // targetはカレンダーと紐付く１日ごとの目標
  const [target, setTarget] = useState<Target>({
    "1": "             ",
  });

  // 以下2つはtargetModalで用いられるstate.  modalがvisibleになった時点でこれらのstateを更新する必要があるため、ここで定義している
  const [targetInputValue, setTargetInputValue] = useState<Target>({
    "1": "",
  });
  const [inputCount, setInputCount] = useState<number>(0);
  // ----------------------------------------------------------------

  const [dreamModalVisible, setDreamModalVisible] = useState<boolean>(false);
  const [targetModalVisible, setTargetModalVisible] = useState<boolean>(false);

  const handleCalendarDayPress = async (response: any) => {
    console.log(response);
    setSelectedDateString(response.dateString);
    await fetchTargetByDate(user?.uid, response.dateString, setTarget);
    await fetchTotalStudyTime(
      user?.uid,
      response.dateString,
      setTotalStudyTime
    );
  };

  const handleTargetEditPress = () => {
    // modalが見える瞬間にinput用のvalueを更新する
    setTargetInputValue(target);
    setInputCount(Object.values(target).filter((v) => v !== "").length);
    setTargetModalVisible(!targetModalVisible);
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
    return Object.values(target)
      .filter((v) => v !== "")
      .map((v, i) => (
        <Text key={i.toString()} style={styles.target_text}>
          ・ {v}
        </Text>
      ));
  };

  useEffect(() => {
    fetchDream(user?.uid, setDreamStack, setDream);
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
            />
            <TargetModal
              visible={targetModalVisible}
              setVisible={setTargetModalVisible}
              setTarget={setTarget}
              uid={user?.uid}
              inputCount={inputCount}
              setInputCount={setInputCount}
              dateString={selectedDateString}
              targetInputValue={targetInputValue}
              setTargetInputValue={setTargetInputValue}
            />
          </Portal>

          <ImageBackground source={backgroundImage} style={styles.container}>
            <Dream
              dream={dream}
              dreamModalVisible={dreamModalVisible}
              setDreamModalVisible={setDreamModalVisible}
            />

            <View style={styles.purpose_container}>
              <View
                style={{
                  flexDirection: "column",
                  width: SVGClockWidth,
                  alignItems: "center",
                }}
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
              </View>
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
                      onPress={() => handleTargetEditPress()}
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
    height: height * 0.9,
    alignItems: "center",
    width: width,
  },
  purpose_container: {
    // flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    width: calendar_width,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f8ff",
    marginTop: height * 0.005,
    paddingBottom: 10,
    paddingTop: 10,
    // alignSelf: 'center',
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
    fontSize: 28,
    paddingHorizontal: 4,
  },
  target_text_container: {
    marginLeft: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    // height: SVGClockWidth * 0.9,
    padding: 50,
    justifyContent: "center",
  },
  modal_container: {
    backgroundColor: "#f5f5f5",
    // padding: 20,
    height: "100%",
    width: "100%",
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
    // flex: 5,
    marginTop: height * 0.04,
    width: calendar_width,
    borderBottomWidth: 1,
    // borderTopWidth:1,
    borderBottomColor: "#f0f8ff",
    // borderTopColor: '#f0f8ff',
    position: "relative",
  },
});
