import * as React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Font from 'expo-font';
import Loading from '../screens/LoadingScreen';
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
import ChatScreen from '../screens/ChatScreen';
import ChatHomeScreen from '../screens/ChatHomeScreen';
import RoomScreen from '../screens/RoomScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import SupportScreen from '../screens/SupportScreen';
import ArticleScreen from '../screens/ArticleScreen';

/* types */
import { BottomTabParamList, NewsTabParamList, StudyReportTabParamList, UsersTabParamList, AccountInfoTabParamList, ChatTabParamList, SupportTabParamList } from '../types';
import { FontDisplay } from 'expo-font';


import DevelopScreen from '../screens/DevelopScreen';
import { IconButton } from 'react-native-paper';

// const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const [fontLoaded, setFontLoaded] = React.useState<boolean>(true);

  // bottomTabBarを表示させないScreenの設定
  const loadFonts = async() => {
    await Font.loadAsync({
      Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
      ComicSnas_bd: require('../assets/fonts/comicbd.ttf')
    })
    setFontLoaded(false);
  }

  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if( routeName == 'UserDetailScreen' || routeName == 'AddPost' || routeName == 'RoomScreen' ){
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    loadFonts();
  }, [])

  if (fontLoaded) {
    return <Loading />;
  }

  return (
    <BottomTab.Navigator
      // initialRouteName="News"
      // テスト用に最初の画面を変える
      initialRouteName = "StudyReport"
      activeColor="#fff"
    >
      <BottomTab.Screen
        name="News"
        // 開発時のみここをDevelopScreenを表示してデバッグに使う
        // component={DevelopScreen}
        component={NewsNavigator}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'News',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="ios-home" color={color} size={26} />,
        })}
      />
      <BottomTab.Screen
        name="StudyReport"
        component={StudyReportNavigator}
        options={{
          tabBarLabel: 'Report',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="bar-chart-outline" color={color} size={26} />,
        }}
      />
      {/* <BottomTab.Screen
        name="Users"
        component={UsersNavigator}
        options={{
          tabBarLabel: 'User',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="people-outline" color={color} size={26} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarLabel: 'Chat',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="chatbubble-ellipses-outline" color={color} size={26} />,
        }}
      />
      {/* <BottomTab.Screen
        name="AccountInfo"
        component={AccountInfoNavigator}
        options={({route}) => ({
          // stackの遷移先のscreenのみtabBarを隠したいので、routeを渡して条件分岐して表示を切り替える
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Info',
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => <Icon name="settings-outline" color={color} size={26} />,
        })}
      /> */}
      <BottomTab.Screen
        name="Support"
        component={SupportNavigator}
        options={({route}) => ({
          // stackの遷移先のscreenのみtabBarを隠したいので、routeを渡して条件分岐して表示を切り替える
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Support',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="information-circle-outline" color={color} size={26} />,
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

export function NewsNavigator({navigation}: any) {
  return (
    <NewsStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
      }
    }}>
      <NewsStack.Screen
        name="Develop"
        component={DevelopScreen}
        options={{ 
          headerTitle: 'Gift News', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>),
          headerRight: () => ( 
            <View style={{marginRight: 10}}>
              <FontAwesome5.Button
                name="plus"
                size={22}
                backgroundColor="#EAC799"
                color="#2e64e5"
                onPress={() => navigation.navigate('AddPost')}
              />
            </View>
          )
        }}
      />
      <NewsStack.Screen
        name="Article"
        component={ArticleScreen}
        options={({route}: any) => ({ 
          title: route.params.article.title, 
          headerRight: () => ( 
            <View style={{marginRight: 10}}>
              <FontAwesome5.Button
                name="plus"
                size={22}
                backgroundColor="#EAC799"
                color="#2e64e5"
                onPress={() => navigation.navigate('AddPost')}
              />
            </View>
          )
        })}
      />
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ 
          headerTitle: 'Gift News', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>),
          headerRight: () => ( 
            <View style={{marginRight: 10}}>
              <FontAwesome5.Button
                name="plus"
                size={22}
                backgroundColor="#EAC799"
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
          //   <Icon.Button name="arrow-back-outline" size={25} backgroundColor='#EAC799' onPress={() => navigation.navigate('NewsScreen')}></Icon.Button>),
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
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
      }
    }}>
      <StudyReportStack.Screen
        name="StudyReportScreen"
        component={StudyReportScreen}
        options={{ 
          headerTitle: 'Study Report', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}
      />
    </StudyReportStack.Navigator>
  );
}

// const UsersStack = createStackNavigator<UsersTabParamList>();

// function UsersNavigator({navigation}: any) {
//   return (
//     <UsersStack.Navigator screenOptions={{
//       headerStyle: {
//         backgroundColor: '#EAC799',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'normal'
//       }
//     }}>
//       <UsersStack.Screen
//         name="UsersScreen"
//         component={UsersScreen}
//         options={{ headerTitle: 'Users List', headerLeft: () => (
//         <Icon.Button name="ios-menu" size={25}  backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>
//         )}}
//       />
//       <UsersStack.Screen
//         name="UserDetailScreen"
//         component={UserDetailScreen}
//         options={({route}: any) => ({
//           title: route.params.userName,
//         })}
//       />
//       <UsersStack.Screen
//         name="ChatScreen"
//         component={ChatScreen}
//         options={({route}: any) => ({
//           title: route.params.item.fname + route.params.item.lname
//         })}
//       />
//     </UsersStack.Navigator>
//   );
// }

const ChatStack = createStackNavigator<ChatTabParamList>();

function ChatNavigator({navigation}: any) {
  return (
    <ChatStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
      }
    }}>
      <ChatStack.Screen
        name="ChatHomeScreen"
        component={ChatHomeScreen}
        options={{ 
          headerTitle: 'Chat home', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25}  backgroundColor='#EAC799' onPress={() => navigation.openDrawer()} />),
          headerRight: () => (
            <FontAwesome5.Button name='plus' size={25} backgroundColor='#EAC799' onPress={() => navigation.navigate('AddRoomScreen')} />
          )
        }}
      />
      <ChatStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={({route}: any) => ({
          title: route.params.thread.name,
        })}
      />
      <ChatStack.Screen
        name="AddRoomScreen"
        component={AddRoomScreen}
      />
    </ChatStack.Navigator>
  );
}

const AccountInfoStack = createStackNavigator<AccountInfoTabParamList>();

function AccountInfoNavigator({navigation}: any) {
  return (
    <AccountInfoStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
      }
    }}>
      <AccountInfoStack.Screen
        name="AccountInfoScreen"
        component={AccountInfoScreen}
        options={{ 
          headerTitle: 'AccountInfo', headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>
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

const SupportStack = createStackNavigator<SupportTabParamList>();

function SupportNavigator({navigation}: any) {
  return (
    <SupportStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
      }
    }}>
      <SupportStack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{ 
          headerTitle: 'SupportInfo', headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>
        )}}
      />
    </SupportStack.Navigator>
  );
}