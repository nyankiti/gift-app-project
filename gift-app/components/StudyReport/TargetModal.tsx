import React, { useState, memo, useEffect } from "react";
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
  target: Target;
  setTarget: React.Dispatch<React.SetStateAction<Target>>;
  uid: string;
  dateString: string;
};

const TargetModal = memo(
  ({ visible, setVisible, target, setTarget, uid, dateString }: Props) => {
    const [targetInputValue, setTargetInputValue] = useState<Target>({
      "1": "",
    });
    const [inputCount, setInputCount] = useState(0);

    useEffect(() => {
      setTargetInputValue(target);
      setInputCount(Object.values(target).filter((v) => v !== "").length);
    }, [visible]);

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
          {inputCount >= 1 ? (
            <TextInput
              mode="outlined"
              label={"目標1"}
              value={targetInputValue[1]}
              onChangeText={(v) =>
                setTargetInputValue({ ...targetInputValue, "1": v })
              }
              style={styles.input}
            />
          ) : null}

          {inputCount >= 2 ? (
            <TextInput
              mode="outlined"
              label={"目標2"}
              value={targetInputValue[2]}
              onChangeText={(v) =>
                setTargetInputValue({ ...targetInputValue, "2": v })
              }
              style={styles.input}
            />
          ) : null}

          {inputCount >= 3 ? (
            <TextInput
              mode="outlined"
              label={"目標3"}
              value={targetInputValue[3]}
              onChangeText={(v) =>
                setTargetInputValue({ ...targetInputValue, "3": v })
              }
              style={styles.input}
            />
          ) : null}
          {inputCount >= 4 ? (
            <TextInput
              mode="outlined"
              label={"目標4"}
              value={targetInputValue[4]}
              onChangeText={(v) =>
                setTargetInputValue({ ...targetInputValue, "4": v })
              }
              style={styles.input}
            />
          ) : null}

          {inputCount >= 5 ? (
            <TextInput
              mode="outlined"
              label={"目標5"}
              value={targetInputValue[5]}
              onChangeText={(v) =>
                setTargetInputValue({ ...targetInputValue, "5": v })
              }
              style={styles.input}
            />
          ) : null}

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
    height: height * 0.7,
    backgroundColor: "white",
    marginBottom: 100,
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
