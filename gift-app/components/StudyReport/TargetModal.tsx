import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, TextInput, Button } from "react-native-paper";
import color from "../../constants/color";
import { db } from "../../libs/firebae";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  uid: string;
  dateString: string;
};

const TargetModal = ({
  visible,
  setVisible,
  target,
  setTarget,
  uid,
  dateString,
}: Props) => {
  const [value, setValue] = useState<string>("");

  const submitTarget = async () => {
    const dreamDocRef = db
      .collection("users")
      .doc(uid)
      .collection("target")
      .doc(dateString);

    await dreamDocRef.set({
      target: value,
    });
    // 今日の目標欄の値にも反映させる
    setTarget(value);

    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Enter Today's target</Text>
      <TextInput
        mode="outlined"
        label="目標"
        value={value}
        onChangeText={(v) => setValue(v)}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => submitTarget()}
        style={styles.button}
      >
        登録する
      </Button>
    </Modal>
  );
};

export default TargetModal;

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
