import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Text } from "react-native";
/* screen */
import SeatBookingScreen from "../screens/SeatBookingScreen";
import SeatUnBookingScreen from "../screens/SeatUnBookingScreen";
/* types */
import { SeatBookingTabParamList } from "../types";

const SeatBookingStack = createStackNavigator<SeatBookingTabParamList>();

const SeatBookingNavigator = ({ navigation }) => {
  return (
    <SeatBookingStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#EAC799",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "normal",
          fontFamily: "Anzumozi",
          fontSize: 24,
          alignSelf: "center",
        },
      }}
    >
      <SeatBookingStack.Screen
        name="SeatBookingScreen"
        component={SeatBookingScreen}
        options={{
          headerTitle: "座席登録",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <>
              <Text
                style={{
                  fontFamily: "Anzumozi",
                  marginBottom: 4,
                  color: "white",
                  fontSize: 20,
                }}
              >
                退室
                <FontAwesome5.Button
                  name="external-link-square-alt"
                  size={25}
                  backgroundColor="#EAC799"
                  onPress={() => navigation.navigate("SeatUnBookingScreen")}
                />
              </Text>
            </>
          ),
        }}
      />
      <SeatBookingStack.Screen
        name="SeatUnBookingScreen"
        component={SeatUnBookingScreen}
        options={{
          headerTitle: "登録解除",
          headerRight: () => <></>,
        }}
      />
    </SeatBookingStack.Navigator>
  );
};

export default SeatBookingNavigator;
