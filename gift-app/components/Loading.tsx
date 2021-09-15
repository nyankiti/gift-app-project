import React from "react";
import { View, ActivityIndicator } from "react-native";
import color from "../constants/color";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={color.BASE_COLOR} />
    </View>
  );
};

export default Loading;
