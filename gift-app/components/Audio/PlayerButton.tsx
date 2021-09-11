import React from "react";
import { AntDesign } from "@expo/vector-icons";
import color from "../../constants/color";

type Props = {
  iconType: "PLAY" | "PAUSE" | "NEXT" | "PREV";
  size?: number;
  iconColor?: string;
  onPress: any;
  style?: any;
};

const PlayerButton = (props: Props) => {
  const { iconType, size = 40, iconColor = color.FONT, onPress, style } = props;
  const getIconName = (type: "PLAY" | "PAUSE" | "NEXT" | "PREV") => {
    switch (type) {
      case "PLAY":
        return "pausecircle";
      case "PAUSE":
        return "playcircleo";
      case "NEXT":
        return "forward";
      case "PREV":
        return "banckward";
    }
  };
  return (
    <AntDesign
      style={style}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
    />
  );
};

export default PlayerButton;
