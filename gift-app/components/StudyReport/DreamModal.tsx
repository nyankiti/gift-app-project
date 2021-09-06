import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, TextInput, Button } from "react-native-paper";
import color from "../../constants/color";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dream: string;
  setDream: React.Dispatch<React.SetStateAction<string>>;
};

const DreamModal = ({ visible, setVisible, dream, setDream }: Props) => {
  // const length =

  const handleInputChange = (v: string): void => {};

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Enter Your Dream</Text>
      <TextInput
        mode="outlined"
        label="夢"
        value={dream[0]}
        onChangeText={(v) => handleInputChange(v)}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => console.log("Pressed")}
        style={styles.button}
      >
        更新する
      </Button>
    </Modal>
  );
};

export default DreamModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    height: height * 0.3,
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
});
