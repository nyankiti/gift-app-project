import React, {useEffect, useState, useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

/* screen */
import Loading from '../screens/LoadingScreen';
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



export default function SeatBookingScreen() {
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
    return selected[x][y] ?  'skyblue' : '#EAC799';
  }


  const renderChoosenSeats = (datas: Array<boolean>, alphabet: string) => {
    return datas.map((data, index) => {
      if(data){
        return( 
          <View key={index} style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
            <View style={{width: windowWidth*0.5, alignItems: 'center'}}>
              <Text style={{fontSize: RFPercentage(2.6), fontFamily: 'ComicSnas' }}>位置</Text>
            </View>
            <View style={{width: windowWidth*0.5, alignItems: 'center'}}>
              <Text style={{ fontSize: RFPercentage(2.6), fontFamily: 'ComicSnas'}}>{alphabet}-{index+1}</Text>
            </View> 
          </View>
        )
      }
    }).filter(v => v);
  }

  const renderChoosenSeatsForAlert = (datas: Array<boolean>, alphabet: string) => {
    const list =  datas.map((data, index) => {
      if(data){
        return `位置 : ${alphabet}-${index-1}`
      }
      // fileterメソッドをかますことでundefinedを除去する
    }).filter(v => v);
    return list.join('\n');
  }

  const handleRegister = async () => {
    console.log(booked);
    // firestoreでnestされた配列はsupportされていないのでobject型に変形する
    const temp = {
      'A' : [booked['A'][0] || selected['A'][0], booked['A'][1] || selected['A'][1], booked['A'][2] || selected['A'][2],booked['A'][3] || selected['A'][3], booked['A'][4] || selected['A'][4], booked['A'][5] || selected['A'][5]], 
      'B' : [booked['B'][0] || selected['B'][0], booked['B'][1] || selected['B'][1], booked['B'][2] || selected['B'][2],booked['B'][3] || selected['B'][3], booked['B'][4] || selected['B'][4], booked['B'][5] || selected['B'][5]], 
      'C' : [booked['C'][0] || selected['C'][0], booked['C'][1] || selected['C'][1], booked['C'][2] || selected['C'][2],booked['C'][3] || selected['C'][3], booked['C'][4] || selected['C'][4], booked['C'][5] || selected['C'][5]], 
      'D' : [booked['D'][0] || selected['D'][0], booked['D'][1] || selected['D'][1], booked['D'][2] || selected['D'][2],booked['D'][3] || selected['D'][3], booked['D'][4] || selected['D'][4], booked['D'][5] || selected['D'][5]], 
      'E' : [booked['E'][0] || selected['E'][0], booked['E'][1] || selected['E'][1], booked['E'][2] || selected['E'][2],booked['E'][3] || selected['E'][3]], 
    }

    try{
      const docRef = db.collection('seat').doc(formatDateUntilDay());
      await docRef.set({bookedSeatList: temp});
      // firestore側への記録に成功すれば、stateも更新する
      setBooked(temp);
      // 登録の際に時間管理も行う
      const userRef = db.collection('users').doc(user?.uid).collection('seat').doc(formatDateUntilDay());
      await userRef.set({
        startTime:  FirebaseTimestamp.fromDate(new Date()),
      }, {merge: true});
      // 全ての通信が正常に終了するとselectedステートの初期化
      setSelected({
        'A' : [false,false,false,false,false,false], 
        'B' : [false,false,false,false,false,false], 
        'C' : [false,false,false,false,false,false], 
        'D' : [false,false,false,false,false,false], 
        'E' : [false,false,false,false]
      })
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

  const showAlert = () => {
    if(Platform.OS === 'web'){
      const res = confirm('登録しますか？');
      if (res){
        handleRegister();
      }
    }else{
      Alert.alert(
        'Check',
        renderChoosenSeatsForAlert(selected['A'], 'A') + renderChoosenSeatsForAlert(selected['B'], 'B') + renderChoosenSeatsForAlert(selected['C'], 'C') + renderChoosenSeatsForAlert(selected['D'], 'D') + renderChoosenSeatsForAlert(selected['E'], 'E'),
        [{text: '戻る', onPress: ()=>{}}, {text: '登録する', onPress: ()=>handleRegister()}],
        {cancelable: false}
      )
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
          <Text style={{fontFamily: 'ComicSnas'}}>White Board</Text>
        </View>
          {/* 一列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["A"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',0)} ]} onPress={() => handleSeatPress('A',0)}>
              </TouchableOpacity>
            }

            {booked["A"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',1)} ]} onPress={() => handleSeatPress('A',1)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["A"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',2)} ]} onPress={() => handleSeatPress('A',2)}>
              </TouchableOpacity>
            }
            {booked["A"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',3)} ]} onPress={() => handleSeatPress('A', 3)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["A"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',4)} ]} onPress={() => handleSeatPress('A',4)}>
              </TouchableOpacity>
            }
            {booked["A"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('A',5)} ]} onPress={() => handleSeatPress('A',5)}>
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* 二列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["B"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',0)} ]} onPress={() => handleSeatPress('B',0)}>
              </TouchableOpacity>
            }
            {booked["B"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',1)} ]} onPress={() => handleSeatPress('B',1)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["B"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',2)} ]} onPress={() => handleSeatPress('B',2)}>
              </TouchableOpacity>
            }
            {booked["B"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',3)} ]} onPress={() => handleSeatPress('B',3)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["B"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',4)} ]} onPress={() => handleSeatPress('B',4)}>
              </TouchableOpacity>
            }
            {booked["B"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('B',5)} ]} onPress={() => handleSeatPress('B',5)}>
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* 三列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["C"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',0)} ]} onPress={() => handleSeatPress('C',0)}>
              </TouchableOpacity>
            }
            {booked["C"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',1)} ]} onPress={() => handleSeatPress('C',1)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["C"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',2)} ]} onPress={() => handleSeatPress('C',2)}>
              </TouchableOpacity>
            }
            {booked["C"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',3)} ]} onPress={() => handleSeatPress('C',3)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
          {booked["C"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',4)} ]} onPress={() => handleSeatPress('C',4)}>
              </TouchableOpacity>
            }
            {booked["C"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('C',5)} ]} onPress={() => handleSeatPress('C',5)}>
              </TouchableOpacity>
            }
          </View>
        </View>
        {/*四列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["D"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',0)} ]} onPress={() => handleSeatPress('D',0)}>
              </TouchableOpacity>
            }
            {booked["D"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',1)} ]} onPress={() => handleSeatPress('D',1)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["D"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',2)} ]} onPress={() => handleSeatPress('D',2)}>
              </TouchableOpacity>
            }
            {booked["D"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',3)} ]} onPress={() => handleSeatPress('D',3)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
            {booked["D"][4] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',4)} ]} onPress={() => handleSeatPress('D',4)}>
              </TouchableOpacity>
            }
            {booked["D"][5] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('D',5)} ]} onPress={() => handleSeatPress('D',5)}>
              </TouchableOpacity>
            }
          </View>
        </View>
        {/* 五列目 */}
        <View style={styles.seatContainer}>
          <View style={{flexDirection: 'row'}}>
            {booked["E"][0] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',0)} ]} onPress={() => handleSeatPress('E',0)}>
              </TouchableOpacity>
            }
            {booked["E"][1] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',1)} ]} onPress={() => handleSeatPress('E',1)}>
              </TouchableOpacity>
            }
          </View>

          <View style={{flexDirection: 'row'}}>
          {booked["E"][2] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',2)} ]} onPress={() => handleSeatPress('E',2)}>
              </TouchableOpacity>
            }
            {booked["E"][3] ?
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: 'crimson'} ]} >
              </TouchableOpacity>
              :
              <TouchableOpacity style={[styles.menuBox, {backgroundColor: color('E',3)} ]} onPress={() => handleSeatPress('E',3)}>
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

          <TouchableOpacity style={styles.buttonContainer} onPress={showAlert} >
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
  },
  menuBox:{
    width: seatWidth,
    height: seatWidth,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      height:3,
      width:-3
    },
    borderColor: 'lightgray',
    borderWidth: 0.5,
    elevation:3,
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
