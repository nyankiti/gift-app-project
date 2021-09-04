import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import StudyReportScreen from "../screens/StudyReport/StudyReportScreen";
/* types */
import { StudyReportTabParamList } from "../types/navigationType";

import color from "../constants/color";

type StudyReportScreenNavigationProps = StackScreenProps<
  StudyReportTabParamList,
  "StudyReportScreen"
>;

const StudyReportStack = createStackNavigator<StudyReportTabParamList>();

const StudyReportNavigator: React.FC<StudyReportScreenNavigationProps> = ({
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
                onPress={() =>
                  (navigation as any as DrawerNavigationProp<{}>).openDrawer()
                }
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
