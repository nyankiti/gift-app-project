import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, Button } from "react-native-paper";
import color from "../../constants/color";
import { handleSeatUnBooking } from "../../libs/seatController";
/* context */
import { AuthContext } from "../../context/AuthProvider";
/* types */
import { Seats } from "../../types/seat";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  position: string;
  setSeats: React.Dispatch<React.SetStateAction<Seats>>;
};

const UnBookingModal = ({ visible, setVisible, position, setSeats }: Props) => {
  const { user, setUser } = useContext(AuthContext);

  const handleUnBookingSubmit = async () => {
    if (user !== undefined) {
      await handleSeatUnBooking(user, setUser, position, setSeats);
      setVisible(false);
    }
  };
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>退席する</Text>
      <View style={{ flexDirection: "row" }}></View>

      <View style={styles.buttomContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.buttomText}>座席の位置: </Text>
          <Text style={styles.buttomText}>{position}</Text>
        </View>
        {/* {selectedIcon ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.buttomText}>使用するアイコン: </Text>
            <SeatIcon icon={selectedIcon} color="blue" />
          </View>
        ) : null} */}
      </View>

      <Button
        mode="contained"
        onPress={() => handleUnBookingSubmit()}
        style={styles.button}
      >
        退席
      </Button>
    </Modal>
  );
};

export default UnBookingModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    height: height * 0.4,
    backgroundColor: "white",
    marginBottom: 100,
    borderRadius: 30,
    width: width * 0.9,
    alignSelf: "center",
  },
  text: {
    fontFamily: "ComicSnas",
    padding: 10,
    fontSize: 24,
  },
  button: {
    marginTop: 10,
    backgroundColor: color.BASE_COLOR,
  },
  buttomContainer: {},
  buttomText: {
    fontFamily: "ComicSnas",
    padding: 10,
    fontSize: 16,
  },
});
