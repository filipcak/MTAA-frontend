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
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground ,
} from "react-native";



import { styles } from '../styles/styles'

class RegisterPatientScreen extends React.Component{

  state = {
    name: "",
    surname: "",
    idNumber: "",
    email: "",
    password: "",
    passwordSecond: "",
  }

  Messages(message){
    alert(message)
    if (message === 201){
      alert("Boli ste uspesne zaregistrovany")
    }
    else if (message === 409){
        alert("Konflikt")
    }
    else{
        alert("Nepovoleny pristup")
    }
}

  checkValues(){
    if (/^([0-9]{6}\/[0-9]{4})$/.test(this.state.idNumber)){
      if (this.state.password == this.state.passwordSecond){
      

        if (this.state.password == "" || this.state.passwordSecond == ""){
          alert("Je potrebné zadať heslo");
        }else{
          this.registerPatient();
        }
      }else{
        alert("Hesla sa nezhoduju");
      }
    }
    else{
      alert("Rodné číslo je v nesprávnom formáte")
    }

    
  }

  saveIdPatient(id){
    this.props.navigation.replace('HomePatientScreen', {id_patient: id, r_number: this.state.idNumber,
    password: this.state.password})
  }

  async registerPatient() {
    try{
        const response = await fetch('https://mtaa-backend-pscpu.ondigitalocean.app/reg_patient', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          patient_data: {
            name: this.state.name,
            surname: this.state.surname,
            id_number: this.state.idNumber,
            email: this.state.email,
            password: this.state.password
          }
        })
        }).then(response => response.json()).then(data => {
          this.saveIdPatient(data.response.id_patient);
        })
    } catch (error){
      alert("Rodne cislo je pouzite")
    } 
}

  render(){
    return (
      <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', opacity: 1}}>
        <KeyboardAvoidingView behavior="padding" enabled={true} keyboardVerticalOffset={-140}>
        <ScrollView>
          <Text style={styles.textStyle}>Meno</Text>
          <TextInput style={styles.btnStyleReg} onChangeText={(text) => {this.setState({name: text})}}/>
    
          <Text style={styles.textStyle}>Priezvisko</Text>
          <TextInput style={styles.btnStyleReg} onChangeText={(text) => {this.setState({surname: text})}}/>
        
          <Text style={styles.textStyle}>Rodné číslo</Text>
          <TextInput style={styles.btnStyleReg} placeholder="XXXXXX/XXXX" onChangeText={(text) => {this.setState({idNumber: text})}}/>
    
          <Text style={styles.textStyle}>Email</Text>
          <TextInput style={styles.btnStyleReg} onChangeText={(text) => {this.setState({email: text})}}/>
    
          <Text style={styles.textStyle}>Heslo</Text>
          <TextInput style={styles.btnStyleReg} onChangeText={(text) => {this.setState({password: text})}}/>
    
          <Text style={styles.textStyle}>Heslo znova</Text>
          <TextInput style={styles.btnStyleReg} onChangeText={(text) => {this.setState({passwordSecond: text})}}/>
    
          <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                      this.checkValues();
                  }}>
            <Text>Registrovať</Text >
          </TouchableOpacity>
        </ScrollView>
        
        
      </KeyboardAvoidingView>
      </ImageBackground>
      
    );
  }
}
export default RegisterPatientScreen;
