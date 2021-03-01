import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/* context */
import { AuthContext } from '../src/AuthProvider';

/* screen */


export default function DrawerContent(props) {
  const {user, logout} = useContext(AuthContext);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return( 
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} >
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            
            <View style={{flexDirection: 'row', marginTop: 15}} >
              <Avatar.Image 
                source={require('../assets/images/Gift_splash_20210220.jpg')}
                size={50}
              />
              <View style={{flexDirection:'column', marginLeft: 15}} >
                <Title style={styles.title}>User Name</Title>
                <Caption style={styles.caption}>@{user.uid}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View>
                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                <Caption style={styles.caption}>Follower</Caption>
              <View>

              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem 
              icon={({color, size}) => ( <Icon name='home' color={color} size={size} />)} 
              label='Home'
              // BottomTabNavigatorのそれぞれの要素のnameを指定することで遷移できる
              onPress={() => {props.navigation.navigate('News')}}
            />
            <DrawerItem 
              icon={({color, size}) => ( <Icon name='account-check-outline' color={color} size={size} />)} 
              label='Support'
              onPress={() => props.navigation.navigate('SupportScreen')}
            />
            <DrawerItem 
              icon={({color, size}) => ( <Icon name='chat-outline' color={color} size={size} />)} 
              label='問い合わせ'
              onPress={() => props.navigation.navigate('ChatScreen')}
            />
          </Drawer.Section>
          <Drawer.Section title="Preference">
            <TouchableRipple onPress={() => {toggleTheme()}} >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents='none'>
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem 
          icon={({color, size}) => ( <Icon name='exit-to-app' color={color} size={size} />)} 
          label='Sign Out'
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  )
}






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
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
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