import React from "react";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
/* screen */
import NewsScreen from "../screens/News/NewsScreen";
import ArticleScreen from "../screens/News/ArticlesScreen";
/* components */
import BarsIcon from "../components/Navigation/BarsIcon";
/* types */
import { NewsTabParamList } from "../types/navigationType";

import color from "../constants/color";
import { DrawerActions } from "@react-navigation/native";

type NewsNavigationProps = StackScreenProps<NewsTabParamList>;

const NewsStack = createStackNavigator<NewsTabParamList>();

const NewsNavigator: React.FC<NewsNavigationProps> = ({ navigation }) => {
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
          headerTitle: "Topics",
          headerLeft: () => <BarsIcon navigation={navigation} />,
          headerRight: () => <></>,
        }}
      />
      <NewsStack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={({ route }) => ({
          title: route.params.article.title,
          headerRight: () => <></>,
        })}
      />
    </NewsStack.Navigator>
  );
};

export default NewsNavigator;
