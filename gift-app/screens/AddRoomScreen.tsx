import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { db, FirebaseTimestamp } from '../src/firebase';
import { windowHeight, windowWidth } from '../utils/Dimentions';


type Props = {
  title: string;
  modeValue: ("text" | "outlined" | "contained" | undefined);
}

const FormButton: React.FC<Props> = ({ title, modeValue, ...rest }) => {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
    >
      {title}
    </Button>
  );
}

export default function AddRoomScreen({ navigation }: any) {
  const [roomName, setRoomName] = useState('');

  const handleButtonPress = () => {
    if (roomName.length > 0) {
      db.collection('threads').add({
          name: roomName,
          // 管理者にはcreatedBy の値がトークルームに名前になる仕様なので、オープンチャットのときはここにroomNameを入れる
          createdBy: roomName,
          creatersId: 'open',
          openChat: true,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          }
          }
        )
      .then(docRef => {
        docRef.collection('messages').add({
          text: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
          system: true
        })
          navigation.navigate('ChatHomeScreen');
        });
    }
  }


  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>新しいチャットルームを作る</Text>
      <Text style={styles.subText}>※このチャットルームは全体に公開されます</Text>
      <TextInput
        style={styles.input}
        labelName='Room Name'
        placeholder='Room Name'
        value={roomName}
        onChangeText={text => setRoomName(text)}
        clearButtonMode='while-editing'
      />
      <FormButton
        title='Create'
        modeValue='contained'
        labelStyle={styles.buttonLabel}
        onPress={() => handleButtonPress()}
        disabled={roomName.length === 0}
        />
    </View>
  );
}


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginTop: windowHeight*0.25,
    alignSelf: 'center'
  },
  subText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonLabel: {
    fontSize: 22
  },
  button: {
    marginTop: 10,
    alignSelf: 'center'
  },
  buttonContainer: {
    width: windowWidth * 0.5,
    height: windowHeight *0.06,
  }, 
  input: {
    width: windowWidth*0.8,
    alignSelf: 'center'
  }
});