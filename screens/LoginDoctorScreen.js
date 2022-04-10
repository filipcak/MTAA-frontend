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
  passwrd = ''
  r_number = ''

  showId() {
    console.log(this.id_doctor);
  }
  newFunction(id){
    //alert("podarilo sa");
    this.props.navigation.navigate('HomeDoctorScreen', {id: id, r_number: this.r_number, password: this.passwrd})
  }
  nepodarilosa(){
    alert("Nepodarilo prihlásiť");
  }

  async myFunction() {
      try{
          const response = await fetch('https://mtaa-backend-pscpu.ondigitalocean.app/login_doctor', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({doctor_login_data: {id_number: this.r_number, password: this.passwrd}})
          }).then(response => response.json()).then(data => {
            this.newFunction(data.response.id_doctor);
          })
      } catch (error){
          //console.log(error);
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
          onChangeText={(birth_number) =>  this.r_number = birth_number}
        />

        <Text style={styles.textStyle}>Heslo</Text>
        <TextInput
          style={styles.btnStyle}
          secureTextEntry={true}
          onChangeText={(password) =>   this.passwrd = password}
        />
   
        <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
            this.myFunction();
        }}>
          <Text>Prihlás sa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default LoginDoctorScreen;