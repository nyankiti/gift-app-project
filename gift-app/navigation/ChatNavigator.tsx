import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* components */
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
/* screen */
import ChatHomeScreen from "../screens/ChatHomeScreen";
import AdminChatHomeScreen from "../screens/AdminChatHomeScreen";
import RoomScreen from "../screens/RoomScreen";
import AddRoomScreen from "../screens/AddRoomScreen";
/* types */
import { ChatTabParamList } from "../types";

// ここは後で消したい
import { AuthContext } from "../src/AuthProvider";

const ChatStack = createStackNavigator<ChatTabParamList>();

const ChatNavigator = ({ navigation }) => {
  const { user } = useContext<any>(AuthContext);
  return (
    <ChatStack.Navigator
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
      {user.uid == "d1SJQ07DeUWVUQ74tNizyrjKR4x1" ||
      user.uid == "zHBbV8enFlR3AEi9D0DbgzamHB63" ? (
        <ChatStack.Screen
          name="AdminChatHomeScreen"
          component={AdminChatHomeScreen}
          options={{
            headerTitle: "Admin Chat home",
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#EAC799"
                onPress={() => navigation.openDrawer()}
              ></Icon.Button>
            ),
            headerRight: () => (
              <FontAwesome5.Button
                name="plus"
                size={25}
                backgroundColor="#EAC799"
                onPress={() => navigation.navigate("AddRoomScreen")}
              />
            ),
          }}
        />
      ) : (
        <ChatStack.Screen
          name="ChatHomeScreen"
          component={ChatHomeScreen}
          options={{
            headerTitle: "Chat home",
            headerLeft: () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#EAC799"
                onPress={() => navigation.openDrawer()}
              ></Icon.Button>
            ),
            headerRight: () => (
              <FontAwesome5.Button
                name="plus"
                size={25}
                backgroundColor="#EAC799"
                onPress={() => navigation.navigate("AddRoomScreen")}
              />
            ),
          }}
        />
      )}
      <ChatStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={({ route }: any) => ({
          title: route.params.thread.name,
          headerRight: () => <></>,
        })}
      />
      <ChatStack.Screen
        name="AddRoomScreen"
        component={AddRoomScreen}
        options={{ headerRight: () => <></> }}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
