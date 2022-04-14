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
      id_number: "",
      password: ""
    };
  }

  navigateToHome(id){
    this.props.navigation.navigate('HomePatientScreen', {id_patient: id, r_number: this.state.id_number,
      password: this.state.password})
  }

  async signInPatient() {
      try{
          const response = await fetch('https://mtaa-backend-pscpu.ondigitalocean.app/login_patient', {
          method: 'POST',
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({patient_login_data: {id_number: this.state.id_number, password: this.state.password}})
          }).then(response => response.json()).then(data => {
            this.navigateToHome(data.response.id_patient);
          })
      } catch (error){
        alert("Nepodarilo sa prihlásiť");
      } 
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Rodné číslo</Text>
        <TextInput
          style={styles.btnStyle}
          placeholder="XXXXXX/XXXX"
          onChangeText={(text) => {this.setState({id_number: text})}}
        />
  
        <Text style={styles.textStyle}>Heslo</Text>
        <TextInput
          style={styles.btnStyle}
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({password: text})}}
        />
   
        <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
    this.signInPatient();
  }}>
          <Text>Prihlas sa</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default LoginPatientScreen;