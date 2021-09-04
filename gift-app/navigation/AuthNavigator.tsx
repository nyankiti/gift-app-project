import React from "react";
import { View, Text } from "react-native";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
/* screen */
import SignInScreen from "../screens/Auth/SignInScreen";
/* types */
import { AuthTabParamList } from "../types/navigationType";
import color from "../constants/color";

type SingInScreenNavigationProps = StackScreenProps<
  AuthTabParamList,
  "SingInScreen"
>;

const AuthStack = createStackNavigator<AuthTabParamList>();

const AuthNavigator: React.FC<SingInScreenNavigationProps> = ({
  navigation,
}) => {
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
        name="SingInScreen"
        component={SignInScreen}
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
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
