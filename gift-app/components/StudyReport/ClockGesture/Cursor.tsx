import React from "react";
import Animated, {
  useAnimatedProps,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { G, Line, Polygon } from "react-native-svg";
import color from "../../../constants/color";

import { SIZE, PI } from "../../../constants/clock";

const AnimatedGroup = Animated.createAnimatedComponent(G);

interface CursorProps {
  pos: Animated.SharedValue<Vector>;
  topPos: Animated.SharedValue<Vector>;
  theta: Animated.SharedValue<number>;
}

/*
theta の値
初め 0.5*PI = 1.57
右 0
左 1+PI = 3.14(-3.14)
下半球はマイナスになる
*/

const Cursor = ({ pos, theta, topPos }: CursorProps) => {
  const animatedGroupProps = useAnimatedProps(() => {
    // 回転具合はinterpokateを用いる
    const calcRotation = () => {
      if (0 <= theta.value && theta.value <= 0.5 * PI) {
        return interpolate(
          theta.value,
          [0, 0.5 * PI],
          [90, 0],
          Extrapolate.CLAMP
        );
      } else {
        return interpolate(
          theta.value,
          [0.5 * PI, 2 * PI],
          [360, 90],
          Extrapolate.CLAMP
        );
      }
    };
    return {
      // 回転中心をtransrateX,Yを使って定めている
      // 詳しくは  https://chrizog.com/react-native-rotation-anchor-point  を参照
      transform: [
        // デフォルト回転は座標系の左上隅の(0,0)が中心となるため、デフォルト回転中心が指定する回転中心に来るように平行移動する
        { translateX: SIZE / 2 },
        { translateY: SIZE / 2 },
        // 平行移動先で回転を実施(反時計回り)
        { rotate: `${calcRotation()}deg` },
        // 回転が終わったら、平行移動して元の位置に戻す
        { translateX: -SIZE / 2 },
        { translateY: -SIZE / 2 },
      ],
    };
  });

  return (
    <>
      <AnimatedGroup animatedProps={animatedGroupProps}>
        <Line
          id="secondHandLine"
          // 中心
          x1={SIZE / 2}
          y1={SIZE / 2}
          // 先
          x2={topPos.value.x}
          y2={topPos.value.y}
          // animatedProps={animatedLineProps}
          fill="black"
          stroke="black"
          strokeWidth="10"
          markerEnd="url(#arrow)"
        />
        <Polygon
          // animatedProps={animatedPolygonProps}
          points={`${topPos.value.x - 10},${topPos.value.y + 10} ${
            topPos.value.x
          },${topPos.value.y - 10} ${topPos.value.x + 10},${
            topPos.value.y + 10
          }`}
          fill="black"
          stroke="black"
          strokeWidth="20"
        />
      </AnimatedGroup>
    </>
  );
};

export default Cursor;
