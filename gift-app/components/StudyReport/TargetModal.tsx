import React, { useState, memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { width, height } from "../../libs/utils/Dimension";
import { Modal, TextInput, Button } from "react-native-paper";
import color from "../../constants/color";
import { db } from "../../libs/firebae";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
/* types */
import { Target } from "../../types/studyReport";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTarget: React.Dispatch<React.SetStateAction<Target>>;
  targetInputValue: Target;
  setTargetInputValue: React.Dispatch<React.SetStateAction<Target>>;
  inputCount: number;
  setInputCount: React.Dispatch<React.SetStateAction<number>>;
  uid: string;
  dateString: string;
};

const TargetModal = memo(
  ({
    visible,
    setVisible,
    setTarget,
    inputCount,
    setInputCount,
    targetInputValue,
    setTargetInputValue,
    uid,
    dateString,
  }: Props) => {
    const renderAdditionalTextInput = () => {
      const inputs = [...Array(inputCount)].map((_, i) => {
        const index = (i + 1).toString() as "1" | "2" | "3" | "4" | "5";
        return (
          <TextInput
            key={index}
            mode="outlined"
            // ユーザーに表示するindex番号は1スタート
            label={"目標" + index}
            value={targetInputValue[index]}
            onChangeText={(v) =>
              setTargetInputValue({ ...targetInputValue, [index]: v })
            }
            style={styles.input}
          />
        );
      });
      return inputs;
    };

    const submitTarget = async () => {
      const dreamDocRef = db
        .collection("users")
        .doc(uid)
        .collection("target")
        .doc(dateString);

      await dreamDocRef.set({
        target: targetInputValue,
      });
      // 今日の目標欄の値にも反映させる
      setTarget(targetInputValue);

      setVisible(false);
    };

    return (
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.text}>Enter Today's target</Text>
        <View style={styles.inputContainer}>
          {renderAdditionalTextInput()}

          {inputCount < 5 ? (
            <Button
              onPress={() => setInputCount(inputCount + 1)}
              style={{
                marginTop: 10,
                marginLeft: 20,
                alignSelf: "flex-start",
              }}
            >
              <Text style={{ fontFamily: "KiwiMaru" }}>追加する</Text>
            </Button>
          ) : null}
        </View>
        <Button
          mode="contained"
          onPress={() => submitTarget()}
          style={styles.button}
        >
          <Text style={{ fontFamily: "KiwiMaru" }}>登録する</Text>
        </Button>
      </Modal>
    );
  }
);

export default TargetModal;

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
  inputContainer: {
    width: width * 0.7,
  },
  input: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 5,
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
