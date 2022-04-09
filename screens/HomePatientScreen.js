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
  }

  show(){
      alert(this.props.route.params.id_patient);
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnHome} onPress= {() => {
    this.show();
  }}>
            <Text>Idem jesť</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('PatientSugarCalcScreen')}>
            <Text>Vypočítaj inzulín</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHome}>
            <Text>Zapíš hodnotu cukru</Text>
          </TouchableOpacity> 
      </View>
    );
  }
}
export default LoginPatientScreen;