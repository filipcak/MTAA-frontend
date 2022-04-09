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

class LoginPatientScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      id_patient: 0
    };
  }
  id_patient = 5

  showId() {
    console.log(this.id_patient);
  }
  newFunction(id){
    this.props.navigation.navigate('HomePatientScreen', {id_patient: id})
  }
  nepodarilosa(){
    alert("nepodarilo prihlasit");
  }

  async myFunction() {
      try{
          const response = await fetch('https://mtaa-backend-pscpu.ondigitalocean.app/login_patient', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({patient_login_data: {id_number: "123457/0123", password: "1234"}})
          }).then(response => response.json()).then(data => {
            this.newFunction(data.response.id_patient);
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
  
        <Text style={styles.textStyle}>{this.id_patient}</Text>
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
export default LoginPatientScreen;