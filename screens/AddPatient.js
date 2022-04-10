import React, { useState } from "react";
import {decode as atob, encode as btoa} from 'base-64'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

import { styles } from '../styles/styles'

class AddPatient extends React.Component{
    constructor(props) {
        super(props);
    }
    id_doctor = 1
    rc_patient = 0
    id_patient = 0

    Messages(message){
        if (message === 409){
            Alert.alert("Pozor","Pacienta už má niekto priradený.")
        }
        else if (message === 200){
            Alert.alert("Úspech", "Pacient s rodným číslom: " + this.rc_patient + " je úspešne priradený.")
        }
        else{
            Alert.alert("Neúspešné priradenie",message)
        }
    }

    async addPatient(id_doctor, r_doctor, p_doctor){
        try{
            await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/patient_exist?id_number_patient=${this.rc_patient}`, {
                method: 'GET',
            }).then(response => response.json()).then(data => {
                this.id_patient = data.id_patient;
            })
            try {
                await fetch('https://mtaa-backend-pscpu.ondigitalocean.app/assign_patient', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic '+btoa(`${r_doctor}:${p_doctor}`),
                }),
                body: JSON.stringify({assign_info: {id_doctor: id_doctor, id_patient: this.id_patient}})
                }).then(response => this.Messages(response.status));
            }
            catch (error){
                console.error(error);
                this.Messages("Chybná autentifikácia.")
            }
        } catch (error){
            console.log(error);
            this.Messages("Pacient s daným rodným číslom neexistuje")
        }
    }

    render(){
        const {id, r_number, password} = this.props.route.params;
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Napíš rodné číslo pacienta</Text>
                <TextInput
                    style={styles.btnStyle}
                    placeholder="XXXXXX/XXXX"
                    onChangeText={(rc_patient) => this.rc_patient = rc_patient}
                />
                <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                    this.addPatient(id, r_number, password);
                }}>
                    <Text>Pridaj pacienta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default AddPatient;