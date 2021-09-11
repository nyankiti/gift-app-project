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
import { width, height } from "../../libs/utils/Dimension";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
// const Calendar = require('react-native-calendars')
import { db, fetchDream, fetchTargetByDate } from "../../libs/firebae";
import { formatDateUntilDay } from "../../libs/utils/file";
/* components */
import Screen from "../Screen";
import TargetModal from "../../components/StudyReport/TargetModal";
import DreamModal from "../../components/StudyReport/DreamModal";
import StudyClock from "../../components/StudyReport/StudyClock";
/* context */
import { AuthContext } from "../../context/AuthProvider";

const SVGWidth = width * 0.24;
const backgroundImage = require("../../assets/images/notebook.jpg");

const StudyReportScreen = () => {
  const { user } = useContext(AuthContext);
  // dreamは配列をstackのように扱うことで最新の夢から順番に参照できるようにする
  const [dreamStack, setDreamStack] = useState<string[]>([]);
  const [dream, setDream] = useState<string>("夢を記入しよう！");
  // targetはカレンダーと紐付く１日ごとの目標
  const [target, setTarget] = useState<string>("                ");

  const [dreamModalVisible, setDreamModalVisible] = useState<boolean>(false);
  const [targetModalVisible, setTargetModalVisible] = useState<boolean>(false);

  const [selectedDateString, setSelectedDateString] = useState<string>(
    formatDateUntilDay()
  );

  const handleCalendarDayPress = async (response: any) => {
    console.log(response);
    setSelectedDateString(response.dateString);
    await fetchTargetByDate(user?.uid, response.dateString, setTarget);
  };

  useEffect(() => {
    fetchDream(user?.uid, setDreamStack, setDream);
    fetchTargetByDate(user?.uid, selectedDateString, setTarget);
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
              target={target}
              setTarget={setTarget}
              uid={user?.uid}
              dateString={selectedDateString}
            />
          </Portal>

          <ImageBackground source={backgroundImage} style={styles.container}>
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

            <View style={styles.purpose_container}>
              <View
                style={{
                  flexDirection: "column",
                  width: SVGWidth,
                  alignItems: "center",
                }}
              >
                <Text style={styles.second_text}>今日の{"\n"}勉強時間</Text>
                <StudyClock
                  SVGWidth={SVGWidth}
                  calcClockRotation={90}
                  text_in_clock={selectedDateString.slice(-2)}
                />
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
                  }}
                >
                  <View>
                    <Text style={styles.second_text}>
                      今日の目標{"\n"}
                      {selectedDateString}
                    </Text>
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
                  <Text style={styles.target_text}>{target}</Text>
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
                    name={`arrow-${direction}`}
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

const calendar_width = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    height: height * 0.9,
    alignItems: "center",
    width: width,
  },
  dream_container: {
    flexDirection: "row",
    width: calendar_width,
    justifyContent: "space-around",
  },
  dream_text: {
    fontFamily: "Anzumozi",
    fontSize: 28,
    textAlign: "center",
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
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
    fontFamily: "Anzumozi",
    fontSize: 20,
    textAlign: "center",
  },
  target_text: {
    justifyContent: "center",
    textAlign: "center",
    // fontFamily: "ComicSnas_bd",
    fontFamily: "Anzumozi",
    fontSize: 28,
    paddingHorizontal: 4,
  },
  target_text_container: {
    marginLeft: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "gray",
    height: SVGWidth * 0.9,
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
