import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, ActivityIndicator, TextInput, View, Text, Image, Alert, TouchableOpacity, ScrollView, Platform, Button, InteractionManager } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as Font from 'expo-font';
import { Modal, Portal, Provider } from 'react-native-paper';
import { RFPercentage } from "react-native-responsive-fontsize";
import { FirebaseTimestamp, db } from '../src/firebase';

/* component */
import Loading from '../screens/LoadingScreen';
import { FloatingActionButton } from '../components/FloatingActionButton';
import StudyClock from '../components/StudyClock';
import FirstModal from '../components/FirstModal';
import SecondModal from '../components/SecondModal';
/* lib */
import { formatDateUntilDay, formatDateUntilMinute, formatDate, formatDateUntilDayFromDateObject } from '../utils/file';
import { windowHeight, windowWidth } from '../utils/Dimentions';
/* context */
import { AuthContext } from '../src/AuthProvider';
import { exists } from 'node:fs';


const SVGWidth = windowWidth*0.24;
let goalDocRef: any;

const StudyReportScreen = ({navigation, route}) => {
  const {user} = useContext<any>(AuthContext);
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  const isFocused = useIsFocused()


  const loadFonts = async() => {
      await Font.loadAsync({
        Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
        ComicSnas: require('../assets/fonts/comicsansms3.ttf'),
        ComicSnas_bd: require('../assets/fonts/comicbd.ttf')
      })
      setFontLoaded(false)
  }
  const [selectedDate, setSelectedDate]  = useState<any>(formatDate());
  const [selectedDateString, setSelectedDateString] = useState<string>(formatDateUntilDay());
  const [post, setPost] = useState({
    dream: '',
    oneDayGoal: '',
    settingDate: '',
    targetDate: '',
    targetHours: '',
    ToDo: {
      one: '',
      two: '',
      three: '',
      four: '',
    },
  });
  const [postToAlert, setPostToAlert] = useState<any>({
    dream: '',
    oneDayGoal: '',
    settingDate: '',
    targetDate: '',
  });
  // 以下のstateでカレンダー目標の達成日時に指定されている目標を表示する
  const [settingDateList, setSettingDateList] = useState<any>([]);
  const [targetDateList, setTargetDateList] = useState<any>([]);

  const pressEditPencil = () => {
    navigation.navigate('EditGoalScreen', {post: post, selectedDate: selectedDate, dateString: selectedDateString});
  }

  // const ToDoOneChange = (val: string) => {
  //   setPost({
  //     ...post,
  //     ToDo: {
  //       ...post.ToDo,
  //       one: val
  //     }
  //   })
  // }
  // const ToDoTwoChange = (val: string) => {
  //   setPost({
  //     ...post,
  //     ToDo: {
  //       ...post.ToDo,
  //       two: val
  //     }
  //   })
  // }
  // const ToDoThreeChange = (val: string) => {
  //   setPost({
  //     ...post,
  //     ToDo: {
  //       ...post.ToDo,
  //       three: val
  //     }
  //   })
  // }
  // const ToDoFourChange = (val: string) => {
  //   setPost({
  //     ...post,
  //     ToDo: {
  //       ...post.ToDo,
  //       four: val
  //     }
  //   })
  // }



  const calcClockRotation = () => {
    let result = Number(post.targetHours)
    return result*30
  }


  const pressCalendarDate = async (response: any) => {
    console.log(formatDate());
    setSelectedDate(response);
    setSelectedDateString(response.dateString);
    // 上画面にでてくる目標をリセットする
    setPostToAlert('');
    // 選択されたdateString(0000-00-00)を用いてdbから値を取ってくる
    console.log(response.dateString);

    try {
      const docRef = await db.collection('users').doc(user.uid).collection('goals').doc(response.dateString);
      docRef.get().then((doc) => {
        // 登録されていな場合はundefinedエラーがでるので場合分け
        if(doc.exists){
          console.log('Document data: ', doc.data())
          const fetchedPost: any = doc.data()
          setPost(fetchedPost.post)
        }else{
          setPost({
            dream: '',
            oneDayGoal: '',
            settingDate: '',
            targetDate: '',
            targetHours: '',
            ToDo: {
              one: '',
              two: '',
              three: '',
              four: '',
            },
          })
        }
      })
    }catch(e){
      console.log(e);
    }
    // 選択した日が目標設定日に該当する場合はその目標のデータも取得する
    if(targetDateList.includes(response.dateString)){
      fetchMarkedDatesDream(response.dateString)
    }
  }

  const fetchMarkedDatesDream = async(dateString: string) => {
    // markされた日を選択した場合は達成予定の目標を取りに行く
      console.log('aaa')
      try {
        const docRef = await db.collection('users').doc(user.uid).collection('goals');
        // docRef.where("post.dream","==","海に行く").get().then((doc) => {
        docRef.where("post.targetDate","==",dateString).get().then((doc) => {
          // 登録されていな場合はundefinedエラーがでるので場合分け
          // whereクエリを投げ理場合はquerysnapshotの扱いが少し違う（複数ドキュメントが取れず前提となっている?）ので注意
          if(doc.docs[0]){
            console.log('取れました ', doc.docs[0].data());
            const fetchedPost: any = doc.docs[0].data();
            setPostToAlert({
              ...post,
              dream: fetchedPost.post.dream,
              oneDayGoal: fetchedPost.post.oneDayGoal
            })
          }else{
            console.log('取れていません');
            setPostToAlert({
              ...post,
              dream: '',
              oneDayGoal: '',
            })
          }
        })
      }catch(e){
        console.log(e);
      }
  }

  const renderMarkedDates = () => {
    var ary = targetDateList
    ary = ary.filter((v: number) => v)
    var result = {}
    ary.forEach((item: any) => {
      result[item] = {marked: true, dotColor: 'skyblue'}
    })
    console.log(result);
    return result
  }

  // 日付が変更されると今日の目標がリセットされる関数

  // const submitPost = async() => {
  //   console.log(selectedDate);
  //   // 17文字以上の投稿の場合は自動的に改行文字を入れるようにしたほうが良いかな、、
  //   try{
  //     // 日付が選択されているか、初期状態かによってselectedDayが値を持つかどうか変わるので条件分岐する
  //     if(selectedDate.dateString){
  //       goalDocRef = await db.collection('users').doc(user.uid).collection('goals').doc(selectedDate.dateString);
  //     }else{
  //       goalDocRef = await db.collection('users').doc(user.uid).collection('goals').doc(formatDateUntilDay());
  //     }
  //     goalDocRef.set({
  //       post: post,
  //       postTime: FirebaseTimestamp.fromDate(new Date()),
  //     });
  //     const ReservedDateDocRef = await db.collection('users').doc(user.uid).collection('ReservedDate').doc(user.uid);
  //     ReservedDateDocRef.set({
  //       settingDateList: settingDateList,
  //       targetDateList: targetDateList,
  //       updateTime: FirebaseTimestamp.fromDate(new Date()),
  //     })
  //     setDreamModalVisible(false);
  //     setGoalModalVisible(false);
  //   }catch (e){
  //     console.log(e);
  //   }
  // }

  const initialFetchGoals = async () => {
    try {
      const docRef = await db.collection('users').doc(user.uid).collection('goals').doc(selectedDateString);
      docRef.get().then((doc) => {
        if(doc.exists){
          const fetchedPost: any = doc.data()
          setPost(fetchedPost.post)
          setSelectedDate(formatDate());
        }
      })
    }catch(e){
      console.log(e);
    }
  }
  const fetchGoals = async () => {
    try {
      const docRef = await db.collection('users').doc(user.uid).collection('goals').doc(selectedDateString);
      docRef.get().then((doc) => {
        if(doc.exists){
          const fetchedPost: any = doc.data()
          setPost(fetchedPost.post)
          // EditGoalScreenからの遷移時に日付の値を渡す
          setSelectedDate(route.params.selectedDate);
        }
      })
    }catch(e){
      console.log(e);
    }
  }
  const fetchDateList = async () => {
    try {
      const docRef = await db.collection('users').doc(user.uid).collection('ReservedDate').doc(user.uid);
      docRef.get().then((doc) => {
        if(doc.exists){
          const fetchedDateLists: any = doc.data()
          setSettingDateList(fetchedDateLists.settingDateList)
          setTargetDateList(fetchedDateLists.targetDateList)
        }
      })
    }catch(e){
      console.log(e);
    }
  }


  useEffect(() => {
    loadFonts();
    initialFetchGoals();
    fetchDateList();
  }, []);


  useEffect(() => {
    fetchGoals();
  }, [isFocused])

  if (fontLoaded) {
    return <Loading message='読込中'/>;
  }

  return (
    <ScrollView>

    <View style={styles.container}>
      {postToAlert.dream ? <Text>目標設定日：{postToAlert.dream}</Text> : null}
      <View style={styles.dream_container}>
        <View style={{flexDirection: 'column', width: windowWidth*0.24}}>
          <Text style={{fontFamily: 'Anzumozi',fontSize: RFPercentage(3.5), textAlign: 'center'}}>夢</Text>
          {/* <Image
              source={require('../assets/images/Gift_logo_20210221.jpg')}
              style={styles.sliderImage}
            /> */}
          <View style={styles.dream_logo}>
            <Text style={styles.text_in_dream_logo}>dream</Text>
          </View>
        </View>
        <View style={styles.dream_form} >
          <View style={{marginLeft: windowWidth*0.55}}>
            <FontAwesome5.Button
              name="pencil-alt"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={pressEditPencil}
            />
          </View>
          <Text style={styles.dream_text}> {post.dream} </Text>
        </View>
      </View>


      <View style={styles.purpose_container}>
        <View style={{flexDirection: 'column', width: windowWidth*0.24}}>
          <Text style={{fontFamily: 'Anzumozi',fontSize: RFPercentage(2.6), textAlign: 'center'}}>今日の目標</Text>
          <StudyClock SVGWidth={SVGWidth} calcClockRotation={calcClockRotation} text_in_clock={selectedDate.day ? selectedDate.day : formatDate()} />
        </View>
        <View style={styles.purpose_form} >
          <View style={{marginLeft: windowWidth*0.55}}>
            <FontAwesome5.Button
              name="pencil-alt"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={pressEditPencil}
            />
          </View>
          <Text style={styles.purpose_text}>{post.oneDayGoal} </Text>
        </View>

      </View>

      <View style={styles.calendar_container}>
        <Calendar 
          // markedDates={{
          //   '2021-04-24': {marked: true, dotColor: 'skyblue'}
          // }}
          markedDates={renderMarkedDates()}
          onDayPress={pressCalendarDate}
          // current={formatDateUntilDay()}
          renderArrow={(direction: any) => (<FontAwesome name={`arrow-${direction}`} color='#05375a' size={15}/>)}
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
    </ScrollView>

  );
}

export default StudyReportScreen;

const calendar_width = windowWidth * 0.90
const modal_height = windowHeight * 0.8

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    // height: windowHeight,
    alignItems: 'center',
  },
  dream_container: {
    // flex: 2,
    flexDirection: 'row',
    width: calendar_width,
    // height: windowHeight*0.23,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f8ff',
    borderTopWidth: 1,
    borderTopColor: '#f0f8ff',
    paddingBottom: 10,
    paddingTop: 10,
  },
  dream_text: {
    fontFamily: 'Anzumozi',
    fontSize: RFPercentage(3.2),
    textAlign: 'center',
  },
  dream_form: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  purpose_container: {
    // flex: 2,
    flexDirection: 'row',
    width: calendar_width,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f8ff',
    marginTop: windowHeight*0.005,
    paddingBottom: 10,
    paddingTop: 10,
    // alignSelf: 'center',
  },
  purpose_text: {
    fontFamily: 'Anzumozi',
    fontSize: RFPercentage(3.2),
    textAlign: 'center',
  },
  purpose_form: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  modal_container: {
    backgroundColor: '#f5f5f5',
    // padding: 20,
    height: '100%',
    width: '100%',
  },
  dream_logo: {
    // flex: 1,
    // flexDirection: 'column',
    height: SVGWidth*0.9,
    width: SVGWidth*0.9,
    marginLeft: 4,
    borderRadius: 15,
    backgroundColor: '#EAC799',
    // marginBottom: windowHeight*0.02,
  },
  text_in_dream_logo: {
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'ComicSnas_bd',
    paddingTop: windowWidth*0.04,
    fontSize: RFPercentage(3.3),
    // verticalAlign: 'middle',
  },
  calendar_container: {
    // flex: 5,
    marginTop: windowHeight*0.04,
    width: calendar_width,
    borderBottomWidth: 1,
    // borderTopWidth:1,
    borderBottomColor: '#f0f8ff',
    // borderTopColor: '#f0f8ff',
  },
  sliderImage: {
    height: windowWidth*0.24,
    width: windowWidth*0.24,
    borderRadius: 12,
  },

  // modal--------------------------------------------------------
  input_wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  input_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9',
  },
  input_header_text: {
    fontFamily: 'Anzumozi',
    fontSize: RFPercentage(4),
    color: '#EAC799'
  },
  input_body:{
    flex: 14,
    width: '100%',
    alignItems: 'center',
  },
  input_body_text: {
    fontFamily: 'Anzumozi',
    fontSize: RFPercentage(3.5),
    color: '#EAC799',
    alignSelf: 'flex-start',
    marginLeft: windowWidth*0.1
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    height: windowHeight*0.07,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    width: windowWidth * 0.9,
  },
  status_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2e64e515',
    borderRadius: 5,
    // padding: '10 25',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  submit_button_text: {
    fontSize: 18,
    // fontFamily: '',
    fontWeight: 'bold',
    color: '#2e64e5',
  }, 
  consecutive_input_box: {
    flexDirection: 'column',
    marginTop: 10,
    width: windowWidth * 0.9,
  },
  consecutive_input_text: {
    // flex: 1,
    paddingLeft: 10,
    backgroundColor: 'white',
    height: windowHeight*0.07,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftColor: 'black',
    borderRightColor: 'black',
  }

})
