import React, {useContext} from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Font from 'expo-font';
import Loading from '../screens/LoadingScreen';
/* Screen */
import AccountInfoScreen from '../screens/AccountInfoScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import StudyReportScreen from '../screens/StudyReportScreen';
import EditGoalScreen from '../screens/EditGoalScreen';
import AdminChatHomeScreen from '../screens/AdminChatHomeScreen';
import ChatHomeScreen from '../screens/ChatHomeScreen';
import RoomScreen from '../screens/RoomScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import SupportScreen from '../screens/SupportScreen';
import GiftInfoScreen from '../screens/GiftInfoScreen';
import ArticleScreen from '../screens/ArticleScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';
import SeatUnBookingScreen from '../screens/SeatUnBookingScreen';
import NewsScreen from '../screens/NewsScreen';

/* types */
import { BottomTabParamList, NewsTabParamList, StudyReportTabParamList, UsersTabParamList, AccountInfoTabParamList, ChatTabParamList, SupportTabParamList, SeatBookingTabParamList } from '../types';
import { AuthContext } from '../src/AuthProvider';
import { userInfo } from 'node:os';



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
    return <Loading message='読込中' />;
  }

  return (
    <BottomTab.Navigator
      initialRouteName="SeatBooking"
      // テスト用に最初の画面を変える
      // initialRouteName = "StudyReport"
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
      {/* <BottomTab.Screen
        name="Support"
        component={SupportNavigator}
        options={({route}) => ({
          // stackの遷移先のscreenのみtabBarを隠したいので、routeを渡して条件分岐して表示を切り替える
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Support',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="information-circle-outline" color={color} size={26} />,
        })}
      /> */}
      <BottomTab.Screen
        name="SeatBooking"
        component={SeatBookingNavigator}
        options={({route}) => ({
          // stackの遷移先のscreenのみtabBarを隠したいので、routeを渡して条件分岐して表示を切り替える
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Seat Booking',
          tabBarColor: '#EAC799',
          tabBarIcon: ({ color }) => <Icon name="bookmarks-outline" color={color} size={26} />,
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
        alignSelf: 'center',
      }
    }}>
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        // component={OAuthTestScreen}
        options={{ 
          headerTitle: 'Gift News', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>),
          // headerRight: () => ( 
          //   <View style={{marginRight: 10}}>
          //     <FontAwesome5.Button
          //       name="plus"
          //       size={22}
          //       backgroundColor="#EAC799"
          //       color="#2e64e5"
          //       // onPress={() => navigation.navigate('AddPost')}
          //     />
          //   </View>
          // )
          headerRight: () => (<></>),
        }}
      />
      <NewsStack.Screen
        name="ArticleScreen"
        component={ArticleScreen}
        options={({route}: any) => ({ 
          title: route.params.article.title, 
          headerRight: () => ( 
            // <View style={{marginRight: 10}}>
            //   <FontAwesome5.Button
            //     name="plus"
            //     size={22}
            //     backgroundColor="#EAC799"
            //     color="#2e64e5"
            //     // onPress={() => navigation.navigate('AddPost')}
            //   />
            // </View>
            <></>
          )
        })}
      />
    </NewsStack.Navigator>
  );
}

const StudyReportStack = createStackNavigator<StudyReportTabParamList>();

function StudyReportNavigator({navigation} :any) {
  return (
    <StudyReportStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
        alignSelf: 'center',
      }
    }}>
      <StudyReportStack.Screen
        name="StudyReportScreen"
        component={StudyReportScreen}
        options={{ 
          headerTitle: 'Study Report', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
          headerRight: () => (<></>),
      }}
      />
      <StudyReportStack.Screen
        name="EditGoalScreen"
        component={EditGoalScreen}
        options={{ 
          headerTitle: 'Edit Your Dream', 
          headerRight: () => (
            <></>
          )
        }}
      />
    </StudyReportStack.Navigator>
  );
}

const ChatStack = createStackNavigator<ChatTabParamList>();

function ChatNavigator({navigation}: any) {
  const {user} = useContext<any>(AuthContext);

  return (
    <ChatStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'ComicSnas_bd',
        alignSelf: 'center',
      }
    }}>
      {user.uid == 'd1SJQ07DeUWVUQ74tNizyrjKR4x1' || user.uid == 'zHBbV8enFlR3AEi9D0DbgzamHB63' ?
      <ChatStack.Screen
      name="AdminChatHomeScreen"
      component={AdminChatHomeScreen}
      options={{ 
        headerTitle: 'Admin Chat home', 
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>),
        headerRight: () => (
          <FontAwesome5.Button name='plus' size={25} backgroundColor='#EAC799' onPress={() => navigation.navigate('AddRoomScreen')} />
          )
        }}
      />
      : 
      <ChatStack.Screen
      name="ChatHomeScreen"
      component={ChatHomeScreen}
      options={{ 
        headerTitle: 'Chat home', 
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>),
        headerRight: () => (
          <FontAwesome5.Button name='plus' size={25} backgroundColor='#EAC799' onPress={() => navigation.navigate('AddRoomScreen')} />
          )
        }}
      />      
      }
      <ChatStack.Screen
        name="RoomScreen"
        component={RoomScreen}
        options={({route}: any) => ({
          title: route.params.thread.name,
          headerRight: () => (<></>),
        })}
      />
      <ChatStack.Screen
        name="AddRoomScreen"
        component={AddRoomScreen}
        options={{ headerRight: () => (<></>)}}
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
        alignSelf: 'center',
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
        alignSelf: 'center',
      }
    }}>
      <SupportStack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{ 
          headerTitle: 'SupportInfo', 
          headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }}
      />
      <SupportStack.Screen
        name="GiftInfoScreen"
        component={GiftInfoScreen}
        options={{ 
          headerTitle: 'SupportInfo', 
          headerRight: () => (<></>)}}
      />
      <SupportStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ 
          headerTitle: 'Edit Profile',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </SupportStack.Navigator>
  );
}


const SeatBookingStack = createStackNavigator<SeatBookingTabParamList>();

function SeatBookingNavigator({navigation}: any) {
  return (
    <SeatBookingStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#EAC799',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily: 'Anzumozi',
        fontSize: 24,
        alignSelf: 'center',
      }
    }}>
      <SeatBookingStack.Screen
        name="SeatBookingScreen"
        component={SeatBookingScreen}
        options={{ 
          headerTitle: '座席登録', 
          headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor='#EAC799' onPress={() => navigation.openDrawer()}></Icon.Button>),
          headerRight: () => (
            <>
            <Text style={{fontFamily: 'Anzumozi', marginBottom: 4, color: 'white', fontSize: 20}}>退室
            <FontAwesome5.Button name='external-link-square-alt' size={25} backgroundColor='#EAC799' onPress={() => navigation.navigate('SeatUnBookingScreen')} />
            </Text>
            </>
          )
        }}
      />
      <SeatBookingStack.Screen
        name="SeatUnBookingScreen"
        component={SeatUnBookingScreen}
        options={{ 
          headerTitle: '登録解除', 
          headerRight: () => (<></>),
        }}
      />
      {/* Drawerから遷移した時用のスクリーンをSeatBookingStackに入れておく */}
      <SeatBookingStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ 
          headerTitle: 'Edit Profile',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <SeatBookingStack.Screen
        name="GiftInfoScreen"
        component={GiftInfoScreen}
        options={{ 
          headerTitle: 'Information',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      />
    </SeatBookingStack.Navigator>
  );
}