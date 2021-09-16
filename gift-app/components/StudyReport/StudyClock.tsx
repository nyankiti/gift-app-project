import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, { Circle, Line, Polygon, G } from "react-native-svg";
import { width } from "../../libs/utils/Dimension";

type Props = {
  SVGWidth: number;
  // calcClockRotation: any;
  totalStudyTime: number;
  text_in_clock: string;
};

const StudyClock: React.FC<Props> = memo(
  ({ SVGWidth, totalStudyTime, text_in_clock }) => {
    return (
      <Svg height={SVGWidth} width={SVGWidth}>
        <Circle
          cx={SVGWidth / 2}
          cy={SVGWidth / 2}
          r={SVGWidth * 0.22}
          fill="white"
          stroke="#EAC799"
          strokeWidth={width * 0.1}
          strokeDashoffset="25"
          strokeDasharray=""
        />

        <G
          id="arrow"
          transform={`rotate(${totalStudyTime / 2}, ${SVGWidth / 2}, ${
            SVGWidth / 2
          })`}
          // transform={`rotate(${totalStudyTime / 2}, ${SVGWidth / 2}, ${
          //   SVGWidth / 2
          // })`}
        >
          <Line
            id="secondHandLine"
            x1={SVGWidth / 2}
            y1={SVGWidth / 2}
            x2={SVGWidth / 2}
            y2="10"
            fill="black"
            stroke="black"
            strokeWidth="4"
            markerEnd="url(#arrow)"
          />
          <Polygon
            id="arrow"
            points="-10,0 10,0 0,-10"
            x={SVGWidth / 2}
            y={SVGWidth / 2 - 35}
            fill="black"
            stroke="none"
          />
        </G>

        <G id="fixedArrow">
          <Line
            id="secondHandLine"
            x1={SVGWidth / 2}
            y1={SVGWidth / 2}
            x2={SVGWidth / 2}
            y2="10"
            fill="black"
            stroke="black"
            strokeWidth="4"
            markerEnd="url(#arrow)"
          />
          <Polygon
            id="arrow"
            points="-10,0 10,0 0,-10"
            x={SVGWidth / 2}
            y={SVGWidth / 2 - 35}
            fill="black"
            stroke="none"
          />
        </G>

        <Circle
          cx={SVGWidth / 2}
          cy={SVGWidth / 2}
          r={SVGWidth * 0.26}
          fill="white"
        />
        <View style={styles.clock_text_space}>
          <Text style={styles.text_in_clock}>{text_in_clock}</Text>
        </View>
      </Svg>
    );
  }
);

export default StudyClock;

const styles = StyleSheet.create({
  clock_text_space: {
    marginTop: width * 0.06,
    marginLeft: width * 0.06,
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: 50,
    backgroundColor: "white",
  },
  text_in_clock: {
    textAlign: "center",
    paddingTop: width * 0.013,
    fontSize: 24,
  },
});
