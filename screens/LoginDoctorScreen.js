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
  Alert,
} from "react-native";

import { styles } from '../styles/styles'

class LoginDoctorScreen extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Rodné číslo</Text>
        <TextInput
          style={styles.btnStyle}
          placeholder="XXXXXX/XXXX"
          //onChangeText={(email) => setIdNumber(email)}
        />
  
        <Text style={styles.textStyle}>Heslo</Text>
        <TextInput
          style={styles.btnStyle}
          placeholder="Heslo"
          secureTextEntry={true}
          //onChangeText={(password) => setPassword(password)}
        />
   
        <TouchableOpacity style={styles.btnStyleRegLog}>
          <Text>Prihlas sa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default LoginDoctorScreen;