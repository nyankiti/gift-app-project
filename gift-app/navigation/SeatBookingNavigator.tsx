import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import SeatBookingScreen from "../screens/SeatBooking/SeatBookingScreen";
/* types */
import { SeatBookingTabParamList } from "../types/navigationType";

import color from "../constants/color";

type SeatBookingScreenNavigationProps = StackScreenProps<
  SeatBookingTabParamList,
  "SeatBookingScreen"
>;

const SeatBookingStack = createStackNavigator<SeatBookingTabParamList>();

const SeatBookingNavigator: React.FC<SeatBookingScreenNavigationProps> = ({
  navigation,
}) => {
  return (
    <SeatBookingStack.Navigator
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
                onPress={() =>
                  (navigation as any as DrawerNavigationProp<{}>).openDrawer()
                }
              ></FontAwesome>
            </View>
          ),
          headerRight: () => <></>,
        }}
      />
    </SeatBookingStack.Navigator>
  );
};

export default SeatBookingNavigator;
