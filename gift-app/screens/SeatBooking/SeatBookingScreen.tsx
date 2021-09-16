import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Provider, Portal } from "react-native-paper";
import color from "../../constants/color";
import {
  fetchSeatsState,
  seatWidth,
  initialSeatsObject,
} from "../../libs/seatController";
import { Ionicons } from "@expo/vector-icons";
/* components */
import Screen from "../Screen";
import ChooseIconModal from "../../components/SeatBooking/ChooseIconModal";
import UnBookingModal from "../../components/SeatBooking/UnBookingModal";
import RenderSeats from "../../components/SeatBooking/RenderSeats";
import Loading from "../../components/Loading";
/* types */
import { Seats, Position } from "../../types/seat";
import { SeatBookingTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

type SeatBookingScreenNavigationProps = StackScreenProps<
  SeatBookingTabParamList,
  "SeatBookingScreen"
>;

const SeatBookingScreen: React.FC<SeatBookingScreenNavigationProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [unBookinModalVisible, setUnBookingModalVisible] =
    useState<boolean>(false);
  const [seats, setSeats] = useState<Seats>(initialSeatsObject);
  const [selectedPostion, setSelectedPosition] = useState<Position>("A1");

  useEffect(() => {
    fetchSeatsState(setSeats);
  }, []);

  const handleReloadPress = async () => {
    setLoading(true);
    await fetchSeatsState(setSeats);
    setLoading(false);
  };

  if (loading) return <Loading />;

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

          <TouchableOpacity
            style={{ flexDirection: "row-reverse", marginLeft: 16 }}
            onPress={handleReloadPress}
          >
            <View>
              <Text
                style={{ fontFamily: "KiwiMaru", fontSize: 16, marginTop: 4 }}
              >
                リロード
              </Text>
              <Ionicons
                name="reload"
                size={28}
                color="gray"
                style={{ marginLeft: "auto", marginRight: 4 }}
              />
            </View>
          </TouchableOpacity>

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
