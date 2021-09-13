import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import color from "../../constants/color";
import { seatWidth } from "../../libs/seatController";
import { Seats } from "../../types/seat";
/* components */
import OneSeat from "./OneSeat";
/* context */
import { AuthContext } from "../../context/AuthProvider";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  unBookingModalVisible: boolean;
  setUnBookingModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  seats: Seats;
  setSelectedPostion: React.Dispatch<React.SetStateAction<string>>;
};

const SeatsWithoutUser = ({
  modalVisible,
  setModalVisible,
  unBookingModalVisible,
  setUnBookingModalVisible,
  seats,
  setSelectedPostion,
}: Props) => {
  const { user, setUser } = useContext(AuthContext);

  const handleSeatPress = (position: string) => {
    setModalVisible(!modalVisible);
    setSelectedPostion(position);
  };

  const handleMySeatPress = (position: string) => {
    setUnBookingModalVisible(!unBookingModalVisible);
    setSelectedPostion(position);
  };

  return (
    <>
      {/* 1列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.A1}
            uid={user?.uid}
            position="A1"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.A2}
            uid={user?.uid}
            position="A2"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.A3}
            uid={user?.uid}
            position="A3"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.A4}
            uid={user?.uid}
            position="A4"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.A5}
            uid={user?.uid}
            position="A5"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.A6}
            uid={user?.uid}
            position="A6"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>
      </View>

      {/* 2列目 */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.B1}
            uid={user?.uid}
            position="B1"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.B2}
            uid={user?.uid}
            position="B2"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.B3}
            uid={user?.uid}
            position="B3"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.B4}
            uid={user?.uid}
            position="B4"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.B5}
            uid={user?.uid}
            position="B5"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.B6}
            uid={user?.uid}
            position="B6"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>
      </View>

      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.C1}
            uid={user?.uid}
            position="C1"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.C2}
            uid={user?.uid}
            position="C2"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.C3}
            uid={user?.uid}
            position="C3"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.C4}
            uid={user?.uid}
            position="C4"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.C5}
            uid={user?.uid}
            position="C5"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.C6}
            uid={user?.uid}
            position="C6"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>
      </View>

      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.D1}
            uid={user?.uid}
            position="D1"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.D2}
            uid={user?.uid}
            position="D2"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.D3}
            uid={user?.uid}
            position="D3"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.D4}
            uid={user?.uid}
            position="D4"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.D5}
            uid={user?.uid}
            position="D5"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.D6}
            uid={user?.uid}
            position="D6"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>
      </View>

      {/* 五列目は席の数が不規則なのでハードコーディングする */}
      <View style={styles.seatContainer}>
        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.E1}
            uid={user?.uid}
            position="E1"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.E2}
            uid={user?.uid}
            position="E2"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.E3}
            uid={user?.uid}
            position="E3"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />

          <OneSeat
            seat={seats.E4}
            uid={user?.uid}
            position="E4"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <OneSeat
            seat={seats.E5}
            uid={user?.uid}
            position="E5"
            handleSeatPress={handleSeatPress}
            handleMySeatPress={handleMySeatPress}
          />
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
