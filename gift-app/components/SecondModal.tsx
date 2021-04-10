import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Font from 'expo-font';
import { windowHeight, windowWidth } from '../utils/Dimentions';
import { formatDateUntilDay } from '../utils/file';
import { functions } from 'firebase';


const today = formatDateUntilDay();


type Props = {
  post: {    
    dream: string,
    oneDayGoal: string,
    settingDate: string,
    targetDate: string,
    targetHours: string,
    ToDo: {
      one: string,
      two: string,
      three: string,
      four: string,
    },
  },
  visible: boolean,
  setVisible: any,
  submitPost: any,
  targetHoursChange: any,
  ToDoOneChange: any,
  ToDoTwoChange: any,
  ToDoThreeChange: any,
  ToDoFourChange: any,  
}

const SecondModal: React.FC<Props> = ({post, visible, setVisible, submitPost, targetHoursChange, ToDoOneChange, ToDoTwoChange, ToDoThreeChange, ToDoFourChange }) => {
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);

  // dateTimePicker testZone-----------------------------------------------------------------
  const [date, setDate] = useState(new Date());
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [targetHoursShow, setTargetHoursShow] = useState(false);
  const [settingDateCalendarShow, setSettingDateCalendarShow] = useState(false);
  const [targetDateCalendarShow, setTargetDateCalendarShow] = useState(false);


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

  // const [dreamModalvisible, setDreamModalVisible] = useState<boolean>(false);
  const [goalModalvisible, setGoalModalVisible] = useState<boolean>(false);

  const loadFonts = async() => {
      await Font.loadAsync({
        Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
        ComicSnas: require('../assets/fonts/comicsansms3.ttf'),
        ComicSnas_bd: require('../assets/fonts/comicbd.ttf')
      })
      setFontLoaded(false)
  }

  // const showDreamModal = () => {
  //   setDreamModalVisible(true);
  // }
  const hideGoalModal = () => {
    setVisible(false);
  }

  useEffect(() => {
    loadFonts();
  }, []);

  if (fontLoaded) {
    return null;
  }

  return (
    <Modal visible={visible} onDismiss={hideGoalModal} contentContainerStyle={styles.modal_container} >
      <View style={styles.input_wrapper}>
        <View style={styles.input_header}>
          <View>
            <FontAwesome.Button
              name="times"
              size={20}
              color="#EAC799"
              backgroundColor='#f5f5f5'
              onPress={hideGoalModal}
            />
          </View>
          <View>
            <Text style={[styles.input_header_text, {fontFamily: 'ComicSnas'}]}>To Do</Text>
          </View>
          <TouchableOpacity onPress={submitPost}>
            <Text style={styles.input_header_text}>保存</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input_body}>
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
          <Text style={[styles.input_body_text, {marginTop: windowHeight*0.1, fontFamily: 'ComicSnas'}]}>To Do List</Text>
          <View style={styles.consecutive_input_box}>
              <TextInput 
                placeholder="・"
                placeholderTextColor="#EAC799" 
                style={[styles.consecutive_input_text, {borderTopWidth: 0.5 , borderTopColor: 'black'}]}
                autoCapitalize='none'
                value={post.ToDo.one}
                onChangeText={ToDoOneChange}
              />
              <TextInput 
                placeholder="・"
                placeholderTextColor="#EAC799" 
                style={styles.consecutive_input_text}
                autoCapitalize='none'
                value={post.ToDo.two}
                onChangeText={ToDoTwoChange}
              />
              <TextInput 
                placeholder="・"
                placeholderTextColor="#EAC799" 
                style={styles.consecutive_input_text}
                autoCapitalize='none'
                value={post.ToDo.three}
                onChangeText={ToDoThreeChange}
              />
              <TextInput 
                placeholder="・"
                placeholderTextColor="#EAC799" 
                style={[styles.consecutive_input_text, {borderBottomWidth: 0.5 , borderBottomColor: 'black'}]}
                autoCapitalize='none'
                value={post.ToDo.four}
                onChangeText={ToDoFourChange}
              />
          </View>
          {/* ---------------------------------------------------------- */}
          <View>
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
          {/* ------------------------------------------------------------- */}
        </View>
      </View>
    </Modal>
  )
}

export default SecondModal;

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
});
