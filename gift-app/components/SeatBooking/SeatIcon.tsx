import React from "react";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
  Foundation,
  Octicons,
} from "@expo/vector-icons";
/* types */
import { SeatIconComponents } from "../../types/seat";

type Props = {
  icon: [SeatIconComponents, any];
  color: string;
};

const SeatIcon = ({ icon, color }: Props) => {
  switch (icon[0]) {
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={icon[1]} size={40} color={color} />;
    case "Ionicons":
      return <Ionicons name={icon[1]} size={40} color={color} />;
    case "FontAwesome5":
      return <FontAwesome5 name={icon[1]} size={40} color={color} />;
    case "Foundation":
      return <Foundation name={icon[1]} size={40} color={color} />;
    case "Octicons":
      return <Octicons name={icon[1]} size={40} color={color} />;
  }
};

export default SeatIcon;
