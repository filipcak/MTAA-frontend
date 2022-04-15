import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox } from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {decode as atob, encode as btoa} from 'base-64'

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
    this.checkIfDataActual();
    this.state={
      btnColor:"#000",

      id_patient: "",
      id_number: "",
      password: ""
    }
  }

  date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkIfDataActual();
    });
  }


  Messages(message){
    if (message === 200){
      this.setState({btnColor: "#0F0"});
    }
    else if (message === 204){
      this.setState({btnColor: "#F00"});
    }else if(message === 400){
      alert("Nespravne udaje")
    }
    else if (message === 401){
      alert("Nespravna autentifikacia")
    }else{
      alert("Ina chyba")
    }
}

  async checkIfDataActual(){
    try{
        const {id_patient, r_number, password} = this.props.route.params;
        const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/check_status?patient_id=${id_patient}&date=${this.date}`, {
        method: 'GET',
        headers: new Headers({ 
            "Content-Type": "application/json",
            'Authorization': 'Basic '+btoa(`${r_number}:${password}`),          
        }),
        }).then(response => this.Messages(response.status));         
    }catch (error){
        alert(error);
    } 
}

  render(){
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'flex-end', marginRight:10, marginTop:10}}>
          <Text>
            <Icon name="bell" size={40} color={this.state.btnColor}/>

          </Text>
        </View>
        
        <TouchableOpacity style={styles.btnHome} onPress= {() => this.props.navigation.navigate('PatientCarbohydratesScreen')}>
          <Text>Idem jesť</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('PatientSugarCalcScreen', {cabohydrates: 0, tag: 0})}>
            <Text>Vypočítaj inzulín</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('PatientSendSugarScreen', {id_patient: this.props.route.params.id_patient, 
          r_number: this.props.route.params.r_number, password: this.props.route.params.password})}>
            <Text>Zapíš hodnotu cukru</Text>
          </TouchableOpacity> 
      </View>
    );
  }
}
export default LoginPatientScreen;