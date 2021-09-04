import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import color from "../constants/color";
/* navigator */
import AuthNavigator from "./AuthNavigator";
import NewsNavigator from "./NewsNavigator";
import SeatBookingNavigator from "./SeatBookingNavigator";
import StudyReportNavigator from "./StudyReportNavigator";
import AudioNavigator from "./AudioNavigator";
/* types */
import { BottomTabParamList } from "../types/navigationType";

const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="News" activeColor="#fff">
      <BottomTab.Screen
        name="News"
        component={NewsNavigator}
        options={{
          tabBarLabel: "News",
          tabBarColor: color.BASE_COLOR,
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={26} color="black" />
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
            <AntDesign name="team" size={26} color="black" />
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
            <AntDesign name="team" size={26} color="black" />
          ),
        }}
      />
      {/* SeatBookingScreenはログインが必要な機能なのでここでAuthNavigatorを渡す */}
      {true ? (
        <BottomTab.Screen
          name="SeatBooking"
          component={SeatBookingNavigator}
          options={{
            tabBarLabel: "Report",
            tabBarColor: color.BASE_COLOR,
            tabBarIcon: ({ color }) => (
              <AntDesign name="team" size={26} color="black" />
            ),
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Auth"
          // SeatBookingScreenはログインが必要な機能なのでここでAuthNavigatorを渡す
          component={AuthNavigator}
          options={{
            tabBarLabel: "Report",
            tabBarColor: color.BASE_COLOR,
            tabBarIcon: ({ color }) => (
              <AntDesign name="team" size={26} color="black" />
            ),
          }}
        />
      )}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
