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
  // 座席とarrayのindexの対応表  アルファベットが列、数字が行  (縦-横)
  // [[A-1, A-2, A-3, A-4, A-5, A-6] , [B-1, B-2, B-3, B-4, B-5, B-6] ,[ C-1, C-2, C-3, C-4, C-5, C-6] , [D-1, D-2, D-3, D-4, D-5, D-6] ,[E-1, E-2, E-3, E-4]]
  const [selected , setSelected] = useState<Array<Array<boolean>>>([[false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false,false,false], [false,false,false,false]]);
  const [booked, setBooked] = useState<Array<Array<boolean>>>([[]]);



  const handleSeatPress = (x: number, y: number) => {
    // sliceメソッドを適用することでなぜかうまく動いた
    var newSelected = selected.slice();
    newSelected[x][y] = !newSelected[x][y];
    setSelected(newSelected);
  }

  const color = (x: number ,y: number) => {
    // console.log(selected[x][y]);
    return selected[x][y] ?  'skyblue' : '#EAC799';
  }

  const renderChoosenSeats = (datas: Array<boolean>, alphabet: string) => {
    return datas.slice().map((data, index) => {
      if(data){
        return( 
          <View key={index} style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
            <View style={{width: windowWidth*0.5, alignItems: 'center'}}>
              <Text style={{fontSize: RFPercentage(2.6), fontFamily: 'ComicSans' }}>位置</Text>
            </View>
            <View style={{width: windowWidth*0.5, alignItems: 'center'}}>
              <Text style={{ fontSize: RFPercentage(2.6), fontFamily: 'ComicSans'}}>{alphabet}-{index+1}</Text>
            </View> 
          </View>
        )
      }
    })
  }
  const handleRegister = () => {
    console.log(selected);
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
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(0,0)} ]} onPress={() => handleSeatPress(0,0)}>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(0,1)} ]} onPress={() => handleSeatPress(0,1)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(0,2)} ]} onPress={() => handleSeatPress(0,2)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(0,3)} ]} onPress={() => handleSeatPress(0,3)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(0,4)} ]} onPress={() => handleSeatPress(0,4)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(0,5)} ]} onPress={() => handleSeatPress(0,5)}>
            </TouchableOpacity>
          </View>
        </View>
        {/* 二列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(1,0)} ]} onPress={() => handleSeatPress(1,0)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(1,1)} ]} onPress={() => handleSeatPress(1,1)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(1,2)} ]} onPress={() => handleSeatPress(1,2)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(1,3)} ]} onPress={() => handleSeatPress(1,3)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(1,4)} ]} onPress={() => handleSeatPress(1,4)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(1,5)} ]} onPress={() => handleSeatPress(1,5)}>
            </TouchableOpacity>
          </View>
        </View>
        {/* 三列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(2,0)} ]} onPress={() => handleSeatPress(2,0)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(2,1)} ]} onPress={() => handleSeatPress(2,1)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(2,2)} ]} onPress={() => handleSeatPress(2,2)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(2,3)} ]} onPress={() => handleSeatPress(2,3)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(2,4)} ]} onPress={() => handleSeatPress(2,4)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(2,5)} ]} onPress={() => handleSeatPress(2,5)}>
            </TouchableOpacity>
          </View>
        </View>
        {/*四列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(3,0)} ]} onPress={() => handleSeatPress(3,0)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(3,1)} ]} onPress={() => handleSeatPress(3,1)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(3,2)} ]} onPress={() => handleSeatPress(3,2)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(3,3)} ]} onPress={() => handleSeatPress(3,3)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(3,4)} ]} onPress={() => handleSeatPress(3,4)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(3,5)} ]} onPress={() => handleSeatPress(3,5)}>
            </TouchableOpacity>
          </View>
        </View>
        {/* 五列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(4,0)} ]} onPress={() => handleSeatPress(4,0)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(4,1)} ]} onPress={() => handleSeatPress(4,1)}>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(4,2)} ]} onPress={() => handleSeatPress(4,2)}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuBox, {backgroundColor: color(4,3)} ]} onPress={() => handleSeatPress(4,3)}>
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
          {renderChoosenSeats(selected[0], 'A')}
          {renderChoosenSeats(selected[1], 'B')}
          {renderChoosenSeats(selected[2], 'C')}
          {renderChoosenSeats(selected[3], 'D')}
          {renderChoosenSeats(selected[4], 'E')}

          <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister} >
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
  },
  menuBox:{
    backgroundColor: "#EAC799",
    width: seatWidth,
    height: seatWidth,
    alignItems: 'center',
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
    paddingVertical: 5,
    width: windowWidth*0.6
  },
  button_text: {
    fontSize: RFPercentage(4.4),
    fontFamily: 'Anzumozi',
    textAlign: 'center'
  }
});
