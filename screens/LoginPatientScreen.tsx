import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import { RootTabScreenProps } from '../types';

export default function LoginPatientScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Rodné číslo</Text>
      <TextInput
        style={styles.btnStyle}
        placeholder="XXXXXX/XXXX"
        onChangeText={(email) => setIdNumber(email)}
      />

      <Text style={styles.textStyle}>Heslo</Text>
      <TextInput
        style={styles.btnStyle}
        placeholder="Heslo"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
 
      <TouchableOpacity style={styles.btnStyleLogin}>
        <Text>Prihlas sa</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textStyle: {
    fontFamily: "Roboto",
    color: "#121212",
    left: "10%",
    marginTop: 20,
  },
  btnStyle: {
    alignSelf: 'center',
    width: "80%",
    borderRadius: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#FFF",
  },

  btnStyleLogin: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100,
    width: "50%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00BFFF",
  },
});