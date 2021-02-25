import React from 'react';
import {Button, StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from 'react-native';
/* types */
import { User } from "../types";

type Props = {
  user: User;
  onPress: () => void;
};

export const UserComponet: React.FC<Props> = ( { user, onPress }: Props ) => {
  const { id, name, avatar, updatedAt, createdAt } = user;
  return (  
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Image style={styles.avatar} source={{uri: avatar}} />
      <Text>{name} </Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({

  avatar: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  row: {
    flexDirection:'row',
    padding: 10,
    alignItems:'center',
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },


})