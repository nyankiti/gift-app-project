import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import PlayerScreen from "../screens/Audio/PlayerScreen";
/* types */
import { AudioTabParamList } from "../types/navigationType";

import color from "../constants/color";

type PlayerScreenNavigationProps = StackScreenProps<
  AudioTabParamList,
  "PlayerScreen"
>;

const AudioStack = createStackNavigator<AudioTabParamList>();

const AudioNavigator: React.FC<PlayerScreenNavigationProps> = ({
  navigation,
}) => {
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
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <FontAwesome
                name="bars"
                size={25}
                backgroundColor={color.BASE_COLOR}
                color="#fff"
                onPress={() =>
                  (navigation as any as DrawerNavigationProp<{}>).openDrawer()
                }
              ></FontAwesome>
            </View>
          ),
          headerRight: () => <></>,
        }}
      />
    </AudioStack.Navigator>
  );
};

export default AudioNavigator;

const styles = StyleSheet.create({});
