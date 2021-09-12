import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Provider, Portal } from "react-native-paper";
import { height, width } from "../../libs/utils/Dimension";
import color from "../../constants/color";
import {
  fetchSeatsState,
  seatWidth,
  initialSeatsObject,
} from "../../libs/seatUtils";
/* components */
import Screen from "../Screen";
import ChooseIconModal from "../../components/SeatBooking/ChooseIconModal";
import SeatsWithoutUser from "../../components/SeatBooking/SeatsWithoutUser";
import SeatsWithUser from "../../components/SeatBooking/SeatsWithUser";
import { Seats } from "../../types/seat";

const SeatBookingScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [seats, setSeats] = useState<Seats>(initialSeatsObject);

  const handleSeatPress = (row: string, col: number) => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    fetchSeatsState(setSeats);
  }, []);

  const handleRegister = () => {};
  return (
    <Screen>
      <Provider>
        <ScrollView style={styles.container}>
          <Portal>
            <ChooseIconModal
              visible={modalVisible}
              setVisible={setModalVisible}
            />
          </Portal>
          <View style={styles.classRoomContainer}>
            <View style={styles.whiteboard}>
              <Text style={{ fontFamily: "ComicSnas" }}>White Board</Text>
            </View>
            {/* userが既に席を取っているかどうかで場合分け */}
            {true ? (
              <SeatsWithoutUser
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                seats={seats}
              />
            ) : (
              <SeatsWithUser
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                seats={seats}
              />
            )}
          </View>

          <View style={styles.bookingForm}>
            <Text style={styles.formTitle}>Choosen seats</Text>
            {/* {renderChoosenSeats(selected["A"], "A")}
          {renderChoosenSeats(selected["B"], "B")}
          {renderChoosenSeats(selected["C"], "C")}
          {renderChoosenSeats(selected["D"], "D")}
          {renderChoosenSeats(selected["E"], "E")} */}

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleRegister}
            >
              <Text style={styles.button_text}>登録する</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Provider>
    </Screen>
  );
};

export default SeatBookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  classRoomContainer: {
    margin: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  whiteboard: {
    backgroundColor: "white",
    width: seatWidth * 3,
    marginVertical: 10,
    marginLeft: seatWidth * 2,
    alignItems: "center",
  },

  info: {
    fontSize: 22,
    color: "#696969",
  },
  bookingForm: {
    alignItems: "center",
  },
  formTitle: {
    fontSize: 20,
    fontFamily: "ComicSnas",
  },
  buttonContainer: {
    backgroundColor: "#EAC799",
    borderRadius: 20,
    paddingVertical: 5,
    width: width * 0.6,
  },
  button_text: {
    fontSize: 28,
    fontFamily: "Anzumozi",
    textAlign: "center",
  },
});
