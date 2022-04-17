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


class PatientSugarCalcScreen extends React.Component{
    constructor(props) {
        super(props);
        this.cabohydrates = this.props.route.params.cabohydrates
        this.tag = this.props.route.params.tag
      }

      
    sugar = ""

    async getInfoRequest(){
        try{
            const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/calculate_sugar?sugar=
            ${this.sugar}&carbohydrates=${this.cabohydrates}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json"}
            }).then(response => response.json()).then(data => {
                this.getInfoResponseProcessing(data);
              })
        } catch (error){
            alert("Chyba na strane serveru");
        } 
    }

    getInfoResponseProcessing(data){
        this.props.navigation.navigate('PatientResultScreen', {insulin_dose: data.insulin_dose, body: data.body, tag: this.tag})
    }


    checkValue(){
        this.sugar = parseFloat(this.sugar);
        if (isNaN(this.sugar)){
            alert("Nie je cislo");
        }else{
            if (this.sugar >= 0 && this.sugar <= 30){
                if (this.sugar + this.cabohydrates/5 > 30){
                    this.cabohydrates = 0
                    this.sugar = 30
                }
                this.getInfoRequest();
            }
            else{
                alert("Hodnota musi byt v rozmedzi od 0 do 30");
            }
        }  
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.textStyleInfo}>
                    Zadaj tvoju nameranú hladinu cukru v krvi v mg/dL.
                </Text>

                <Text style={styles.textStyleSugar}>
                    ZADAJ HLADINU CUKRU V KRVI(mg/dL)
                </Text>

                <TextInput style={styles.btnStyle} onChangeText={(text) => {
                    this.sugar = text;
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
export default PatientSugarCalcScreen;