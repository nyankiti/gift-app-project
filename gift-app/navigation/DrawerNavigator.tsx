import React, { useRef } from "react";
import { Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import color from "../constants/color";
import { Ionicons } from "@expo/vector-icons";
/* navigator */
import BottomTabNavigator from "./BottomTabNavigator";
/* screen */
import DrawerContent from "../screens/Drawer/DrawerContent";
import QuestionnaireScreen from "../screens/Drawer/QuestionnaireScreen";
import EditProfileScreen from "../screens/Drawer/EditProfileScreen";
import GiftInfoScreen from "../screens/Drawer/GiftInfoScreen";
/* types */
import { DrawerParamList } from "../types/navigationType";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { height, width } from "../libs/utils/Dimension";
/* components */
import BottomUpPlayer from "../components/BottomUpPlayer";

// type DrawerNaviProps = DrawerContentComponentProps<DrawerParamList>;

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const renderContent = () => <BottomUpPlayer />;

  const sheetRef = useRef<BottomSheet>(null);

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
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
        <Drawer.Screen
          name="home"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            headerTitle: "Edit Profile",
            headerRight: () => <></>,
          }}
        />
        <Drawer.Screen name="GiftInfoScreen" component={GiftInfoScreen} />
        <Drawer.Screen
          name="QuestionnaireScreen"
          component={QuestionnaireScreen}
        />
      </Drawer.Navigator>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[0, 300, height - 20]}
        borderRadius={10}
        renderContent={renderContent}
      />
      <View
        style={{
          position: "absolute",
          top: height + 20,
          width: width,
          zIndex: 1,
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => {
            sheetRef.current?.snapTo(height - 20);
          }}
        />
      </View>
    </>
  );
};
export default DrawerNavigator;

const drawerStyle = {
  activeTintColor: "black",
  inactiveTintColor: "black",
  labelStyle: {
    fontFamily: "montserrat",
    marginVertical: 16,
    marginHorizontal: 0,
  },
  iconContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {},
};
