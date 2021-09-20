import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path, Line } from "react-native-svg";

import {
  SIZE,
  STROKE,
  R,
  PI,
  CENTER,
  arc,
  absoluteDuration,
} from "../../../constants/clock";
import color from "../../../constants/color";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  // numberには中心角が入る startなら0.5 * Math.PI(一番上の点)
  hand: Animated.SharedValue<number>;
  top: Animated.SharedValue<number>;
}

const CircularSlider = ({ hand, top }: CircularProps) => {
  // 各posには右のような型が適用されている SharedValue<Vector<number>>
  // Vecotr型はredashによって提供される polar2Canvasは{theat(角度),radisu(半径)}とCENTER(中心)を引数として渡すことで、その極のx,y座標を持ったVector型を返す 日本語にすると 極 to 座標
  const handPos = useDerivedValue(() =>
    polar2Canvas({ theta: hand.value, radius: R }, CENTER)
  );

  const topPos = useDerivedValue(() =>
    // polar2Canvasは極(円)の情報を渡すことで、x,y座標を返す。それがSharedValue形式でposに格納される
    polar2Canvas({ theta: top.value, radius: R }, CENTER)
  );

  const animatedProps = useAnimatedProps(() => {
    // polar2Canvasの返り値である各posのvalueであるp1,p2にはx,y座標が格納されている
    const p1 = handPos.value;
    const p2 = topPos.value;
    const duration = absoluteDuration(hand.value, top.value);
    return {
      d: `M ${p1.x} ${p1.y} ${arc(p2.x, p2.y, duration > PI)}`,
    };
  });

  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            {/* 以下のAnimatedPathがスタートとストップの間の線。それぞれのポジションによって長さが変わる。その長さの情報をreanimatedPropsによって受け渡している */}
            <AnimatedPath
              strokeWidth={STROKE}
              stroke={color.BASE_COLOR}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant />
        {/* 小さい方の針をLinを用いて描く */}
        <Line
          // 中心
          x1={SIZE / 2}
          y1={SIZE / 2}
          // 先
          x2={topPos.value.x}
          y2={topPos.value.y + 60}
          fill="black"
          stroke="black"
          strokeWidth="10"
        />
        <Cursor pos={handPos} topPos={topPos} theta={hand} />
      </Svg>
      <Gesture start={hand} top={top} handPos={handPos} topPos={topPos} />
    </View>
  );
};

export default CircularSlider;
