import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
/* screen */
import StudyReportScreen from "../screens/StudyReportScreen";
import EditGoalScreen from "../screens/EditGoalScreen";
/* types */
import { StudyReportTabParamList } from "../types";

const StudyReportStack = createStackNavigator<StudyReportTabParamList>();

const StudyReportNavigator = ({ navigation }) => {
  return (
    <StudyReportStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#EAC799",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "normal",
          fontFamily: "ComicSnas_bd",
          alignSelf: "center",
        },
      }}
    >
      <StudyReportStack.Screen
        name="StudyReportScreen"
        component={StudyReportScreen}
        options={{
          headerTitle: "Study Report",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => <></>,
        }}
      />
      <StudyReportStack.Screen
        name="EditGoalScreen"
        component={EditGoalScreen}
        options={{
          headerTitle: "Edit Your Dream",
          headerRight: () => <></>,
        }}
      />
    </StudyReportStack.Navigator>
  );
};

export default StudyReportNavigator;
