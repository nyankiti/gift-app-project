import React, {useEffect, useState, useContext} from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

/* screen */
import Loading from './LoadingScreen';
/* types */
import {User} from '../types';
/* lib */
import {getUsers} from '../src/firebase'; 
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { RFPercentage } from "react-native-responsive-fontsize";
import loadFonts from '../utils/loadFonts';
import { FirebaseTimestamp, db } from '../src/firebase';
import { formatDateUntilDay } from '../utils/file';

/* context */
import { AuthContext } from '../src/AuthProvider';




type SeatObject = {
  'A': Array<boolean>,
  'B': Array<boolean>,
  'C': Array<boolean>,
  'D': Array<boolean>,
  'E': Array<boolean>,
}


const seatWidth = windowWidth*0.1



export default function SeatUnBookingScreen() {
  const {user} = useContext(AuthContext);
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  const isFocused = useIsFocused();
  // 座席とarrayのindexの対応表  アルファベットが列、数字が行  (縦-横)
  // [[A-1, A-2, A-3, A-4, A-5, A-6] , [B-1, B-2, B-3, B-4, B-5, B-6] ,[ C-1, C-2, C-3, C-4, C-5, C-6] , [D-1, D-2, D-3, D-4, D-5, D-6] ,[E-1, E-2, E-3, E-4]]
  const [selected , setSelected] = useState<SeatObject>({
    'A' : [false,false,false,false,false,false], 
    'B' : [false,false,false,false,false,false], 
    'C' : [false,false,false,false,false,false], 
    'D' : [false,false,false,false,false,false], 
    'E' : [false,false,false,false]
  });
  const [booked, setBooked] = useState<SeatObject>({
    'A' : [false, false, false, false, false], 
    'B' : [false, false, false, false, false], 
    'C' : [false, false, false, false, false], 
    'D' : [false, false, false, false, false], 
    'E' : [false, false, false]    
  });



  const handleSeatPress = (x: 'A'|'B'|'C'|'D'|'E', y: number) => {
    var newSelected: SeatObject = selected;
    newSelected[x][y] = !newSelected[x][y];

    const temp = {
      'A': newSelected['A'],
      'B': newSelected['B'],
      'C': newSelected['C'],
      'D': newSelected['D'],
      'E': newSelected['E'],
    }
    
    setSelected(temp);
  }

  const color = (x: 'A'|'B'|'C'|'D'|'E' ,y: number) => {
    // console.log(selected[x][y]);
    return selected[x][y] ?  '#32cd32' : 'crimson';
  }

  const renderChoosenSeats = (datas: Array<boolean>, alphabet: string) => {
    return datas.map((data, index) => {
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
  const checkBoolean = (booked: boolean, selected: boolean) => {
      if(selected == false && booked == true){
        return true
      }
      return false
  };

  const handleUnRegister = async () => {
    // firestoreでnestされた配列はsupportされていないのでobject型に変形する
    const temp = {
      'A' : [checkBoolean(booked['A'][0],selected['A'][0]), checkBoolean(booked['A'][1],selected['A'][1]), checkBoolean(booked['A'][2],selected['A'][2]), checkBoolean(booked['A'][3],selected['A'][3]), checkBoolean(booked['A'][4],selected['A'][4]), checkBoolean(booked['A'][5],selected['A'][5])], 
      'B' : [checkBoolean(booked['B'][0],selected['B'][0]), checkBoolean(booked['B'][1],selected['B'][1]), checkBoolean(booked['B'][2],selected['B'][2]) ,checkBoolean(booked['B'][3],selected['B'][3]), checkBoolean(booked['B'][4],selected['B'][4]), checkBoolean(booked['B'][5],selected['B'][5])], 
      'C' : [checkBoolean(booked['C'][0], selected['C'][0]), checkBoolean(booked['C'][1], selected['C'][1]) , checkBoolean(booked['C'][2], selected['C'][2]), checkBoolean(booked['C'][3], selected['C'][3]), checkBoolean(booked['C'][4], selected['C'][4]) , checkBoolean(booked['C'][5], selected['C'][5])], 
      'D' : [checkBoolean(booked['D'][0], selected['D'][0]) , checkBoolean(booked['D'][1], selected['D'][1]), checkBoolean(booked['D'][2], selected['D'][2]) ,checkBoolean(booked['D'][3], selected['D'][3]) ,checkBoolean(booked['D'][4], selected['D'][4]) , checkBoolean(booked['D'][5], selected['D'][5])], 
      'E' : [checkBoolean(booked['E'][0], selected['E'][0]), checkBoolean(booked['E'][1], selected['E'][1]), checkBoolean(booked['E'][2], selected['E'][2]) ,checkBoolean(booked['E'][3], selected['E'][3])], 
    }
    setBooked(temp);

    console.log(booked);

    try{
      const docRef = await db.collection('seat').doc(formatDateUntilDay());
      docRef.set({bookedSeatList: temp});
    }catch(e){
      console.log(e);
    }
  }

  const fetchBookedSeatsList = async () => {
    try{
      const docRef = await db.collection('seat').doc(formatDateUntilDay());
      docRef.get().then((doc: any) => {
        // 登録されていな場合はundefinedエラーがでるので場合分け
        if(doc.exists){
          console.log('Document data: ', doc.data())
          const fetchedList: any = doc.data().bookedSeatList
          setBooked(fetchedList)
        }else{
          console.log('dataがありません');
        }
      })
    }catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
    loadFonts(setFontLoaded);
    fetchBookedSeatsList();
  }, [fontLoaded]);

  useEffect(() => {
    fetchBookedSeatsList();
  }, [isFocused]);

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
            {booked["A"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',0)} ]} onPress={() => handleSeatPress('A',0)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }

            {booked["A"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',1)} ]} onPress={() => handleSeatPress('A',1)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["A"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',2)} ]} onPress={() => handleSeatPress('A',2)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["A"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',3)} ]} onPress={() => handleSeatPress('A', 3)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["A"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',4)} ]} onPress={() => handleSeatPress('A',4)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["A"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',5)} ]} onPress={() => handleSeatPress('A',5)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* 二列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["B"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',0)} ]} onPress={() => handleSeatPress('B',0)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["B"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',1)} ]} onPress={() => handleSeatPress('B',1)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["B"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',2)} ]} onPress={() => handleSeatPress('B',2)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["B"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',3)} ]} onPress={() => handleSeatPress('B',3)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["B"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',4)} ]} onPress={() => handleSeatPress('B',4)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["B"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',5)} ]} onPress={() => handleSeatPress('B',5)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* 三列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["C"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',0)} ]} onPress={() => handleSeatPress('C',0)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["C"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',1)} ]} onPress={() => handleSeatPress('C',1)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["C"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',2)} ]} onPress={() => handleSeatPress('C',2)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["C"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',3)} ]} onPress={() => handleSeatPress('C',3)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
          {booked["C"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',4)} ]} onPress={() => handleSeatPress('C',4)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["C"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',5)} ]} onPress={() => handleSeatPress('C',5)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>
        </View>
        {/*四列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["D"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',0)} ]} onPress={() => handleSeatPress('D',0)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["D"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',1)} ]} onPress={() => handleSeatPress('D',1)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["D"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',2)} ]} onPress={() => handleSeatPress('D',2)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["D"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',3)} ]} onPress={() => handleSeatPress('D',3)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["D"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',4)} ]} onPress={() => handleSeatPress('D',4)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["D"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',5)} ]} onPress={() => handleSeatPress('D',5)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* 五列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["E"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',0)} ]} onPress={() => handleSeatPress('E',0)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["E"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',1)} ]} onPress={() => handleSeatPress('E',1)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
          {booked["E"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',2)} ]} onPress={() => handleSeatPress('E',2)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
            {booked["E"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',3)} ]} onPress={() => handleSeatPress('E',3)}>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: '#EAC799'} ]} >
              </TouchableOpacity>
            }
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
          {renderChoosenSeats(selected['A'], 'A')}
          {renderChoosenSeats(selected['B'], 'B')}
          {renderChoosenSeats(selected['C'], 'C')}
          {renderChoosenSeats(selected['D'], 'D')}
          {renderChoosenSeats(selected['E'], 'E')}

          <TouchableOpacity style={styles.buttonContainer} onPress={handleUnRegister} >
            <Text style={styles.button_text}>解除する</Text>
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
