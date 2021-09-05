import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
/* types */
import { AuthTabParamList } from "../types/navigationType";
import color from "../constants/color";
import { DrawerActions } from "@react-navigation/native";

type AuthNavigationProps = StackScreenProps<AuthTabParamList>;

const AuthStack = createStackNavigator<AuthTabParamList>();

const AuthNavigator: React.FC<AuthNavigationProps> = ({ navigation }) => {
  return (
    <AuthStack.Navigator
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
      <AuthStack.Screen
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
      <AuthStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerTitle: "登録",
          headerRight: () => <></>,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
