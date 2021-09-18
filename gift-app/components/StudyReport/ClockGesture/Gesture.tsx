import React from "react";
import { StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler } from "react-native-reanimated";
import { canvas2Polar, Vector } from "react-native-redash";

import { CENTER, normalize } from "../../../constants/clock";

interface GestureProps {
  // 円の上を移動する要素の中心角がstart endに格納されている
  start: Animated.SharedValue<number>;
  top: Animated.SharedValue<number>;
  // 各posには円の上を移動する要素のx,y座標が格納されている
  handPos: Animated.SharedValue<Vector>;
  topPos: Animated.SharedValue<Vector>;
}

const Gesture = ({ start }: GestureProps) => {
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    // 以下はcontext(ctx)の型定義
    { offset: number }
  >({
    onStart: ({ x, y }, ctx) => {
      ctx.offset = start.value;
    },
    onActive: ({ x, y }, ctx) => {
      const { theta } = canvas2Polar({ x, y }, CENTER);
      // offset移動前の中心角(theta)の値   thetaは移動後の中心角の値を移動後の座標からcanvas2Polarを用いて算出
      const delta = theta - ctx.offset;

      start.value = normalize(start.value + delta);

      ctx.offset = theta;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default Gesture;
