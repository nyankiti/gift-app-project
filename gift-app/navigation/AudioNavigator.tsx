import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import PlayerScreen from "../screens/Audio/PlayerScreen";
import AudioListScreen from "../screens/Audio/AudioListScreen";
/* components */
import BarsIcon from "../components/Navigation/BarsIcon";
/* types */
import { AudioTabParamList } from "../types/navigationType";

import color from "../constants/color";
import { DrawerActions } from "@react-navigation/routers";

type AudioNavigationProps = StackScreenProps<AudioTabParamList>;

const AudioStack = createStackNavigator<AudioTabParamList>();

const AudioNavigator: React.FC<AudioNavigationProps> = ({ navigation }) => {
  return (
    <AudioStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.BASE_COLOR,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "normal",
          fontFamily: "ComicSnas_bd",
          alignSelf: "center",
          alignItems: "center",
        },
      }}
    >
      <AudioStack.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{
          headerTitle: "Gift Radio",
          headerLeft: () => <BarsIcon navigation={navigation} />,
          headerRight: () => <></>,
        }}
      />
    </AudioStack.Navigator>
  );
};

export default AudioNavigator;

const styles = StyleSheet.create({});
