import React from 'react';
import { View, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { windowWidth } from '../utils/Dimentions';
import { formatDateUntilDay } from '../utils/file';
import { FirebaseTimestamp, db } from '../src/firebase';
/* types */
import { SeatObject, User } from '../types';



export const renderChoosenSeats = (datas: Array<boolean>, alphabet: string) => {
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

export const renderChoosenSeatsForAlert = (datas: Array<boolean>, alphabet: string) => {
  const list =  datas.map((data, index) => {
    if(data){
      return `位置 : ${alphabet}-${index-1}`
    }
    // fileterメソッドをかますことでundefinedを除去する
  }).filter(v => v);
  return list.join('\n');
}


export const fetchBookedSeatsList = async (setBooked: React.Dispatch<React.SetStateAction<SeatObject>>) => {
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


// export const handleSeatPress = (x: 'A'|'B'|'C'|'D'|'E', y: number,selected: SeatObject, setSelected: React.Dispatch<React.SetStateAction<SeatObject>>) => {
//   var newSelected: SeatObject = selected;
//   newSelected[x][y] = !newSelected[x][y];

//   const temp = {
//     'A': newSelected['A'],
//     'B': newSelected['B'],
//     'C': newSelected['C'],
//     'D': newSelected['D'],
//     'E': newSelected['E'],
//   }
  
//   setSelected(temp);
// }