import React, { useContext } from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
/* context */
import { AuthContext } from "../context/AuthProvider";
/* screen */
import SeatBookingScreen from "../screens/SeatBooking/SeatBookingScreen";
import SeatUnBookingScreen from "../screens/SeatBooking/SeatUnBookingScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
/* components */
import BarsIcon from "../components/Navigation/BarsIcon";
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
          <SeatBookingStack.Screen
            name="SignInScreen"
            component={SignInScreen}
            initialParams={{ stackName: "SeatBooking" }}
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
          <SeatBookingStack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            initialParams={{ stackName: "SeatBooking" }}
            options={{
              headerTitle: "アカウント登録",
              headerRight: () => <></>,
            }}
          />
        </>
      ) : (
        <>
          <SeatBookingStack.Screen
            name="SeatBookingScreen"
            component={SeatBookingScreen}
            options={{
              headerTitle: "Gift 座席管理",
              headerLeft: () => <BarsIcon navigation={navigation} />,
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
                      backgroundColor={color.BASE_COLOR}
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
              headerTitle: "Gift 座席管理(退出)",
              headerRight: () => <></>,
            }}
          />
        </>
      )}
    </SeatBookingStack.Navigator>
  );
};

export default SeatBookingNavigator;
