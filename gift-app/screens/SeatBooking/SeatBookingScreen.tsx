import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Provider, Portal } from "react-native-paper";
import color from "../../constants/color";
import {
  fetchSeatsState,
  seatWidth,
  initialSeatsObject,
} from "../../libs/seatController";
/* components */
import Screen from "../Screen";
import ChooseIconModal from "../../components/SeatBooking/ChooseIconModal";
import UnBookingModal from "../../components/SeatBooking/UnBookingModal";
import RenderSeats from "../../components/SeatBooking/RenderSeats";
import { Seats } from "../../types/seat";
/* types */
import { SeatBookingTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";

type SeatBookingScreenNavigationProps = StackScreenProps<
  SeatBookingTabParamList,
  "SeatBookingScreen"
>;

const SeatBookingScreen: React.FC<SeatBookingScreenNavigationProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [unBookinModalVisible, setUnBookingModalVisible] =
    useState<boolean>(false);
  const [seats, setSeats] = useState<Seats>(initialSeatsObject);
  const [selectedPostion, setSelectedPosition] = useState<string>("");

  useEffect(() => {
    fetchSeatsState(setSeats);
  }, []);

  return (
    <Screen>
      <Provider>
        <ScrollView style={styles.container}>
          <Portal>
            <ChooseIconModal
              visible={modalVisible}
              setVisible={setModalVisible}
              position={selectedPostion}
              setSeats={setSeats}
            />
            <UnBookingModal
              visible={unBookinModalVisible}
              setVisible={setUnBookingModalVisible}
              position={selectedPostion}
              setSeats={setSeats}
            />
          </Portal>
          <View style={styles.classRoomContainer}>
            <View style={styles.whiteboard}>
              <Text style={{ fontFamily: "ComicSnas" }}>White Board</Text>
            </View>

            <RenderSeats
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              unBookingModalVisible={unBookinModalVisible}
              setUnBookingModalVisible={setUnBookingModalVisible}
              seats={seats}
              setSelectedPostion={setSelectedPosition}
            />
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
});
