import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import Icon from "react-native-vector-icons/Ionicons";
import DrawerContent from "../screens/DrawerContent";
import BottomTabBar from "../components/BottomTabBar";
/* navigator */
import BottomTabNavigator from "./BottomTabNavigator";
/* screen */
import EditProfileScreen from "../screens/EditProfileScreen";
import GiftInfoScreen from "../screens/GiftInfoScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
/* types */
import { DrawerParamaList } from "../types";

const Drawer = createDrawerNavigator<DrawerParamaList>();

const DrawerNavigator = ({ navigation }) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="home" component={BottomTabNavigator} />
      {/* <Drawer.Screen
        name="EditProfileScreen"
        component={EditProfileNavigator}
      />
      <Drawer.Screen name="GiftInfoScreen" component={GiftInfoNavigator} />
      <Drawer.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireNavigator}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

// 1ページのscreenであってもdrawerのscreenに指定する場合はstackとする

const EditProfileStack = createStackNavigator();

const EditProfileNavigator = ({ navigation }) => {
  return (
    <EditProfileStack.Navigator
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
      <EditProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={({ route }: any) => ({
          headerTitle: "Edit Profile",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => <></>,
        })}
      />
    </EditProfileStack.Navigator>
  );
};

const GiftInfoStack = createStackNavigator();

const GiftInfoNavigator = ({ navigation }) => {
  return (
    <GiftInfoStack.Navigator
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
      <GiftInfoStack.Screen
        name="GiftInfoScreen"
        component={GiftInfoScreen}
        options={({ route }: any) => ({
          headerTitle: "Gift Info",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => <></>,
        })}
      />
    </GiftInfoStack.Navigator>
  );
};

const QuestionnaireStack = createStackNavigator();

const QuestionnaireNavigator = ({ navigation }) => {
  return (
    <QuestionnaireStack.Navigator
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
      <QuestionnaireStack.Screen
        name="QuestionnaireScreen"
        component={QuestionnaireScreen}
        options={({ route }: any) => ({
          headerTitle: "Questionnaire",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => <></>,
        })}
      />
    </QuestionnaireStack.Navigator>
  );
};
