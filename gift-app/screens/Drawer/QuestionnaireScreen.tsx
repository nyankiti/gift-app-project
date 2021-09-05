import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Platform,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { db, storage } from "../../libs/firebae";
import { pickImage } from "../../libs/utils/imagePicker";
import { getExtension } from "../../libs/utils/file";
import { width, height } from "../../libs/utils/Dimension";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
/* context */
import { AuthContext } from "../../context/AuthProvider";
/* types */
import { DrawerParamList } from "../../types/navigationType";

const imageWidth = width * 0.6;

const QuestionnaireScreen: React.FC<DrawerContentComponentProps> = ({
  navigation,
}) => {
  const [value, setValue] = useState<string>();
  const [communicationMethod, setCommunicationMethod] = useState<string>();
  const [text, setText] = useState<string>();
  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const { user } = useContext(AuthContext);

  // データをfirestoreとfirestrageに保存 メール送信部分はfunctionsで実装
  const handleSubmit = async () => {
    const image1Url = await uploadImage(image1, setImage1);
    const image2Url = await uploadImage(image2, setImage2);

    // firestoreの登録
    db.collection("mail")
      .add({
        userId: user?.uid,
        name: user?.displayName,
        subject: value,
        communicationMethod: communicationMethod,
        text: text,
        img1: image1Url,
        img2: image2Url,
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });

    if (Platform.OS === "web") {
      alert("Junyaからの回答をお待ちください");
    } else {
      Alert.alert("Junyaからの回答をお待ちください");
    }
    navigation.navigate("NewsScreen");
  };

  const choosePhotoFromLibrary = async (
    setImage: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const uri = await pickImage();
    setImage(uri);
  };

  const uploadImage = async (
    image: any,
    setImage: React.Dispatch<React.SetStateAction<any>>
  ) => {
    if (image == null) {
      return null;
    } else {
      const uploadUri = image;
      const extension = getExtension(uploadUri);
      // file名はランダムに生成
      const filename =
        Math.random().toString(36).substring(7) + "." + extension;

      let storagePath = `mail/${user?.uid}/${filename}`;

      const storageRef = storage.ref(storagePath);

      // blob形式でstorageへ保存する
      const tempUri = await fetch(uploadUri);
      const blob = await tempUri.blob();
      const task = storageRef.put(blob);
      try {
        // taskを待つことでstorageのurlが取れるようになる
        await task;

        const urlOfFireStorage = storageRef.getDownloadURL();

        // storageへのuploadが完了したらstateは開放する
        setImage(null);

        return urlOfFireStorage;
        // return null
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  };

  const showAlert = () => {
    if (Platform.OS === "web") {
      const res = confirm("メールを送信しますか？");
      if (res) {
        handleSubmit();
      }
    } else {
      Alert.alert(
        "メールを送信しますか",
        "メールの内容は studyroomgift@gmail.com へ送信されます",
        [
          { text: "戻る", onPress: () => {} },
          { text: "登録する", onPress: () => handleSubmit() },
        ],
        { cancelable: false }
      );
    }
  };

  const renderImages = () => {
    if (image1 && image2) {
      return (
        <>
          <ImageBackground source={{ uri: image1 }} style={styles.image}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color="black"
              style={{
                position: "absolute",
                bottom: imageWidth - 10,
                left: imageWidth - 10,
              }}
              onPress={() => {
                setImage1(null);
              }}
            />
          </ImageBackground>
          <ImageBackground source={{ uri: image2 }} style={styles.image}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color="black"
              style={{
                position: "absolute",
                bottom: imageWidth - 10,
                left: imageWidth - 10,
              }}
              onPress={() => {
                setImage2(null);
              }}
            />
          </ImageBackground>
        </>
      );
    } else if (image1 && image2 == null) {
      return (
        <>
          <ImageBackground source={{ uri: image1 }} style={styles.image}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color="black"
              style={{
                position: "absolute",
                bottom: imageWidth - 10,
                left: imageWidth - 10,
              }}
              onPress={() => {
                setImage1(null);
              }}
            />
          </ImageBackground>
          <Button
            icon="camera-outline"
            mode="outlined"
            onPress={() => choosePhotoFromLibrary(setImage2)}
            style={styles.button}
          >
            写真を選択(最大2枚)
          </Button>
        </>
      );
    } else if (image1 == null && image2) {
      return (
        <>
          <ImageBackground source={{ uri: image2 }} style={styles.image}>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color="black"
              style={{
                position: "absolute",
                bottom: imageWidth - 10,
                left: imageWidth - 10,
              }}
              onPress={() => {
                setImage2(null);
              }}
            />
          </ImageBackground>
          <Button
            icon="camera-outline"
            mode="outlined"
            onPress={() => choosePhotoFromLibrary(setImage1)}
            style={styles.button}
          >
            写真を選択(最大2枚)
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            icon="camera-outline"
            mode="outlined"
            onPress={() => choosePhotoFromLibrary(setImage1)}
            style={styles.button}
          >
            写真を選択
          </Button>
        </>
      );
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={{ marginVertical: 10 }}>教科</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(v) => setValue(v)}
            style={pickerSelectStyles}
            items={[
              { label: "英語", value: "英語" },
              { label: "国語", value: "国語" },
              { label: "数学", value: "数学" },
              { label: "物理", value: "物理" },
              { label: "化学", value: "化学" },
              { label: "生物", value: "生物" },
              { label: "世界史", value: "世界史" },
              { label: "日本史", value: "日本史" },
              { label: "その他", value: "その他" },
            ]}
            placeholder={{ label: "選択してください", value: "未選択" }}
          />
        </View>
        <Text style={{ marginVertical: 10 }}>内容詳細</Text>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder="学習中の単元、わからない問題についてなど、質問の詳細"
          multiline={true}
          style={styles.textInput}
          textAlignVertical="top"
        />

        <Text style={{ marginVertical: 10 }}>
          該当ページの写真など(解答などもあれば助かります)
        </Text>

        {renderImages()}

        <Text style={{ marginVertical: 10 }}>連絡手段</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(v) => setCommunicationMethod(v)}
            style={pickerSelectStyles}
            items={[
              { label: "LIEN(奨励)", value: "Line" },
              { label: "アプリ内チャット", value: "アプリ内チャット" },
              { label: "メール", value: "メール" },
            ]}
            // style={pickerSelectStyles}
            placeholder={{ label: "選択してください", value: "未選択" }}
          />
        </View>

        <Button
          icon="email-check-outline"
          mode="outlined"
          onPress={() => showAlert()}
          style={styles.button}
        >
          送信
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width * 0.6,
    marginBottom: 10,
  },
  image: {
    marginVertical: 10,
    width: imageWidth,
    height: imageWidth,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  pickerContainer: {
    width: width * 0.85,
    // alignItems: "center",
    // justifyContent: "center",
    // alignSelf: "center",
    marginVertical: 10,
  },
  textInput: {
    width: width * 0.8,
    height: height * 0.3,
    alignSelf: "center",
    textAlignVertical: "top",
    paddingBottom: 0,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: "black",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    color: "#789",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: width * 0.7,
    marginLeft: 30,
  },
  inputAndroid: {
    alignItems: "center",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: width * 0.7,
    height: 40,
    marginLeft: 30,
    backgroundColor: "#eee",
  },
});
