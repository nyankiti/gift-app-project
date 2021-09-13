import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { width, height } from "../../libs/utils/Dimension";
/* components */
import Screen from "../Screen";
/* context */
import { AuthContext } from "../../context/AuthProvider";
/* types */
import {
  StudyReportTabParamList,
  SeatBookingTabParamList,
} from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";
import color from "../../constants/color";

type StudyReportNavigationProps = StackScreenProps<
  StudyReportTabParamList,
  "SignUpScreen"
>;

type SeatBookingNavigationProps = StackScreenProps<
  SeatBookingTabParamList,
  "SignUpScreen"
>;

const SignUpScreen: React.FC<
  StudyReportNavigationProps | SeatBookingNavigationProps
> = ({ navigation, route }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { register } = useContext(AuthContext);

  const textInputChange = (val: string) => {
    if (val.length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidUser: false,
      });
    }
  };

  const handleNameInputChange = (val: string) => {
    setData({
      ...data,
      name: val,
    });
  };

  const handlePasswordChange = (val: string) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (val: string) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleValidPassword = (val: string) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>アカウント登録</Text>
        <Text style={styles.header_subtext}>Gift自習室ユーザー用</Text>
      </View>
      <View style={styles.formArea}>
        <View style={{ marginTop: height * 0.03 }}></View>

        <Text style={styles.text_footer}></Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {/* テキスト入力されたことを確認してcheck-circleのアイコンを表示させる */}
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Emailは4文字以上必要です</Text>
          </Animatable.View>
        )}

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

        <Text style={[styles.text_footer, { marginTop: 20 }]}></Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="New Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
            onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {/* 状況に応じて文字を 隠すor見せる でFeatherアイコンを変更する*/}
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="green" size={20} />
            ) : (
              <Feather name="eye" color="green" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Passwordは8文字以上必要です</Text>
          </Animatable.View>
        )}

        <Text style={[styles.text_footer, { marginTop: 20 }]}></Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val: string) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {/* 状況に応じて文字を 隠すor見せる でFeatherアイコンを変更する*/}
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="green" size={20} />
            ) : (
              <Feather name="eye" color="green" size={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonArea}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => register(data.email, data.password, data.name)}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: color.BASE_COLOR }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footer_text}>Go to Sign in Screen</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
          <Text style={styles.footer_button_text}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

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
