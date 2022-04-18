import React, { useState } from "react";
import {decode as atob, encode as btoa} from 'base-64'
import {
    RefreshControl,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    ImageBackground,
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
        uniqueValue: 1,
        uniqueValuePhoto: 0
    }

    Messages(message){
        if (message === 401){
            //Alert.alert("Úspech", "Pacient s rodným číslom: " + this.rc_patient + " ma taketo info.")
            Alert.alert("Chyba", "Chyba pri autorizácií.")
        }
        else if (message === 400){
            Alert.alert("Chyba", "Chyba serveru.")
        }
        else{
            Alert.alert("Neúspešné priradenie",message)
        }
    }

    async detailPatient(id_doctor, r_doctor, p_doctor, id_p){
        try{
            await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/detail_patient?patient_id=${id_p}&doctor_id=${id_doctor}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Basic '+btoa(`${r_doctor}:${p_doctor}`),
                }),
            }).then(response => response.json()).then(data => {
                this.patient = data.response;
                //console.log(this.patient.patient_name);
                this.setState({uniqueValue: 2})
            });
        }
        catch (error){
            console.error(error);
            this.Messages("Chybná autentifikácia - celkova chyba detail pacient.")
        }
    }

    dataPatient(id_doctor, r_doctor, p_doctor, id_patient){
        console.log(new Date().getDate().toString());
        console.log((new Date().getMonth()+1).toString());
        console.log(new Date().getFullYear().toString());

        this.props.navigation.navigate('DataPatient',{id: id_doctor, r_number: r_doctor, password: p_doctor, id_patient: id_patient})
    }

    backHomeScreen(id_doctor, r_doctor, p_doctor){
        this.props.navigation.navigate('HomeDoctorScreen', {id: id_doctor, r_number: r_doctor, password: p_doctor})
    }

    async removePatient(id_doctor, r_doctor, p_doctor, id_p){
        try{
            await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/remove?patient_id=${id_p}&doctor_id=${id_doctor}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': 'Basic '+btoa(`${r_doctor}:${p_doctor}`),
                }),
            }).then(response => {
                if (response.status === 200) {
                    Alert.alert("Úspech", "Pacient vám bol odobratý.");
                    this.backHomeScreen(id_doctor, r_doctor, p_doctor);
                }
                else {
                    this.Messages(response.status);
                }
            });
        }
        catch (error){
            console.error(error);
            this.Messages("Chyba pri odstraneni pacienta.")
        }
    }


    render(){
        const {id, r_number, password, id_p} = this.props.route.params;
        this.detailPatient(id, r_number, password, id_p);
        return (
            <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', opacity: 1}}>
            <ScrollView style={styles.dataView} >
                <Text style={styles.textStyles} key={this.state.uniqueValue}>Meno:{'\n\t\t\t'}{this.patient.patient_name}</Text>
                <Text style={styles.textStyles} key="surname">Priezvisko:{'\n\t\t\t'}{this.patient.patient_surname}</Text>
                <Text style={styles.textStyles} key="id_number">Rodné číslo:{'\n\t\t\t'}{this.patient.patient_rc}</Text>
                <Text style={styles.textStyles}key="mail">Mail:{'\n\t\t\t'}{this.patient.patient_mail}</Text>
                <TouchableOpacity style={styles.btnStyleleft} onPress = {() => {
                    this.dataPatient(id, r_number, password, id_p);
                }}>
                    <Text>Záznamy o pacientovi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyleleft} onPress={() => this.props.navigation.navigate('RoomScreen')}>
                    <Text>Zavolaj pacientovi</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnStyleleft} onPress = {() => {
                    this.removePatient(id, r_number, password, id_p);
                }}>
                    <Text>Odstráň pacienta</Text>
                </TouchableOpacity>
            </ScrollView>
            </ImageBackground>
        );
    }
}
export default DetailPatient;