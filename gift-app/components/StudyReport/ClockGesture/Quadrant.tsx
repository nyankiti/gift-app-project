import React from "react";
import { Circle, G } from "react-native-svg";
import color from "../../../constants/color";
import { PADDING, R, SIZE, STROKE } from "../../../constants/clock";
import { View } from "react-native";

const Quadrant = () => {
  return (
    <>
      {/* 黒い、メーターの下地となる円 strokeで色を出している*/}
      <Circle
        strokeWidth={STROKE}
        stroke={color.BASE_COLOR}
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
      />
      {/* CircularSliderにある<Mask></Mask>のsvgを指定している maskを指定することでそのSVGに以下のCircle SVGを被せられる*/}
      {/* maskを使って選択部分の円に色をつけている */}
      <G mask="url(#mask)">
        <Circle fill="teal" cx={SIZE / 2} cy={SIZE / 2} r={R + PADDING} />
      </G>
    </>
  );
};

export default Quadrant;
