import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';

/* screen */
import Loading from '../screens/LoadingScreen';
/* types */
import {User} from '../types';
/* lib */
import {getUsers} from '../src/firebase'; 
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { RFPercentage } from "react-native-responsive-fontsize";
import loadFonts from '../utils/loadFonts';



const seatWidth = windowWidth*0.1



export default function SeatBookingScreen() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);

  useEffect(() => {
  }, []);

  const handleBooking = () => {
    
  }

  useEffect(() => {
    loadFonts(setFontLoaded);
  })

  if (fontLoaded) {
    return <Loading message='読込中' />;
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.classRoomContainer}>
        <View style={styles.whiteboard}>
          <Text style={{fontFamily: 'ComicSans'}}>White Board</Text>
        </View>
          {/* 一列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
    
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
          
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>
        </View>
        {/* 二列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>
        </View>
        {/* 三列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>
        </View>
        {/*四列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>
        </View>
        {/* 五列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox,{backgroundColor: 'crimson'}]}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBox}>
            </TouchableOpacity>
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <View style={{height: seatWidth, width: seatWidth}}>
            </View>
            <View style={{height: seatWidth, width: seatWidth}}>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bookingForm}>
        <Text style={styles.formTitle}>Choosen seats</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
          <View style={{width: windowWidth*0.5, alignItems: 'center'}}>
            <Text style={{fontSize: RFPercentage(2.6), fontFamily: 'ComicSans' }}>位置</Text>
          </View>
          <View style={{width: windowWidth*0.5, alignItems: 'center'}}>
            <Text style={{ fontSize: RFPercentage(2.6), fontFamily: 'ComicSans'}}>A-5</Text>
          </View>
        </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleBooking} >
            <Text style={styles.button_text}>登録する</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  classRoomContainer: {
    margin: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  whiteboard: {
    backgroundColor: 'white',
    width: seatWidth*3,
    marginVertical: 10,
    marginLeft: seatWidth*2,
    alignItems: 'center',
  },
  seatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '40',
    paddingBottom: '30',
    // marginBottom: '-40',
    // marginTop: '-40'
  },
  menuBox:{
    backgroundColor: "#EAC799",
    width: seatWidth,
    height: seatWidth,
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    shadowColor: 'black',
    shadowOpacity: .3,
    shadowOffset: {
      height:3,
      width:-3
    },
    elevation:4,
    marginBottom: 40,
  },
  info:{
    fontSize:22,
    color: "#696969",
  },
  bookingForm: {
    alignItems: 'center'
  },
  formTitle: {
    fontSize: RFPercentage(3.6),
    fontFamily: 'ComicSnas',
  },
  buttonContainer: { 
    backgroundColor: '#EAC799',
    borderRadius: 20,
    // alignSelf: 'center',
    paddingVertical: 5,
    width: windowWidth*0.6
  },
  button_text: {
    fontSize: RFPercentage(4.4),
    fontFamily: 'Anzumozi',
    textAlign: 'center'
  }
});
