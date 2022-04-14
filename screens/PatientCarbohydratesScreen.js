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


class PatientCarbohydratesScreen extends React.Component{
    constructor(props) {
        super(props);
      }

    cabohydrates = "";

    checkValue(){
        this.cabohydrates = parseFloat(this.cabohydrates);
        if (isNaN(this.cabohydrates)){
            alert("Nie je cislo");
        }else{
            this.props.navigation.navigate('PatientSugarCalcScreen', {cabohydrates: this.cabohydrates, tag: 1})
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.textStyleInfo}>
                    Zadaj celkový počet sacharidov, ktorý plánuješ zjesť alebo si zjedol
                </Text>

                <Text style={styles.textStyleSugar}>
                    ZADAJ POČET SACHARIDOV (g)
                </Text>

                <TextInput style={styles.btnStyle} onChangeText={(text) => {
                    this.cabohydrates = text;
                }}/>

                <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                    this.checkValue();
                }}>
                    <Text>Potvrď</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}
export default PatientCarbohydratesScreen;