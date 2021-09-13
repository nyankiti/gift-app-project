import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, Button } from "react-native-paper";
import color from "../../constants/color";
import { handleSeatSubmit } from "../../libs/seatController";
import { db } from "../../libs/firebae";
import {
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";
/* components */
import SeatIcon from "./SeatIcon";
/* context */
import { AuthContext } from "../../context/AuthProvider";
/* types */
import { SeatIconComponents, Seats } from "../../types/seat";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  position: string;
  setSeats: React.Dispatch<React.SetStateAction<Seats>>;
};

const ChooseIconModal = ({
  visible,
  setVisible,
  position,
  setSeats,
}: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedIcon, setSelectedIcon] = useState<[SeatIconComponents, any]>();

  const handleSubmit = async () => {
    if (checkDoubleBooking()) {
      Alert.alert("一人一席でお願いします");
      return;
    }
    if (user !== undefined && selectedIcon !== undefined) {
      await handleSeatSubmit(
        user,
        setUser,
        position,
        "red",
        selectedIcon,
        setSeats
      );
      setVisible(false);
    } else {
      Alert.alert("アイコンを選択してください");
    }
  };

  const handleIconPress = (icon: [SeatIconComponents, any]) => {
    setSelectedIcon(icon);
  };

  const checkDoubleBooking = () => {
    if (user?.currentSeat) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Select Your Image</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => handleIconPress(["MaterialCommunityIcons", "face"])}
        >
          <MaterialCommunityIcons
            name="face"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleIconPress(["MaterialCommunityIcons", "face-woman"])
          }
        >
          <MaterialCommunityIcons
            name="face-woman"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["Ionicons", "alarm"])}
        >
          <Ionicons name="alarm" size={40} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["Ionicons", "alarm-outline"])}
        >
          <Ionicons
            name="alarm-outline"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["Octicons", "watch"])}
        >
          <Octicons name="watch" size={40} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => handleIconPress(["FontAwesome5", "hourglass-half"])}
        >
          <FontAwesome5
            name="hourglass-half"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["Foundation", "clipboard-notes"])}
        >
          <Foundation
            name="clipboard-notes"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["Ionicons", "md-book-sharp"])}
        >
          <Ionicons
            name="md-book-sharp"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleIconPress(["MaterialCommunityIcons", "sunglasses"])
          }
        >
          <MaterialCommunityIcons
            name="sunglasses"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleIconPress(["MaterialCommunityIcons", "math-compass"])
          }
        >
          <MaterialCommunityIcons
            name="math-compass"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttomContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.buttomText}>座席の位置: </Text>
          <Text style={styles.buttomText}>{position}</Text>
        </View>
        {selectedIcon ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.buttomText}>使用するアイコン: </Text>
            <SeatIcon icon={selectedIcon} color="blue" />
          </View>
        ) : null}
      </View>

      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        style={styles.button}
      >
        更新する
      </Button>
    </Modal>
  );
};

export default ChooseIconModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    height: height * 0.6,
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
  icon: {
    padding: 10,
  },
  buttomContainer: {},
  buttomText: {
    fontFamily: "ComicSnas",
    padding: 10,
    fontSize: 16,
  },
});
