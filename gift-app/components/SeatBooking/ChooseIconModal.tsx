import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, Button } from "react-native-paper";
import color from "../../constants/color";
import { handleSeatSubmit, JapaneseSeats } from "../../libs/seatController";
import { db } from "../../libs/firebae";
import {
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
/* components */
import SeatIcon from "./SeatIcon";
/* context */
import { AuthContext } from "../../context/AuthProvider";
/* types */
import { SeatIconComponents, Seats, Position } from "../../types/seat";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  position: Position;
  setSeats: React.Dispatch<React.SetStateAction<Seats>>;
  navigation: any;
};

/*
<MaterialIcons name="face-retouching-natural" size={40} color="black" style={styles.icon}/>
<FontAwesome5 name="robot" size={40} color="black" style={styles.icon}/>
<MaterialCommunityIcons name="penguin" size={40} color="black" style={styles.icon}/>
<MaterialCommunityIcons name="panda" size={40} color="black" style={styles.icon}/>
<Ionicons name="ios-paw" size={40} color="black" style={styles.icon}/>
<Entypo name="man" size={40} color="black" style={styles.icon}/>
<FontAwesome name="user" size={40} color="black" style={styles.icon}/>
<FontAwesome name="linux" size={40} color="black" style={styles.icon}/>
<FontAwesome5 name="linux" size={40} color="black" style={styles.icon}/>
<FontAwesome5 name="docker" size={40} color="black" style={styles.icon}/>
<Ionicons name="rocket" size={40} color="black" style={styles.icon}/>
<Ionicons name="ios-logo-snapchat" size={40} color="black" style={styles.icon}/>
<Ionicons name="md-barbell" size={40} color="black" style={styles.icon}/>
<FontAwesome5 name="github" size={40} color="black" style={styles.icon}/>
*/

const ChooseIconModal = ({
  visible,
  setVisible,
  position,
  setSeats,
  navigation,
}: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const [selectedIcon, setSelectedIcon] = useState<[SeatIconComponents, any]>();
  const [selectedColor, setSelectedColor] = useState<string>("black");

  const handleSubmit = async () => {
    if (user?.uid === "00000") {
      Alert.alert("座席登録にはログインが必要です");
      return navigation.navigate("SignInScreen", {stackName: "SeatBooking"});
    }
    if (checkDoubleBooking()) {
      Alert.alert("一人一席でお願いします");
      return;
    }
    if (user !== undefined && selectedIcon !== undefined) {
      await handleSeatSubmit(
        user,
        setUser,
        position,
        selectedColor,
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

  const handleColorPress = (color: string) => {
    setSelectedColor(color);
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
          onPress={() =>
            handleIconPress(["MaterialIcons", "face-retouching-natural"])
          }
        >
          <MaterialIcons
            name="face-retouching-natural"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["FontAwesome5", "robot"])}
        >
          <FontAwesome5
            name="robot"
            size={32}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["FontAwesome5", "hourglass-half"])}
        >
          <FontAwesome5
            name="hourglass-half"
            size={32}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => handleIconPress(["Ionicons", "ios-paw"])}
        >
          <Ionicons
            name="ios-paw"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["Ionicons", "ios-logo-snapchat"])}
        >
          <Ionicons
            name="ios-logo-snapchat"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["MaterialCommunityIcons", "panda"])}
        >
          <MaterialCommunityIcons
            name="panda"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["FontAwesome5", "linux"])}
        >
          <FontAwesome5
            name="linux"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIconPress(["FontAwesome5", "docker"])}
        >
          <FontAwesome5
            name="docker"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Select Your color</Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => handleColorPress("tomato")}>
          <MaterialIcons name="stop-circle" size={40} color="tomato" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("orange")}>
          <MaterialIcons name="stop-circle" size={40} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("lime")}>
          <MaterialIcons name="stop-circle" size={40} color="lime" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("yellow")}>
          <MaterialIcons name="stop-circle" size={40} color="yellow" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("lavender")}>
          <MaterialIcons name="stop-circle" size={40} color="lavender" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("dodgerblue")}>
          <MaterialIcons name="stop-circle" size={40} color="dodgerblue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("blueviolet")}>
          <MaterialIcons name="stop-circle" size={40} color="blueviolet" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleColorPress("dimgray")}>
          <MaterialIcons name="stop-circle" size={40} color="dimgray" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttomContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.buttomText}>座席の位置: </Text>
          <Text style={styles.buttomText}>{JapaneseSeats[position]}</Text>
        </View>
        {selectedIcon ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.buttomText}>使用するアイコン: </Text>
            <SeatIcon icon={selectedIcon} color={selectedColor} />
          </View>
        ) : null}
      </View>

      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        style={styles.button}
      >
        登録する
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
    fontFamily: "KiwiMaru",
  },
  icon: {
    padding: 10,
  },
  buttomContainer: {},
  buttomText: {
    fontFamily: "KiwiMaru",
    padding: 10,
    fontSize: 16,
  },
});
