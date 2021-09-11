import React, { useContext } from "react";
import { View } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import StudyReportScreen from "../screens/StudyReport/StudyReportScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
/* components */
import BarsIcon from "../components/Navigation/BarsIcon";
/* types */
import { StudyReportTabParamList } from "../types/navigationType";
/* context */
import { AuthContext } from "../context/AuthProvider";

import color from "../constants/color";
import { DrawerActions } from "@react-navigation/native";

type StudyReportNavigationProps = StackScreenProps<StudyReportTabParamList>;

const StudyReportStack = createStackNavigator<StudyReportTabParamList>();

const StudyReportNavigator: React.FC<StudyReportNavigationProps> = ({
  navigation,
}) => {
  const { user } = useContext(AuthContext);

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
      {user?.uid === "00000" ? (
        <>
          <StudyReportStack.Screen
            name="SignInScreen"
            component={SignInScreen}
            initialParams={{ stackName: "StudyReport" }}
            options={{
              headerTitle: "ログイン",
              headerLeft: () => (
                <View style={{ paddingLeft: 10 }}>
                  <FontAwesome
                    name="bars"
                    size={25}
                    backgroundColor={color.BASE_COLOR}
                    color="#fff"
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }
                  ></FontAwesome>
                </View>
              ),
              headerRight: () => <></>,
            }}
          />
          <StudyReportStack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            initialParams={{ stackName: "StudyReport" }}
            options={{
              headerTitle: "アカウント登録",
              headerRight: () => <></>,
            }}
          />
        </>
      ) : (
        <StudyReportStack.Screen
          name="StudyReportScreen"
          component={StudyReportScreen}
          // component={QuestionnaireScreen}
          options={{
            headerTitle: "Study Report",
            headerLeft: () => <BarsIcon navigation={navigation} />,
            headerRight: () => <></>,
          }}
        />
      )}
    </StudyReportStack.Navigator>
  );
};

export default StudyReportNavigator;
