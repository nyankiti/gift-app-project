import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ColorSchemeName } from 'react-native';

/* componets */
import Loading from '../components/Loading';

/* screens */
import NotFoundScreen from '../screens/NotFoundScreen';
import LoadingScreen from '../screens/LoadingScreen';
import DrawerContent from '../screens/DrawerContent';
import SupportScreen from '../screens/SupportScreen';
import ChatHomeScreen from '../screens/ChatHomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import GiftInfoScreen from '../screens/GiftInfoScreen';

/* navigator */
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import AuthNavigator from './AuthNavigator';

/* type */
import { DrawerParamaList } from '../types';
import { User } from '../types';

/* context */
import { AuthProvider } from '../src/AuthProvider';
import { AuthContext } from '../src/AuthProvider';

/* firebae */
import { auth } from '../src/firebase';

const Drawer = createDrawerNavigator<DrawerParamaList>();

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export function Route() {

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
      {user ?
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} >
        <Drawer.Screen name="home" component={BottomTabNavigator} />
        <Drawer.Screen name='EditProfileScreen' component={EditProfileScreen} 
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#EAC799',
            }
          }}
        />
        <Drawer.Screen name='GiftInfoScreen' component={GiftInfoScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor:'#EAC799',
            },
          }}
        />
      </Drawer.Navigator> 
      : 
      <AuthNavigator navigation />
      }
    </NavigationContainer>
  );
}


const Navigation = () => {
  return ( 
    <AuthProvider>
      <Route/>
    </AuthProvider>
  )
}

export default Navigation;


// // A root stack navigator is often used for displaying modals on top of all other content
// // Read more here: https://reactnavigation.org/docs/modal
// const Stack = createStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [userToken, setUseeToken] = useState(null);




//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(!isLoading);
//     }, 1000);
//   }, [] );

//   if(isLoading) {
//     return <Loading />
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Auth" component={AuthNavigator} />
//       <Stack.Screen name="Root" component={BottomTabNavigator} />
//       {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
//     </Stack.Navigator>
//   );
// }
