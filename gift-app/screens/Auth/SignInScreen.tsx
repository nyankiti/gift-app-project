import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { width, height } from "../../libs/utils/Dimension";
import color from "../../constants/color";
/* components */
import Screen from "../Screen";
/*context */
import { AuthContext } from "../../context/AuthProvider";
/* types */
import {
  SeatBookingTabParamList,
  StudyReportTabParamList,
} from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";

type StudyReportNavigationProps = StackScreenProps<
  StudyReportTabParamList,
  "SignInScreen"
>;

type SeatBookingNavigationProps = StackScreenProps<
  SeatBookingTabParamList,
  "SignInScreen"
>;

const SignInScreen: React.FC<
  StudyReportNavigationProps | SeatBookingNavigationProps
> = ({ navigation, route }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    successLogin: true,
  });

  const { login } = useContext(AuthContext);

  const textInputChange = (val: string) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidUser: false,
      });
    }
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

  const updateSecureTextEntry = () => {
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
  const handlePressLogin = async () => {
    await login(data.email, data.password);
    setData({
      ...data,
      successLogin: false,
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Lines</Text>
      </View>
      <View style={styles.centerTextArea}>
        <Text style={[styles.center_text, { fontFamily: "ComicSnas_bd" }]}>
          Welcome to Gift Account,
        </Text>
        <Text style={[styles.center_text, { fontFamily: "Anzumozi" }]}>
          {route.params?.stackName === "SeatBooking" ? "座席管理" : "勉強管理"}
          は自習室ユーザー専用の機能です
        </Text>
      </View>
      <View style={styles.formArea}>
        <View style={{ marginTop: height * 0.03 }}></View>

        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            // color='#EAC799'
            color="#05375a"
            size={20}
          />
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
              <Feather
                name="check"
                // color='#EAC799'
                color="#05375a"
                size={20}
              />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Emailは4文字以上必要です</Text>
          </Animatable.View>
        )}

        <View style={{ marginTop: height * 0.05 }}></View>
        <View style={styles.action}>
          <FontAwesome
            name="lock"
            // color='#EAC799'
            color="#05375a"
            size={20}
          />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
            onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {/* 状況に応じて文字を 隠すor見せる でFeatherアイコンを変更する*/}
            {data.secureTextEntry ? (
              <Feather
                name="eye-off"
                // color='#EAC799'
                color="#05375a"
                size={20}
              />
            ) : (
              <Feather
                name="eye"
                // color='#EAC799'
                color="#05375a"
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Passwordは8文字以上必要です</Text>
          </Animatable.View>
        )}
        {data.successLogin ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              EmailまたはPasswordが間違っています
            </Text>
          </Animatable.View>
        )}
      </View>
      <View style={styles.buttonArea}>
        <View style={styles.button}>
          <TouchableOpacity onPress={handlePressLogin} style={styles.signIn}>
            <Text style={[styles.textSign, { color: color.BASE_COLOR }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footer_text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.footer_button_text}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    margin: width * 0.03,
  },
  // headerとfooterが2:1となるようにそれぞれchildren要素にもflexを指定
  header: {
    flex: 2,
    justifyContent: "center",
    marginLeft: width * 0.05,
  },
  header_text: {
    fontSize: 36,
    fontFamily: "ComicSnas",
    marginTop: height * 0.02,
    marginBottom: height * 0.04,
  },
  centerTextArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  // fontFamilyとfontWeight: 'bold'は同時に指定できないのでfontFamilyで直接太い文字を指定する
  center_text: {
    fontSize: 25,
    // fontWeight: 'bold',
    textAlign: "center",
    padding: height * 0.02,
  },
  formArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
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
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "ComicSnas",
    fontSize: 30,
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
});
