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

import { styles } from '../styles/styles'

class RegisterPatientScreen extends React.Component{
  
  // const [name, setName] = useState("");
  // const [surname, setSurname] = useState("");
  // const [idNumber, setIdNumber] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordSecond, setPasswordSecond] = useState("");

  render(){
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
  
        <TouchableOpacity style={styles.btnStyleRegLog}>
          <Text>Registrovať</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default RegisterPatientScreen;
