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

export default function RegisterPatientScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Meno</Text>
      <TextInput style={styles.btnStyle} onChangeText={(name) => setName(name)}/>

      <Text style={styles.textStyle}>Priezvisko</Text>
      <TextInput style={styles.btnStyle} onChangeText={(surname) => setSurname(surname)}/>
    
      <Text style={styles.textStyle}>Rodné číslo</Text>
      <TextInput style={styles.btnStyle} onChangeText={(idNumber) => setIdNumber(idNumber)}/>

      <Text style={styles.textStyle}>Email</Text>
      <TextInput style={styles.btnStyle} onChangeText={(email) => setEmail(email)}/>

      <Text style={styles.textStyle}>Heslo</Text>
      <TextInput style={styles.btnStyle} onChangeText={(password) => setPassword(password)}/>

      <Text style={styles.textStyle}>Heslo znova</Text>
      <TextInput style={styles.btnStyle} onChangeText={(passwordSecond) => setPasswordSecond(passwordSecond)}/>

      <TouchableOpacity style={styles.btnStyleReg}>
        <Text>Registrovať</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'left',
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
  btnStyleReg: {
    alignSelf: 'center',
    width: "50%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#00BFFF",
  },
});
