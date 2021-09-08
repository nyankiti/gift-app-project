import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, TextInput, Button } from "react-native-paper";
import color from "../../constants/color";
import { db } from "../../libs/firebae";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dream: string;
  setDream: React.Dispatch<React.SetStateAction<string>>;
  dreamStack: string[];
  setDreamStack: React.Dispatch<React.SetStateAction<string[]>>;
  uid: string;
};

const DreamModal = ({
  visible,
  setVisible,
  dream,
  setDream,
  dreamStack,
  setDreamStack,
  uid,
}: Props) => {
  const [value, setValue] = useState<string>("");

  const submitDream = async () => {
    const dreamDocRef = db
      .collection("users")
      .doc(uid)
      .collection("dream")
      .doc(uid);

    //stackに新しいdreamを追加する
    let tempStack = dreamStack;
    // 元の夢と同じ値を送信している場合や空文字列の場合は取り消す
    if (value === "" || tempStack[tempStack.length - 1] === value) {
      return;
    } else {
      tempStack.push(value);

      console.log(tempStack);

      await dreamDocRef.set({
        dream: tempStack,
      });
      // 夢欄の値にも反映させる
      setDream(value);
    }
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => setVisible(false)}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.text}>Enter Your Dream</Text>
      <TextInput
        mode="outlined"
        label="新しい夢"
        value={value}
        onChangeText={(v) => setValue(v)}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => submitDream()}
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
