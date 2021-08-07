import React, { useContext } from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import * as Font from "expo-font";
import Loading from "../screens/LoadingScreen";
/* navigator */
import NewsNavigator from "./NewsNavigator";
import StudyReportNavigator from "./StudyReportNavigator";
import ChatNavigator from "./ChatNavigator";
import AccountInfoNavigator from "./AccountInfoNavigator";
import SeatBookingNavigator from "./SeatBookingNavigator";
/* types */
import { BottomTabParamList } from "../types";
import { AuthContext } from "../src/AuthProvider";

// const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const [fontLoaded, setFontLoaded] = React.useState<boolean>(true);

  // bottomTabBarを表示させないScreenの設定
  const loadFonts = async () => {
    await Font.loadAsync({
      Anzumozi: require("../assets/fonts/Anzumozi.ttf"),
      ComicSnas_bd: require("../assets/fonts/comicbd.ttf"),
    });
    setFontLoaded(false);
  };

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (
      routeName == "UserDetailScreen" ||
      routeName == "AddPost" ||
      routeName == "RoomScreen"
    ) {
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    loadFonts();
  }, []);

  if (fontLoaded) {
    return <Loading message="読込中" />;
  }

  return (
    <BottomTab.Navigator
      initialRouteName="News"
      // テスト用に最初の画面を変える
      // initialRouteName = "StudyReport"
      activeColor="#fff"
    >
      <BottomTab.Screen
        name="News"
        // 開発時のみここをDevelopScreenを表示してデバッグに使う
        // component={DevelopScreen}
        component={NewsNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: "News",
          tabBarColor: "#EAC799",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        })}
      />
      <BottomTab.Screen
        name="StudyReport"
        component={StudyReportNavigator}
        options={{
          tabBarLabel: "Report",
          tabBarColor: "#EAC799",
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart-outline" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarLabel: "Chat",
          tabBarColor: "#EAC799",
          tabBarIcon: ({ color }) => (
            <Icon name="chatbubble-ellipses-outline" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SeatBooking"
        component={SeatBookingNavigator}
        options={({ route }) => ({
          // stackの遷移先のscreenのみtabBarを隠したいので、routeを渡して条件分岐して表示を切り替える
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: "Seat Booking",
          tabBarColor: "#EAC799",
          tabBarIcon: ({ color }) => (
            <Icon name="bookmarks-outline" color={color} size={26} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

BottomTabNavigator.navigationOptions = () => ({
  headerBackTintleVisible: false,
});
