import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import Icon from "react-native-vector-icons/Ionicons";
/* screen */
import AccountInfoScreen from "../screens/AccountInfoScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SupportScreen from "../screens/SupportScreen";
/* types */
import { AccountInfoTabParamList } from "../types";

const AccountInfoStack = createStackNavigator<AccountInfoTabParamList>();

const AccountInfoNavigator = ({ navigation }) => {
  return (
    <AccountInfoStack.Navigator
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
      <AccountInfoStack.Screen
        name="AccountInfoScreen"
        component={AccountInfoScreen}
        options={{
          headerTitle: "AccountInfo",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
      <AccountInfoStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit Profile",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
      <AccountInfoStack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{
          headerTitle: "SupportInfo",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#EAC799"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </AccountInfoStack.Navigator>
  );
};

export default AccountInfoNavigator;
