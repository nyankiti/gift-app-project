import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications'; 

export const registerForPushNotificationsAsync = async () => {
  let token = null;
  if(Constants.isDevice){
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if( existingStatus !== "granted" ){
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if( finalStatus !== 'granted' ){
      alert("Failed to get push token for push notifications!");
      return;
    }
    token = ( await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }else{
    alert('Must use physical device for push notifications');
  }

  if(Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }
  return token;
}