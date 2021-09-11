import React from "react";
import { TouchableOpacity, Animated, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import color from "../constants/color";
/* screen */
import AudioListScreen from "../screens/Audio/AudioListScreen";
import PlayerScreen from "../screens/Audio/PlayerScreen";

type TopTabParamList = {
  AudioListScreen: undefined;
  PlayerScreen: undefined;
};
const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const AudioTopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 20,
          fontFamily: "ComicSnas_bd",
        },
        tabBarItemStyle: { marginTop: 55 },
        tabBarStyle: { backgroundColor: color.BASE_COLOR },
      }}
      // tabBar={(props) => <MyTabBar {...props} />}
    >
      <TopTab.Screen
        name="AudioListScreen"
        component={AudioListScreen}
        options={{ tabBarLabel: "List" }}
      />
      <TopTab.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{ tabBarLabel: "Player" }}
      />
    </TopTab.Navigator>
  );
};

export default AudioTopTabNavigator;
