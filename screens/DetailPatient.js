import React, { useState } from "react";
import {decode as atob, encode as btoa} from 'base-64'
import {
    RefreshControl,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";

import { styles } from '../styles/styles'

class DetailPatient extends React.Component{
    constructor(props) {
        super(props);
    }
    id_doctor = 1
    rc_patient = 0
    id_patient = 0
    patient = []

    state = {
        uniqueValue: 1
    }

    Messages(message){
        if (message === 200){
            Alert.alert("Úspech", "Pacient s rodným číslom: " + this.rc_patient + " ma taketo info.")
        }
        else{
            Alert.alert("Neúspešné priradenie",message)
        }
    }

    async detailPatient(id_doctor, r_doctor, p_doctor){
        try{
            await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/detail_patient?patient_id=${3}&doctor_id=${id_doctor}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Basic '+btoa(`${r_doctor}:${p_doctor}`),
                }),
            }).then(response => response.json()).then(data => {
                this.patient = data.response;
                console.log(this.patient.patient_name);
                this.setState({uniqueValue: 2})
            });
        }
        catch (error){
            console.error(error);
            this.Messages("Chybná autentifikácia - celkova chyba.")
        }

    }



    render(){
        const {id, r_number, password} = this.props.route.params;
        this.detailPatient(id, r_number, password);
        return (
            <View style={styles.container} >
                <Text key={this.state.uniqueValue}>meno: {this.patient.patient_name}</Text>
                <Text key="surname">priezvisko: {this.patient.patient_surname}</Text>
                <Text key="id_number">rodné číslo: {this.patient.patient_rc}</Text>
                <Text key="mail">mail: {this.patient.patient_mail}</Text>
                <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                    //in development
                }}>
                    <Text>zaznamy o pacientovi</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default DetailPatient;