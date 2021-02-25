import * as React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Colors from '../constants/Colors';

import useColorScheme from '../hooks/useColorScheme';
/* Screen */
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

import UsersScreen from '../screens/UsersScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NewsScreen from '../screens/NewsScreen';
import AddPostScreen from '../screens/AddPostScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import StudyReportScreen from '../screens/StudyReportScreen';

/* types */
import { BottomTabParamList, NewsTabParamList, StudyReportTabParamList, UsersTabParamList, AccountInfoTabParamList } from '../types';
import { FontDisplay } from 'expo-font';

// const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  // bottomTabBarを表示させないScreenの設定
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if( routeName == 'UserDetailScreen' || routeName == 'AddPost' ){
      return false;
    }
    return true;
  };

  return (
    <BottomTab.Navigator
      initialRouteName="News"
      activeColor="#fff"
    >
      <BottomTab.Screen
        name="News"
        component={NewsNavigator}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'News',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => <Icon name="ios-home" color={color} size={26} />,
        })}
      />
      <BottomTab.Screen
        name="StudyReport"
        component={StudyReportNavigator}
        options={{
          tabBarLabel: 'Report',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => <Icon name="bar-chart-outline" color={color} size={26} />,
        }}
      />
      <BottomTab.Screen
        name="Users"
        component={UsersNavigator}
        options={{
          tabBarLabel: 'User',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => <Icon name="people-outline" color={color} size={26} />,
        }}
      />
      <BottomTab.Screen
        name="AccountInfo"
        component={AccountInfoNavigator}
        options={({route}) => ({
          // stackの遷移先のscreenのみtabBarを隠したいので、routeを渡して条件分岐して表示を切り替える
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Info',
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => <Icon name="settings-outline" color={color} size={26} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

BottomTabNavigator.navigationOptions = () => ({
  headerBackTintleVisible: false
})

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const NewsStack = createStackNavigator<NewsTabParamList>();

export function NewsNavigator({navigation}) {
  return (
    <NewsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ 
          headerTitle: 'Gift News', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#009382' onPress={() => navigation.openDrawer()}></Icon.Button>),
          headerRight: () => ( 
            <View style={{marginRight: 10}}>
              <FontAwesome5.Button
                name="plus"
                size={22}
                backgroundColor="#009382"
                color="#2e64e5"
                onPress={() => navigation.navigate('AddPost')}
              />
            </View>
          )
        }}
      />
      <NewsStack.Screen 
        name="AddPost"
        component={AddPostScreen}
        options={{ 
          // headerの戻る矢印を下記のように指定してもよい
          // headerLeft: () => (
          //   <Icon.Button name="arrow-back-outline" size={25} backgroundColor='#009382' onPress={() => navigation.navigate('NewsScreen')}></Icon.Button>),
        }}
      />
      <NewsStack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        // stackの遷移先ではDrawerを開くボタンを表示しない
        options={{ headerTitle: 'Gift News', headerLeft: () => (<> </>)}}
      />
    </NewsStack.Navigator>
  );
}

const StudyReportStack = createStackNavigator<StudyReportTabParamList>();

function StudyReportNavigator({navigation}) {
  return (
    <StudyReportStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <StudyReportStack.Screen
        name="StudyReportScreen"
        component={StudyReportScreen}
        options={{ headerTitle: 'Study Report', headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='#009382' onPress={() => navigation.openDrawer()}></Icon.Button>
        )}}
      />
    </StudyReportStack.Navigator>
  );
}

const UsersStack = createStackNavigator<UsersTabParamList>();

function UsersNavigator({navigation}) {
  return (
    <UsersStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <UsersStack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerTitle: 'Users List', headerLeft: () => (
        <Icon.Button name="ios-menu" size={25}  backgroundColor='#009382' onPress={() => navigation.openDrawer()}></Icon.Button>
        )}}
      />
      <UsersStack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={({route}) => ({
          title: route.params.userName,
        })}
      />
    </UsersStack.Navigator>
  );
}

const AccountInfoStack = createStackNavigator<AccountInfoTabParamList>();

function AccountInfoNavigator({navigation}) {
  return (
    <AccountInfoStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <AccountInfoStack.Screen
        name="AccountInfoScreen"
        component={AccountInfoScreen}
        options={{ 
          headerTitle: 'AccountInfo', headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='#009382' onPress={() => navigation.openDrawer()}></Icon.Button>
        )}}
      />
      <AccountInfoStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ 
          headerTitle: 'Edit Profile',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </AccountInfoStack.Navigator>
  );
}