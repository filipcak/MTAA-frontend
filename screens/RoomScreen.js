import React, { useState } from 'react';
import { Text, StyleSheet, Button, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RoomScreen({ setScreen, screens}) {

    const [roomId, setRoomId] = useState();
    const navigation = useNavigation();

  return (
    <>
      <Text style={styles.heading} >Select a Room</Text>
      <TextInput style={styles.input} value={roomId} onChangeText={setRoomId} />
      <View style={styles.buttonContainer} >
        <Button title="Join Screen" onPress={() => navigation.navigate('JoinScreen', {roomId: roomId})} />
      </View>
      <View style={styles.buttonContainer} >
        <Button title="Call Screen" onPress={() => navigation.navigate('CallScreen', {roomId: roomId})} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
  },
  input: {
    margin: 20,
    height: 40,
    backgroundColor: '#aaa'
  },
  buttonContainer: {
    margin: 5
  }
});