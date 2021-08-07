import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
/* screen */
import NewsScreen from "../screens/NewsScreen";
import ArticleScreen from "../screens/ArticleScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import GiftInfoScreen from "../screens/GiftInfoScreen";
/* types */
import { NewsTabParamList } from "../types";

const NewsStack = createStackNavigator<NewsTabParamList>();

const NewsNavigator = ({ navigation }) => {
  return (
    <NewsStack.Navigator
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
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        // component={QuestionnaireScreen}
        options={{
          headerTitle: "Gift News",
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
      <NewsStack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={({ route }: any) => ({
          title: route.params.article.title,
          headerRight: () => (
            // <View style={{marginRight: 10}}>
            //   <FontAwesome5.Button
            //     name="plus"
            //     size={22}
            //     backgroundColor="#EAC799"
            //     color="#2e64e5"
            //     // onPress={() => navigation.navigate('AddPost')}
            //   />
            // </View>
            <></>
          ),
        })}
      />
      {/* Drawerから遷移した時用のスクリーンをSeatBookingStackに入れておく */}

      <NewsStack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
        options={{
          headerTitle: "質問・相談作成",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerTitleAlign: "center",
        }}
      />
      <NewsStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit Profile",
          // headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerTitleAlign: "center",
        }}
      />
      <NewsStack.Screen
        name="GiftInfoScreen"
        component={GiftInfoScreen}
        options={{
          headerTitle: "Information",
          // headerBackTitleVisible: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerTitleAlign: "center",
        }}
      />
    </NewsStack.Navigator>
  );
};

export default NewsNavigator;
