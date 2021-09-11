import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import color from "../../constants/color";
import { DrawerActions } from "@react-navigation/routers";

export default function BarsIcon({ navigation }: any) {
  return (
    <View style={{ paddingLeft: 10, marginRight: 20 }}>
      <FontAwesome
        name="bars"
        size={25}
        backgroundColor={color.BASE_COLOR}
        color="#fff"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      ></FontAwesome>
    </View>
  );
}

const styles = StyleSheet.create({});
