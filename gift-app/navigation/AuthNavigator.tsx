import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

/* screen */
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SingInScreen from '../screens/SignInScreen';


const AuthStack = createStackNavigator();

const AuthNavigator = ({navigation}) => ( 
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name='SplashScreen' component={SplashScreen} />
    {/* <AuthStack.Screen name='SignInScreen' component={SingInScreen} /> */}
    <AuthStack.Screen name='SignUpScreen' component={SignUpScreen} />
  </AuthStack.Navigator>
);

export default AuthNavigator;