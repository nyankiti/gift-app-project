import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
/* screen */
import NewsScreen from "../screens/News/NewsScreen";
/* types */
import { NewsTabParamList } from "../types/navigationType";

import color from "../constants/color";

type NewsScreenNavigationProps = StackScreenProps<
  NewsTabParamList,
  "NewsScreen"
>;

const NewsStack = createStackNavigator<NewsTabParamList>();

const NewsNavigator: React.FC<NewsScreenNavigationProps> = ({ navigation }) => {
  return (
    <NewsStack.Navigator
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
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerTitle: "Gift News",
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
    </NewsStack.Navigator>
  );
};

export default NewsNavigator;
