import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { seatWidth } from "../../libs/seatController";
import color from "../../constants/color";
/* components */
import SeatIcon from "./SeatIcon";
/* types */
import { SeatIconComponents } from "../../types/seat";

type Props = {
  seat:
    | {
        color: string;
        icon: [SeatIconComponents, any];
        uid: string;
      }
    | false;
  uid: string;
  position: string;
  handleSeatPress: (position: string) => void;
  handleMySeatPress: (position: string) => void;
};

const OneSeat = ({
  seat,
  uid,
  position,
  handleSeatPress,
  handleMySeatPress,
}: Props) => {
  // const handleSeatPress = (s: string) => {
  //   setVisible(!visible);
  //   setSelectedPostion(position);
  // };

  // const handleMySeatPress = () => {};

  // 座席を登録した人がいない場合
  if (seat === false) {
    return (
      <TouchableOpacity
        style={styles.menuBox}
        onPress={() => handleSeatPress(position)}
      ></TouchableOpacity>
    );
  } else {
    // その席が自分が登録したものである場合
    if (seat.uid === uid) {
      return (
        <TouchableOpacity
          style={styles.menuBox}
          onPress={() => handleMySeatPress(position)}
        >
          <SeatIcon icon={seat.icon} color={seat.color} />
        </TouchableOpacity>
      );
    } else {
      // 他の人がその席を既に登録している場合
      return (
        <TouchableOpacity style={styles.menuBox}>
          <SeatIcon icon={seat.icon} color="black" />
        </TouchableOpacity>
      );
    }
  }
};

export default OneSeat;

const styles = StyleSheet.create({
  menuBox: {
    backgroundColor: color.BASE_COLOR,
    width: seatWidth,
    height: seatWidth,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 3,
      width: -3,
    },
    borderColor: "lightgray",
    borderWidth: 0.5,
    elevation: 3,
    marginBottom: 40,
  },
});
