import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, Button } from "react-native-paper";
import color from "../../constants/color";
import { handleSeatUnBooking } from "../../libs/seatController";
import { fetchTotalStudyTime } from "../../libs/studyReportController";
import { formatDateUntilDay } from "../../libs/utils/file";
/* context */
import { AuthContext } from "../../context/AuthProvider";
import { OthersContext } from "../../context/OthersProvider";
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
  const { setTotalStudyTime, selectedDateString } = useContext(OthersContext);

  const handleUnBookingSubmit = async () => {
    if (user !== undefined) {
      await handleSeatUnBooking(user, setUser, position, setSeats);
      setVisible(false);

      // studyReport画面で選択中の日付が今日の場合は、totalStudyTimeを更新する
      if (selectedDateString == formatDateUntilDay()) {
        await fetchTotalStudyTime(
          user?.uid,
          formatDateUntilDay(),
          setTotalStudyTime
        );
      }
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
    fontFamily: "KiwiMaru",
    padding: 10,
    fontSize: 24,
  },
  button: {
    marginTop: 10,
    backgroundColor: color.BASE_COLOR,
  },
  buttomContainer: {},
  buttomText: {
    fontFamily: "KiwiMaru",
    padding: 10,
    fontSize: 16,
  },
});
