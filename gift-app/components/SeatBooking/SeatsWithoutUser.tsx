import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import color from "../../constants/color";
// import { seatWidth } from "../../screens/SeatBooking/SeatBookingScreen";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { width } from "../../libs/utils/Dimension";
import { seatWidth, seatsArray } from "../../libs/seatUtils";
import { Seats } from "../../types/seat";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  seats: Seats;
};

const SeatsWithoutUser = ({ modalVisible, setModalVisible, seats }: Props) => {
  const { A1 } = seats;
  // console.log("AAAAAAAAAA");
  // console.log(A1);
  const handleSeatPress = (position: string) => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {seatsArray.map((subArray, index) => {
        if (index === 4) {
          return null;
        }
        return (
          <View style={styles.seatContainer} key={index.toString()}>
            {subArray.map((value, index) => {
              // 一つ飛ばしで二席ずつ描画する
              if (index % 2 === 1) {
                return (
                  <View style={{ flexDirection: "row" }} key={value}>
                    <TouchableOpacity
                      style={styles.menuBox}
                      onPress={() => handleSeatPress(value)}
                    ></TouchableOpacity>
                    <TouchableOpacity
                      style={styles.menuBox}
                      onPress={() => handleSeatPress(value)}
                    ></TouchableOpacity>
                  </View>
                );
              } else {
                return null;
              }
            })}
          </View>
        );
      })}

      {/* 五列目は席の数が不規則なのでハードコーディングする */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("E1")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("E2")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("E3")}
          >
            <Ionicons name="md-book-sharp" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("E4")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("E5")}
          ></TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SeatsWithoutUser;

const styles = StyleSheet.create({
  seatContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
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
