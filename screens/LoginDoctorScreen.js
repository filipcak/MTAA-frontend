import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox } from 'react-native';
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
  constructor(props) {
    super(props);

    this.state = {
      id_doctor: 0
    };
  }
  id_doctor = 0

  showId() {
    console.log(this.id_doctor);
  }
  newFunction(id){
    alert("podarilo sa");
  }
  nepodarilosa(){
    alert("nepodarilo prihlasit");
  }

  async myFunction() {
      try{
          const response = await fetch('https://mtaa-backend-pscpu.ondigitalocean.app/login_doctor', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({doctor_login_data: {id_number: "123456/0000", password: "1234"}})
          }).then(response => response.json()).then(data => {
            this.newFunction(data.response.id_doctor);
          })
      } catch (error){
        this.nepodarilosa()
      } 
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Rodné číslo</Text>
        <TextInput
          style={styles.btnStyle}
          placeholder="XXXXXX/XXXX"
          //onChangeText={(email) => setIdNumber(email)}
        />
  
        <Text style={styles.textStyle}>{this.id_doctor}</Text>
        <TextInput
          style={styles.btnStyle}
          secureTextEntry={true}
          //onChangeText={(password) => setPassword(password)}
        />
   
        <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
    this.myFunction();
  }}>
          <Text>Prihlas sa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default LoginDoctorScreen;