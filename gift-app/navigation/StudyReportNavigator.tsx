import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import StudyReportScreen from "../screens/StudyReport/StudyReportScreen";
/* types */
import { StudyReportTabParamList } from "../types/navigationType";

import color from "../constants/color";
import { DrawerActions } from "@react-navigation/native";

type StudyReportNavigationProps = StackScreenProps<StudyReportTabParamList>;

const StudyReportStack = createStackNavigator<StudyReportTabParamList>();

const StudyReportNavigator: React.FC<StudyReportNavigationProps> = ({
  navigation,
}) => {
  return (
    <StudyReportStack.Navigator
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
      <StudyReportStack.Screen
        name="StudyReportScreen"
        component={StudyReportScreen}
        // component={QuestionnaireScreen}
        options={{
          headerTitle: "Study Report",
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <FontAwesome
                name="bars"
                size={25}
                backgroundColor={color.BASE_COLOR}
                color="#fff"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              ></FontAwesome>
            </View>
          ),
          headerRight: () => <></>,
        }}
      />
    </StudyReportStack.Navigator>
  );
};

export default StudyReportNavigator;

const styles = StyleSheet.create({});
