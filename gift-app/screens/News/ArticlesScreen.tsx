import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import HTML, { defaultSystemFonts } from "react-native-render-html";
import { width } from "../../libs/utils/Dimension";
/* components */
import Screen from "../Screen";
/* types */
import { NewsTabParamList } from "../../types/navigationType";
import { StackScreenProps } from "@react-navigation/stack";

// config fonts for render-html
const systemFonts = [...defaultSystemFonts, "Anzumozi"];

type ArticleScreenNavigationProps = StackScreenProps<
  NewsTabParamList,
  "ArticleScreen"
>;

const ArticleScreen: React.FC<ArticleScreenNavigationProps> = ({ route }) => {
  return (
    <Screen>
      <ScrollView>
        <HTML
          source={{ html: route.params.article.html }}
          contentWidth={width * 0.9}
          systemFonts={systemFonts}
          baseStyle={{
            fontSize: 24,
            fontFamily: "Anzumozi",
            // lineHeight: 22,
            textAlign: "center",
          }}
          tagsStyles={{ strong: { fontSize: 25, fontFamily: "ComicSnas_bd" } }}
        />
      </ScrollView>
    </Screen>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({});
