import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import color from "../../constants/color";
import { BaseScrollView } from "recyclerlistview";

export class ExtendedScrollView extends BaseScrollView {
  public _scrollViewRef: any;
  scrollTo(...args: any) {
    if (this._scrollViewRef) {
      this._scrollViewRef.scrollTo(...args);
    }
  }

  render() {
    return (
      <ScrollView
        {...this.props}
        ref={(scrollView) => (this._scrollViewRef = scrollView)}
        style={{ flex: 1 }}
      >
        <AudioHeader />
        {this.props.children}
      </ScrollView>
    );
  }
}

const AudioHeader = () => {
  return (
    <LinearGradient colors={[color.BASE_COLOR, color.APP_BG]}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../assets/images/Gift_Radio.jpg")}
          style={styles.image}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 32, fontFamily: "KiwiMaru" }}>
            Gift Radio
          </Text>
          <Text style={{ alignSelf: "flex-start", fontFamily: "KiwiMaru" }}>
            Gift
          </Text>
        </View>
      </View>
      <Text
        style={{
          alignSelf: "center",
          marginTop: -20,
          marginBottom: 20,
          fontFamily: "KiwiMaru",
        }}
      >
        本番ラジオ開設に向けて、楽しく練習しています
      </Text>
    </LinearGradient>
  );
};

export default AudioHeader;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 30,
    borderRadius: 20,
  },
});
