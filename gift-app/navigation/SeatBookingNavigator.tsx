import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
/* context */
import { AuthContext } from "../context/AuthProvider";
/* screen */
import SeatBookingScreen from "../screens/SeatBooking/SeatBookingScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
/* types */
import { SeatBookingTabParamList } from "../types/navigationType";

import color from "../constants/color";
import { DrawerActions } from "@react-navigation/native";

type SeatBookingNavigationProps = StackScreenProps<SeatBookingTabParamList>;

const SeatBookingStack = createStackNavigator<SeatBookingTabParamList>();

const SeatBookingNavigator: React.FC<SeatBookingNavigationProps> = ({
  navigation,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <SeatBookingStack.Navigator
      initialRouteName={
        user?.uid === "00000" ? "SignInScreen" : "SeatBookingScreen"
      }
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
      <SeatBookingStack.Screen
        name="SeatBookingScreen"
        component={SeatBookingScreen}
        options={{
          headerTitle: "Gift 座席管理",
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
      <SeatBookingStack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{
          headerTitle: "ログイン",
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
      <SeatBookingStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerTitle: "アカウント登録",
          headerRight: () => <></>,
        }}
      />
    </SeatBookingStack.Navigator>
  );
};

export default SeatBookingNavigator;
