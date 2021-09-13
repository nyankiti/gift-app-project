import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { width, height } from "../../libs/utils/Dimension";
import color from "../../constants/color";
import {
  db,
  auth,
  uploadImageToStorage,
  FirebaseTimestamp,
} from "../../libs/firebae";
/* components */
import Screen from "../Screen";
/* context */
import { AuthContext } from "../../context/AuthProvider";
import { pickImage } from "../../libs/utils/imagePicker";

const EditProfileScreen = ({ navigation }: any) => {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState<string>();
  const [image, setImage] = useState<any>();
  const [transferred, setTransferred] = useState(0);

  const handleNameInputChange = (val: string) => {
    setName(val);
  };

  const choosePhotoFromLibrary = async () => {
    const uri = await pickImage();
    setImage(uri);
  };

  const handleSubmit = async () => {
    if (user !== undefined) {
      let imgUrl = await uploadImageToStorage(
        image,
        user,
        setTransferred,
        setImage
      );

      // 新しい写真を指定していない、または写真のfirestorageへの保存が失敗した場合、もとの写真を使う
      if (imgUrl == null && user.userImg) {
        imgUrl = user.userImg;
      }

      //fireAuthenticationの更新
      auth.currentUser
        ?.updateProfile({
          displayName: name,
          photoURL: imgUrl,
        })
        .then(
          () => {
            // authenticationの更新が成功した後にcontextの更新
            setUser({
              ...user,
              displayName: name,
              userImg: imgUrl,
            });
          },
          (error) => {
            console.log(
              "something went wrong in updating authenticaion info: " + error
            );
          }
        );

      // firestoreの更新
      const userRef = db.collection("users").doc(user.uid);
      await userRef.set(
        {
          displayName: name,
          userImg: imgUrl,
          updatedAt: FirebaseTimestamp.now(),
        },
        { merge: true }
      );

      navigation.navigate("home");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>プロフィール情報の更新</Text>
        <Text style={styles.header_subtext}>Gift自習室ユーザー用</Text>
      </View>
      <View style={styles.formArea}>
        <Text style={[styles.text_footer, { marginTop: 20 }]}></Text>
        <TouchableOpacity onPress={choosePhotoFromLibrary}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={
                image
                  ? { uri: image }
                  : user?.userImg
                  ? { uri: user.userImg }
                  : require("../../assets/images/Gift_splash_20210220.jpg")
              }
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={[styles.text_footer, { marginTop: 20 }]}></Text>

        <View style={styles.action}>
          <FontAwesome name="address-book-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val: string) => handleNameInputChange(val)}
          />
        </View>
      </View>
      <View style={styles.buttonArea}>
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSubmit} style={styles.signIn}>
            <Text style={[styles.textSign, { color: color.BASE_COLOR }]}>
              更新する
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    margin: width * 0.03,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    marginLeft: width * 0.05,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.BASE_COLOR,
    paddingBottom: 5,
    width: width * 0.8,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "flex-start",
    marginTop: height * 0.08,
  },
  signIn: {
    // width: '100%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: width * 0.06,
  },
  textSign: {
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily: "ComicSnas_bd",
  },
  buttonArea: {
    flex: 2,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
    alignSelf: "center",
  },
  footer_text: {
    fontSize: 16,
    fontFamily: "ComicSnas",
    padding: 10,
  },
  footer_button_text: {
    fontSize: 24,
    fontFamily: "ComicSnas_bd",
    marginLeft: 10,
    // marginTop: 5,
  },
  formArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  header_text: {
    fontSize: 36,
    fontFamily: "KiwiMaru",
    marginTop: height * 0.02,
  },
  header_subtext: {
    fontSize: 20,
    fontFamily: "KiwiMaru",
    marginTop: height * 0.02,
  },
});
