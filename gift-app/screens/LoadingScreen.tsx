import React from "react";
import {StyleSheet, SafeAreaView, ActivityIndicator, Text,} from "react-native";



type Props = {
  message: string;
}

const LoadingScreen: React.FC<Props> = ({message}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>{message}...</Text>
    </SafeAreaView>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: "#888",
  },
});
