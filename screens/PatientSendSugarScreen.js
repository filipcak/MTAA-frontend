import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox } from 'react-native';
import moment from 'moment';
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


class PatientSendSugar extends React.Component{
    constructor(props) {
        super(props);
      }

    sugar = ""

    hist_record = {
        id_hist_request: 0,
        morning: 0,
        lunch: 0,
        evening: 0
    }

    date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")

    Messages(message){
        if (message === 200){
            this.props.navigation.goBack();
        }
        else if (message === 400){
            Alert.alert("Nespravne zadanie parametrov")
        }
        else{
            Alert.alert("Nepovoleny pristup")
        }
    }

    processResponse(data){
        this.hist_record.id_hist_request = data.response.id_hist_request;
        this.hist_record.morning = data.response.morning;
        this.hist_record.lunch = data.response.lunch;
        this.hist_record.evening = data.response.evening;

        if (moment(new Date()).hours() < 10 ){
            this.hist_record.morning = this.sugar;
        } else if(moment(new Date()).hours() <= 16 ){
            this.hist_record.lunch = this.sugar;
        }else{
            this.hist_record.evening = this.sugar;
        }
        this.sendSugarRecord();
    }

    

    async getSugarRecord(){
        try{
            const {id_patient, r_number, password} = this.props.route.params;
            const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/get_hist_item`, {
            method: 'PUT',
            headers: new Headers({ 
                "Content-Type": "application/json",
                'Authorization': 'Basic '+btoa(`${r_number}:${password}`),          
            }),
            body: JSON.stringify({
                    "hist_request": {
                        "patient_id": id_patient,
                        "date": this.date
                    }
                }
              )
            }).then(response => response.json()).then(data => {
            this.processResponse(data);
            })          
        }catch (error){
            alert(error);
        } 
    }

    async sendSugarRecord(){
        try{
            const {id_patient, r_number, password} = this.props.route.params;
            const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/change_hist_rec`, {
            method: 'PUT',
            headers: new Headers({ 
                "Content-Type": "application/json",
                'Authorization': 'Basic '+btoa(`${r_number}:${password}`),          
            }),
            body: JSON.stringify({
                hist_record: {
                  patient_id: id_patient,
                  id_hist_request: this.hist_record.id_hist_request,
                  morning: this.hist_record.morning,
                  lunch: this.hist_record.lunch,
                  evening: this.hist_record.evening
                }
              })
            }).then(response => this.Messages(response.status));

        }catch (error){
            alert(error);
        } 
    }

    checkValue(){
        this.sugar = parseFloat(this.sugar);
        if (isNaN(this.sugar)){
            alert("Nie je cislo");
        }else{
            if (this.sugar >= 0 && this.sugar <= 30){
                this.getSugarRecord();
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
export default PatientSendSugar;