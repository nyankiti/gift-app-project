import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
// react-native-paperは必要か？？ 使うのなら他の場所でももう少し使う。使わないなら消したい
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign, Ionicons } from "@expo/vector-icons";

/* context */
import { AuthContext } from "../../context/AuthProvider";

/* screen */

type Props = {};

const DrawerContent = (props: any) => {
  const { user, logout } = useContext<any>(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={
                  user?.userImg
                    ? user.userImg
                    : require("../../assets/images/Gift_splash_20210220.jpg")
                }
                size={50}
              />

              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Title style={styles.title}>
                  {user?.displayName ? user?.displayName : "user name"}
                </Title>
                <Caption style={styles.caption}>
                  @{user?.uid.slice(0, 8)}
                </Caption>
              </View>
            </View>

            <View style={styles.row}></View>
          </View>

          <Drawer.Section title="HOME" style={styles.drawerSection}>
            <Drawer.Item
              icon={() => <Ionicons name="ios-home" size={26} color="black" />}
              label="Home"
              // BottomTabNavigatorのそれぞれの要素のnameを指定することで遷移できる
              onPress={() => {
                props.navigation.navigate("News");
              }}
            />
            <Drawer.Item
              icon={() => (
                <Ionicons name="bookmarks-outline" size={26} color="black" />
              )}
              label="座席登録"
              onPress={() => props.navigation.navigate("SeatBooking")}
            />
          </Drawer.Section>
          {user?.uid === "00000" ? null : (
            <Drawer.Section title="MENU" style={styles.drawerSection}>
              <Drawer.Item
                icon={() => (
                  <Ionicons name="person-outline" size={26} color="black" />
                )}
                label="EditProfile"
                onPress={() => {
                  props.navigation.navigate("EditProfileScreen");
                }}
              />
              <Drawer.Item
                icon={() => (
                  <Ionicons
                    name="information-circle-outline"
                    size={26}
                    color="black"
                  />
                )}
                label="Infomation"
                onPress={() => props.navigation.navigate("GiftInfoScreen")}
              />
              <Drawer.Item
                icon={() => (
                  <Ionicons
                    name="help-circle-outline"
                    size={26}
                    color="black"
                  />
                )}
                label="勉強の質問・相談"
                onPress={() => props.navigation.navigate("QuestionnaireScreen")}
              />
            </Drawer.Section>
          )}
        </View>
      </DrawerContentScrollView>
      {user?.uid === "00000" ? null : (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <Drawer.Item
            icon={() => <AntDesign name="team" size={26} color="black" />}
            label="Sign Out"
            onPress={() => logout(props.navigation)}
          />
        </Drawer.Section>
      )}
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    zIndex: 99,
    elevation: 2,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
