import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';


/* context */
import { AuthContext } from '../src/AuthProvider';

/* screen */

type Props = {
}

const DrawerContent: React.FC = (props: any) => {
  const {user, logout} = useContext<any>(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);


  return( 
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            
            <View style={{flexDirection: 'row', marginTop: 15}} >
            
              <Avatar.Image 
              source={user.userImg ? user.userImg : require('../assets/images/Gift_splash_20210220.jpg')}
              size={50}
              accessibilityComponentType ='image'
              accessibilityTraits='image'
              />

              <View style={{flexDirection:'column', marginLeft: 15}} >
                <Title style={styles.title}>{user.displayName ? user.displayName : 'user name'}</Title>
                <Caption style={styles.caption}>@{user.uid.slice(0,8)}</Caption>
              </View>
            </View>

            <View style={styles.row}>

            </View>
          </View>

          <Drawer.Section title='HOME' style={styles.drawerSection}>
            <Drawer.Item 
              icon={({color, size}) => ( <Icon name='ios-home' color={color} size={size} />)} 
              label='News'
              // BottomTabNavigatorのそれぞれの要素のnameを指定することで遷移できる
              onPress={() => {props.navigation.navigate('News')}}
              accessibilityComponentType ='button'
              accessibilityTraits='button'
            />
            <Drawer.Item 
              icon={({color, size}) => ( <Icon name='bookmarks-outline' color={color} size={size} />)} 
              label='座席登録'
              onPress={() => props.navigation.navigate('SeatBooking')}
              accessibilityComponentType ='button'
              accessibilityTraits='button'
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preference">
            <TouchableRipple onPress={() => {toggleTheme()}} >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents='none'>
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}

          <Drawer.Section title='MENU' style={styles.drawerSection}>
            <Drawer.Item 
              icon={({color, size}) => ( <Icon name='person-outline' color={color} size={size} />)} 
              label='EditProfile'
              // BottomTabNavigatorのそれぞれの要素のnameを指定することで遷移できる
              onPress={() => {props.navigation.navigate('SeatBooking', {screen: 'EditProfileScreen'})}}
              accessibilityComponentType ='button'
              accessibilityTraits='button'
            />
            <Drawer.Item 
              icon={({color, size}) => ( <Icon name='information-circle-outline' color={color} size={size} />)} 
              label='Infomation'
              onPress={() => props.navigation.navigate('SeatBooking', {screen: 'GiftInfoScreen'})}
              accessibilityComponentType ='button'
              accessibilityTraits='button'
            />
            <Drawer.Item 
              icon={({color, size}) => ( <Icon name='help-circle-outline' color={color} size={size} />)} 
              label='勉強の質問・相談'
              onPress={() => props.navigation.navigate('Chat', {screen: 'QuestionnaireScreen'})}
              accessibilityComponentType ='button'
              accessibilityTraits='button'
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item 
          icon={({color, size}) => ( <Icon name='log-out' color={color} size={size} />)} 
          label='Sign Out'
          onPress={() => logout()}
          accessibilityComponentType ='button'
          accessibilityTraits='button'
        />
      </Drawer.Section>
    </View>
  )
}


export default DrawerContent;



const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});