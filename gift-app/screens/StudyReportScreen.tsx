import React, {useEffect, useState} from 'react';
import { StyleSheet, TouchableHighlight, TextInput, View, Text, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { useFonts } from 'expo-font';
import { useTheme, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch } from 'react-native-paper';


import EditScreenInfo from '../components/EditScreenInfo';

/* types */

/* lib */
import { formatDateUntilDay } from '../utils/file';


export default function StudyReportScreen() {

  const [loaded] = useFonts({
    Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
    ComicSnas: require('../assets/fonts/comicsansms3.ttf')
  });

  useEffect(() => {
  }, []);

  console.log(formatDateUntilDay());

  return (
    <View style={styles.container}>
      <View style={styles.dream_container}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontFamily: 'ComicSnas, Anzumozi',fontSize: 24, textAlign: 'center'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;夢&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
          <Image
              source={require('../assets/images/Gift_logo_20210221.jpg')}
              style={styles.sliderImage}
            />
        </View>
        <View style={styles.dream_form} >
          <Text style={styles.dream_text}>ここに夢を書く</Text>
        </View>
      </View>


      <View style={styles.purpose_container}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontFamily: 'ComicSnas, Anzumozi',fontSize: 24, textAlign: 'center'}}>今日の目標</Text>
          <View style={styles.pie}>

          </View>
        </View>
        <View style={styles.purpose_form} >
          <Text style={styles.purpose_text}>ここに今日の目標を書く</Text>
        </View>
      </View>


      <View style={styles.calendar_container}>
        <Calendar 
          onDayPress={(response) => console.log(response.day)}
          // current={formatDateUntilDay()}
          renderArrow={(direction) => (<FontAwesome name={`arrow-${direction}`} color='#05375a' size={15}/>)}
          // renderArrow={(right) => (<FontAwesome name='arrow-right' color='#05375a' size={15}/>)}
          theme={{
            calendarBackground: '#fff',

            selectedDayBackgroundColor: '#C0D6DF',
            selectedDayTextColor: '#000000',
            selectedDotColor: '#EAC799',

            dayTextColor: '#000000',
            textDisabledColor: '#729DAF',
            dotColor: '#DBE9EE',

            monthTextColor: '#000000',
            textMonthFontWeight: 'bold',

            arrowColor: '#000000',
          }}
        />
      </View>
    </View>
  );
}

const calendar_width = windowWidth * 0.90

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    height: windowHeight,
    alignItems: 'center',
  },
  dream_container: {
    flex: 2,
    flexDirection: 'row',
    width: calendar_width,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f8ff',
  },
  dream_text: {
    fontFamily: 'ComicSnas, Anzumozi',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 35,
  },
  dream_form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpose_container: {
    flex: 2,
    flexDirection: 'row',
    width: calendar_width,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f8ff',
    marginTop: 20,
  },
  purpose_text: {
    fontFamily: 'ComicSnas, Anzumozi',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 35,
  },
  purpose_form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pie: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#1abc9c'
  },
  calendar_container: {
    flex: 5,
    marginTop: 40,
    width: calendar_width,
    borderBottomWidth: 1,
    borderTopWidth:1,
    borderBottomColor: '#f0f8ff',
    borderTopColor: '#f0f8ff',
  },
  sliderImage: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
})
