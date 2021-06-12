import React, { useState, useEffect, useContext} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Platform, InteractionManager, Button } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { RFPercentage } from "react-native-responsive-fontsize";
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { formatDateUntilDay, formatDateUntilDayFromDateObject } from '../utils/file';
import { FirebaseTimestamp, db } from '../src/firebase';
import loadFonts from '../utils/loadFonts';

/* context */
import { AuthContext } from '../src/AuthProvider';


const today = formatDateUntilDay();
const pattern = /^\d{4}-?\d{2}-?\d{2}$/g;
let goalDocRef: any;


const EditGoalScreen: React.FC = ({route, navigation}) => {
  const {user} = useContext<any>(AuthContext);
  const isFocused = useIsFocused()
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);

  // dateTimePicker testZone-----------------------------------------------------------------
  const [date, setDate] = useState(new Date());
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [targetHoursShow, setTargetHoursShow] = useState(false);
  const [settingDateCalendarShow, setSettingDateCalendarShow] = useState(false);
  const [targetDateCalendarShow, setTargetDateCalendarShow] = useState(false);

  const [settingDateList, setSettingDateList] = useState<any>([]);
  const [targetDateList, setTargetDateList] = useState<any>([]);

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
  const selectedDate = route.params.selectedDate;


  const showMode = (currentMode: string) => {
    setTargetHoursShow(true);
    setDatePickerMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const showTargetDatePicker = () => {
    setTargetDateCalendarShow(true);
    setDatePickerMode('date');
  }
  const showSettingDatePicker = () => {
    setSettingDateCalendarShow(true);
    setDatePickerMode('date');
  }
// ----------------------------------------------------------------------------------------

  const dreamInputChange = (val: string) => {
    setPost({
      ...post,
      dream: val,
    })
  }

  const goalInputChange = (val: string) => {
    setPost({
      ...post,
      oneDayGoal: val,
    })
  }

  
  const targetHoursChange = (event, selectedDate) => {
    if(selectedDate){
      setTargetHoursShow(Platform.OS === 'ios');
      console.log('start');
      setPost({
        ...post,
        targetHours: selectedDate.getHours().toString(),
      });
      console.log(selectedDate.getHours());
    }
  }


  const submitPost = async() => {
    console.log(selectedDate.dateString);
    console.log(post.dream);
    // 17文字以上の投稿の場合は自動的に改行文字を入れるようにしたほうが良いかな、、
    try{
      // 日付が選択されているか、初期状態かによってselectedDayが値を持つかどうか変わるので条件分岐する
      if(selectedDate.dateString){
        goalDocRef = await db.collection('users').doc(user.uid).collection('goals').doc(selectedDate.dateString);
      }else{
        goalDocRef = await db.collection('users').doc(user.uid).collection('goals').doc(formatDateUntilDay());
      }
      goalDocRef.set({
        post: post,
        postTime: FirebaseTimestamp.fromDate(new Date()),
      });
      const ReservedDateDocRef = await db.collection('users').doc(user.uid).collection('ReservedDate').doc(user.uid);
      ReservedDateDocRef.set({
        settingDateList: settingDateList,
        targetDateList: targetDateList,
        updateTime: FirebaseTimestamp.fromDate(new Date()),
      })
    }catch (e){
      console.log(e);
    }

    navigation.goBack({selectedDate: selectedDate, dateString: route.params.dateString});
  }

  const fetchGoals = async () => {
    try {
      const docRef = await db.collection('users').doc(user.uid).collection('goals').doc(route.params.dateString);
      docRef.get().then((doc) => {
        if(doc.exists){
          const fetchedPost: any = doc.data()
          setPost(fetchedPost.post)
          // setSelectedDate(formatDate());
        }
      })
    }catch(e){
      console.log(e);
    }
    console.log(route.params.selectedDate)
  }


  const settingDateChange = (event, selectedDate) => {
    if(selectedDate){
      const currentDate = formatDateUntilDayFromDateObject(selectedDate || date);
      setSettingDateCalendarShow(Platform.OS === 'ios');
      console.log(currentDate);
      setPost({
        ...post,
      settingDate: currentDate
      })
      if(currentDate.match(pattern)){
        setSettingDateList([...settingDateList, currentDate])
      }
    }

  }

  const targetDateChange = (event, selectedDate) => {
    if(selectedDate){
      const currentDate = formatDateUntilDayFromDateObject(selectedDate || date);
      setTargetDateCalendarShow(Platform.OS === 'ios');
      console.log(currentDate);
      setPost({
        ...post,
        targetDate: currentDate
      })
      if(currentDate.match(pattern)){
      setTargetDateList([...targetDateList, currentDate])
      }
    }

  }

  useEffect(() => {
    loadFonts(setFontLoaded);
    fetchGoals();
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [isFocused]);

  if (fontLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.input_wrapper}>
        <View style={styles.input_body}>
          <Text style={[styles.input_body_text, {marginTop: 10}]}>大きな夢</Text>
          <View style={styles.action}>
              <TextInput 
                placeholder="大きな夢"
                // placeholderTextColor="#EAC799" 
                style={styles.textInput}
                autoCapitalize='none'
                value={post.dream}
                onChangeText={dreamInputChange}
              />
          </View>
          <Text style={[styles.input_body_text, {marginTop: windowHeight*0.1}]}>目標</Text>
          <View style={styles.action}>
              <TextInput 
                placeholder="目標"
                placeholderTextColor="#EAC799" 
                multiline={true}
                style={styles.textInput}
                autoCapitalize='none'
                value={post.oneDayGoal}
                onChangeText={goalInputChange}
              />
          </View>
          <Text style={[styles.input_body_text, {marginTop: 10}]}>時間単位</Text>
          <View style={styles.action}>
            <TouchableOpacity style={styles.textInput} onPress={showTimepicker}>
              <TextInput 
                value={post.targetHours}
                placeholder="3時間/日"
                placeholderTextColor="#EAC799" 
                // style={styles.textInput}
                autoCapitalize='none'
                editable={false}
                />
            </TouchableOpacity>
          </View>
          <Text style={[styles.input_body_text, {marginTop: 10}]}>目標作成日</Text>
          <View style={styles.action}>
            <TouchableOpacity style={styles.textInput} onPress={showSettingDatePicker}>
              <TextInput 
                placeholder={today}
                value={post.settingDate}
                placeholderTextColor="#EAC799" 
                // style={styles.textInput}
                autoCapitalize='none'
                editable={false}
                // onChangeText={settingDateChange}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.input_body_text, {marginTop: 10}]}>目標達成予定日</Text>
          <View style={styles.action}>
              <TouchableOpacity style={styles.textInput} onPress={showTargetDatePicker}>                      
                <TextInput 
                  placeholder={today}
                  value={post.targetDate}
                  placeholderTextColor="#EAC799" 
                  // style={styles.textInput}
                  autoCapitalize='none'
                  editable={false}
                  // onChangeText={targetDateChange}
                />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={submitPost} style={styles.buttonLabel}>
            <Text style={styles.input_header_text}>保存</Text>
          </TouchableOpacity>
        {/* -------------------------------------------------------------- */}
        </View>
        {settingDateCalendarShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={datePickerMode}
            display="default"
            onChange={settingDateChange}
          />
        )}
        {targetDateCalendarShow && ( 
          <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={datePickerMode}
          display="default"
          onChange={targetDateChange}
        />
        )}
        {targetHoursShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={datePickerMode}
            display="default"
            is24Hour={false}
            onChange={targetHoursChange}
            dateFormat="dayofweek day month"
          />
        )}
        </View>
        {/* ---------------------------------------------------------------- */}
    </>
  )
}

export default EditGoalScreen;

const styles = StyleSheet.create({
  modal_container: {
    backgroundColor: '#f5f5f5',
    // padding: 20,
    height: '100%',
    width: '100%',
  },
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
  buttonLabel: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'gray',
    padding: 3,
  },
  buttonContainer: {
    width: windowWidth * 0.5,
    height: windowHeight *0.06,
  }, 
});
