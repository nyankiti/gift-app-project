import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, ActivityIndicator, TextInput, View, Text, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { Modal, Portal, Provider } from 'react-native-paper';
import { RFPercentage } from "react-native-responsive-fontsize";
import { FirebaseTimestamp, db } from '../src/firebase';

/* component */
import Loading from '../screens/LoadingScreen';
import { FloatingActionButton } from '../components/FloatingActionButton';
/* lib */
import { formatDateUntilDay, formatDateUntilMinute, formatDate } from '../utils/file';
import { windowHeight, windowWidth } from '../utils/Dimentions';
/* context */
import { AuthContext } from '../src/AuthProvider';

const today = formatDateUntilDay();
const pattern = /^\d{4}-?\d{2}-?\d{2}$/g;

const StudyReportScreen = () => {
  const {user} = useContext<any>(AuthContext);
  const [fontLoaded, setFontLoaded] = useState<boolean>(true);
  // const [loaded] = useFonts({
  //   Anzumozi: require('../assets/fonts/Anzumozi.ttf'),
  //   ComicSnas: require('../assets/fonts/comicsansms3.ttf')
  // });

  const loadFonts = async() => {
    // if(!fontLoaded){
      await Font.loadAsync({
        'Anzumozi': require('../assets/fonts/Anzumozi.ttf'),
        'ComicSnas': require('../assets/fonts/comicsansms3.ttf')
      })
      setFontLoaded(false)
    // }
  }


  const [dreamModalvisible, setDreamModalVisible] = useState<boolean>(false);
  const [goalModalvisible, setGoalModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate]  = useState<any>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState({
    dream: '',
    oneDayGoal: '',
    settingDate: '',
    targetDate: '',
  });
  const [postToAlert, setPostToAlert] = useState({
    dream: '',
    oneDayGoal: '',
    settingDate: '',
    targetDate: '',
  });
  // 以下のstateでカレンダー目標の達成日時に指定されている目標を表示する
  const [settingDateList, setSettingDateList] = useState<any>([]);
  const [targetDateList, setTargetDateList] = useState<any>([]);

  const showDreamModal = () => {
    setDreamModalVisible(true);
  }
  const hideDreamModal = () => {
    setDreamModalVisible(false);
  }
  const showGoalModal = () => {
    setGoalModalVisible(true);
  }
  const hideGoalModal = () => {
    setGoalModalVisible(false);
  }

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

  const settingDateChange = (val: string) => {
    setPost({
      ...post,
      settingDate: val
    })
    if(val.match(pattern)){
      setSettingDateList([...settingDateList, val])
    }
  }

  const targetDateChange = (val: string) => {
    setPost({
      ...post,
      targetDate: val
    })
    if(val.match(pattern)){
    setTargetDateList([...targetDateList, val])
    }
  }

  const pressCalendarDate = async (response: any) => {
    console.log(targetDateList);
    setSelectedDate(response);
    // 選択されたdateString(0000-00-00)を用いてdbから値を取ってくる
    console.log(response.dateString);

    try {
      const docRef = await db.collection('users').doc(user.uid).collection('goals').doc(response.dateString);
      docRef.get().then((doc) => {
        // 登録されていな場合はundefinedエラーがでるので場合分け
        if(doc.exists){
          console.log('Document data: ', doc.data())
          const fetchedPost: any = doc.data()
          setPost({
            ...post,
            dream: fetchedPost.post.dream,
            oneDayGoal: fetchedPost.post.oneDayGoal
          })
        }else{
          setPost({
            ...post,
            dream: '',
            oneDayGoal: '',
          })
        }
      })
    }catch(e){
      console.log(e);
    }
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
    return result
  }

  // 日付が変更されると今日の目標がリセットされる関数

  const submitPost = () => {
    // 17文字以上の投稿の場合は自動的に改行文字を入れるようにしたほうが良いかな、、
    db.collection('users').doc(user.uid).collection('goals').doc(selectedDate.dateString).set({
      post: post,
      postTime: FirebaseTimestamp.fromDate(new Date()),
    })
    db.collection('users').doc(user.uid).collection('ReservedDate').doc(user.uid).set({
      settingDateList: settingDateList,
      targetDateList: targetDateList,
      updateTime: FirebaseTimestamp.fromDate(new Date()),
    })
    setDreamModalVisible(false);
  }

  const fetchGoals = async () => {
    try {
      const docRef = await db.collection('users').doc(user.uid).collection('goals').doc(formatDateUntilDay());
      docRef.get().then((doc) => {
        if(doc.exists){
          const fetchedPost: any = doc.data()
          setPost({
            ...post,
            dream: fetchedPost.post.dream,
            oneDayGoal: fetchedPost.post.oneDayGoal
          })
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
    fetchGoals();
    fetchDateList();
  }, []);

  if (fontLoaded) {
    return <Loading />;
  }

  return (
    <ScrollView>
    <Provider>

    <View style={styles.container}>
      <Text>{postToAlert.dream}</Text>
      <View style={styles.dream_container}>
        <View style={{flexDirection: 'column', width: windowWidth*0.24}}>
          <Text style={{fontFamily: 'ComicSnas, Anzumozi',fontSize: RFPercentage(3.5), textAlign: 'center'}}>夢</Text>
          <Image
              source={require('../assets/images/Gift_logo_20210221.jpg')}
              style={styles.sliderImage}
            />
        </View>
        <View style={styles.dream_form} >
          <View style={{marginLeft: windowWidth*0.55}}>
            <FontAwesome5.Button
              name="pencil-alt"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={showDreamModal}
            />
          </View>
          <Text style={styles.dream_text}> {post.dream} </Text>
        </View>
      </View>


      <View style={styles.purpose_container}>
        <View style={{flexDirection: 'column', width: windowWidth*0.24}}>
          <Text style={{fontFamily: 'ComicSnas, Anzumozi',fontSize: RFPercentage(2.6), textAlign: 'center'}}>今日の目標</Text>
          <View style={styles.pie}>
            <View style={styles.clocl_text_space}>
              <Text style={styles.text_in_clock}>{selectedDate.day ? selectedDate.day : formatDate()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.purpose_form} >
          <View style={{marginLeft: windowWidth*0.55}}>
            <FontAwesome5.Button
              name="pencil-alt"
              size={22}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={showDreamModal}
            />
          </View>
          <Text style={styles.purpose_text}>{post.oneDayGoal} </Text>
        </View>

      </View>

      <View style={styles.calendar_container}>
        <Calendar 
          // markedDates={{
          //   '2021-03-24': {marked: true, dotColor: 'skyblue'}
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
        <Portal>
            <Modal visible={dreamModalvisible} onDismiss={hideDreamModal} contentContainerStyle={styles.modal_container} >
              <View style={styles.input_wrapper}>
                <View style={styles.input_header}>
                  <View>
                    <FontAwesome.Button
                      name="times"
                      size={18}
                      color="#EAC799"
                      backgroundColor='#f5f5f5'
                      onPress={hideDreamModal}
                    />
                  </View>
                  <View>
                    <Text style={styles.input_header_text}>あなたの夢を作成</Text>
                  </View>
                  <TouchableOpacity onPress={submitPost}>
                    <Text style={styles.input_header_text}>保存</Text>
                  </TouchableOpacity>
                </View>
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
                  <Text style={[styles.input_body_text, {marginTop: 10}]}>目標作成日</Text>
                  <View style={styles.action}>
                      <TextInput 
                        placeholder={today}
                        placeholderTextColor="#EAC799" 
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={settingDateChange}
                      />
                  </View>
                  <Text style={[styles.input_body_text, {marginTop: 10}]}>目標達成予定日</Text>
                  <View style={styles.action}>
                      <TextInput 
                        placeholder={today}
                        placeholderTextColor="#EAC799" 
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={targetDateChange}
                      />
                  </View>

                </View>



                {/* <TextInput
                  style={styles.input_wrapper} 
                  placeholder='あなたの夢は?'
                  multiline={true}
                  numberOfLines={4}
                  value={post.dream}
                  onChangeText={dreamInputChange}
                />
                {uploading ? ( 
                  <View style={styles.status_wrapper}>
                    <Text>{ transferred } % Competed!</Text>
                    <ActivityIndicator size='large' color='#0000ff' />
                  </View>
                ): 
                <TouchableOpacity style={styles.submit_btn} onPress={submitPost}>
                  <Text style={styles.submit_button_text}>Post</Text>
                </TouchableOpacity>
                } */}
              </View>
            </Modal>
            <Modal visible={goalModalvisible} onDismiss={hideGoalModal} contentContainerStyle={styles.modal_container} >
              <View style={styles.input_wrapper}>
                <TextInput
                  style={styles.input_wrapper} 
                  placeholder='今日の目標は?'
                  multiline={true}
                  numberOfLines={4}
                  value={post.oneDayGoal}
                  onChangeText={goalInputChange}
                />
                {uploading ? ( 
                  <View style={styles.status_wrapper}>
                    <Text>{ transferred } % Competed!</Text>
                    <ActivityIndicator size='large' color='#0000ff' />
                  </View>
                ): 
                <TouchableOpacity style={styles.submit_btn} onPress={submitPost}>
                  <Text style={styles.submit_button_text}>Post</Text>
                </TouchableOpacity>
                }
              </View>
            </Modal>
        </Portal>
      </View>
    </Provider>
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
    height: windowHeight,
    alignItems: 'center',
  },
  dream_container: {
    // flex: 2,
    flexDirection: 'row',
    width: calendar_width,
    height: windowHeight*0.23,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f8ff',
    borderTopWidth: 1,
    borderTopColor: '#f0f8ff',
  },
  dream_text: {
    fontFamily: 'ComicSnas, Anzumozi',
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
    // alignSelf: 'center',
  },
  purpose_text: {
    fontFamily: 'ComicSnas, Anzumozi',
    fontSize: RFPercentage(3.2),
    textAlign: 'center',
  },
  purpose_form: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  clocl_text_space: {
    marginTop: windowWidth*0.06,
    marginLeft: windowWidth*0.06,
    height: windowWidth*0.12,
    width: windowWidth*0.12,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  text_in_clock: {
    textAlign: 'center',
    // justifyContent: 'center',
    paddingTop: windowWidth*0.013,
    fontSize: RFPercentage(3.8),
  },
  modal_container: {
    backgroundColor: '#f5f5f5',
    // padding: 20,
    height: '100%',
    width: '100%',
  },
  pie: {
    // flex: 1,
    // flexDirection: 'column',
    height: windowWidth*0.24,
    width: windowWidth*0.24,
    borderRadius: 50,
    backgroundColor: '#EAC799',
    marginBottom: windowHeight*0.02,
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
    fontFamily: 'ComicSnas, Anzumozi',
    fontSize: RFPercentage(4),
    color: '#EAC799'
  },
  input_body:{
    flex: 14,
    width: '100%',
    alignItems: 'center',
  },
  input_body_text: {
    fontFamily: 'ComicSnas, Anzumozi',
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
  }

})
