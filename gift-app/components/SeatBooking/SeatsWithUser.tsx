import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import color from "../../constants/color";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { seatWidth, seatsArray } from "../../libs/seatUtils";
import { Seats } from "../../types/seat";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  seats: Seats;
};

const SeatsWithUser = ({ modalVisible, setModalVisible, seats }: Props) => {
  const handleSeatPress = (position: string) => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {/* 一列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("A1")}
          >
            <MaterialCommunityIcons name="face" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("A2")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("A3")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("A4")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("A5")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("A6")}
          ></TouchableOpacity>
        </View>
      </View>

      {/* 二列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("B1")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("B2")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("B3")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("B4")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("B5")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("B6")}
          ></TouchableOpacity>
        </View>
      </View>

      {/* 三列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("C1")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("C2")}
          >
            <FontAwesome5 name="hourglass-half" size={40} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("C3")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("C4")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("C5")}
          >
            <MaterialCommunityIcons name="sunglasses" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("C6")}
          ></TouchableOpacity>
        </View>
      </View>

      {/* 四列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D1")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D2")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D3")}
          >
            <Ionicons name="md-book-sharp" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D4")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D5")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D6")}
          ></TouchableOpacity>
        </View>
      </View>
      {/* 五列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D1")}
          ></TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D2")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D3")}
          >
            <Ionicons name="md-book-sharp" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D4")}
          ></TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.menuBox}
            onPress={() => handleSeatPress("D5")}
          ></TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SeatsWithUser;

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
