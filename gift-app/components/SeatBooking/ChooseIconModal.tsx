import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, Button } from "react-native-paper";
import color from "../../constants/color";
import { db } from "../../libs/firebae";
import {
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
  FontAwesome5,
  Foundation,
} from "@expo/vector-icons";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChooseIconModal = ({ visible, setVisible }: Props) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Select Your Image</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="face"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="face-woman"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="alarm" size={40} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="alarm-outline"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Octicons name="watch" size={40} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <FontAwesome5
            name="hourglass-half"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Foundation
            name="clipboard-notes"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="md-book-sharp"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="sunglasses"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="math-compass"
            size={40}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={() => {}} style={styles.button}>
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
    height: height * 0.4,
    backgroundColor: "white",
    marginBottom: 200,
    borderRadius: 30,
    width: width * 0.9,
    alignSelf: "center",
  },
  input: {
    width: "80%",
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
});
