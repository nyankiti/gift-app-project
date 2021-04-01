import React from 'react'
import { View, StyleSheet, Text as RNText } from 'react-native';
// import { GestureHandler, Svg } from 'expo';
// import * as Svg from 'react-native-svg';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path, G } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import {snap} from '@popmotion/popcorn';
import { windowHeight, windowWidth } from '../utils/Dimentions';


// const { PanGestureHandler, State } = GestureHandler;
// const { Path, G, Text, TSpan } = Svg; 
const wheelSize = windowWidth*0.9

const numberOfSegment = 10;


const Wheel: React.FC = () => {
  const makeWheel = () => {
    const data = Array.from({length: numberOfSegment}).fill(1);
    const arcs = d3Shape.pie()(data);
    const colors = color({
      luminosity: 'dark',
      count: numberOfSegment,
    })
  
    return arcs.map((arc: any, index: number) => {
      const instance = d3Shape.arc().padAngle(0.01).outerRadius(windowWidth / 2).innerRadius(20);
      return {
        path: instance(arc),
        color: colors[index],
        value: Math.round(Math.random() * 10 + 1) * 200,
        centroid: instance.centroid(arc)
      }
    })
  }

  const wheelPaths = makeWheel();

  const renderSvgWheel = () => {
    return ( 
      <View>
        <Svg width={wheelSize} height={wheelSize} viewBox={`0 0 ${windowWidth} ${windowWidth}`}>
          <G y={windowWidth/2} x={windowWidth/2} >
            {wheelPaths.map((arc: any, index: number) => {
              return (
                <G key={`arc-${index}`} >
                  <Path d={arc.path} fill={arc.color} />
                </G>
              )
            })}
          </G>
        </Svg>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {renderSvgWheel()}
    </View>
  )
}

export default Wheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
