import React, { useContext, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import color from "../constants/color";
import { getUser } from "../libs/firebae";
import AsyncStorage from "@react-native-async-storage/async-storage";
/* navigator */
// import AuthNavigator from "./AuthNavigator";
import NewsNavigator from "./NewsNavigator";
import SeatBookingNavigator from "./SeatBookingNavigator";
import StudyReportNavigator from "./StudyReportNavigator";
import AudioNavigator from "./AudioNavigator";
// import AudioTopTabNavigator from "./AudioTopTabNavigator";
/* context */
import { AuthContext } from "../context/AuthProvider";
/* types */
import { BottomTabParamList } from "../types/navigationType";
import { User } from "../types/user";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  // ここでuser情報を取得する処理を入れても良いかも
  const { user, setUser } = useContext(AuthContext);

  const getUidFromStorage = async () => {
    try {
      const uid = await AsyncStorage.getItem("uid");
      return uid;
    } catch (e) {
      console.log("error occured in get async storage: " + e);
    }
  };

  useEffect(() => {
    getUidFromStorage().then((uid) => {
      // uid が null undefinedではない場合にそのuidからuser情報を取得する
      if (uid) {
        getUser(uid, setUser);
      } else {
        // ゲストユーザー用の情報を登録
        setUser({ uid: "00000", displayName: "ゲストユーザー" });
      }
    });
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="News"
      activeColor="#fff"
      barStyle={{ height: 50 }}
    >
      <BottomTab.Screen
        name="News"
        component={NewsNavigator}
        options={{
          tabBarLabel: "News",
          tabBarColor: color.BASE_COLOR,
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={26} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Audio"
        component={AudioNavigator}
        options={{
          tabBarLabel: "Audio",
          tabBarColor: color.BASE_COLOR,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="microphone" size={26} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="StudyReport"
        component={StudyReportNavigator}
        options={{
          tabBarLabel: "Report",
          tabBarColor: color.BASE_COLOR,
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart-outline" size={26} color="black" />
          ),
        }}
      />
      <BottomTab.Screen
        name="SeatBooking"
        component={SeatBookingNavigator}
        options={{
          tabBarLabel: "Report",
          tabBarColor: color.BASE_COLOR,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="chair" size={26} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
