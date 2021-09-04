import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
/* navigator */
import BottomTabNavigator from "./BottomTabNavigator";
/* screen */
import DrawerContent from "../screens/DrawerContent";
import NewsScreen from "../screens/News/NewsScreen";
/* types */
import { DrawerParamaList } from "../types/navigationType";

const Drawer = createDrawerNavigator<DrawerParamaList>();

const DrawerNavigator = ({ navigation }: any) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
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
