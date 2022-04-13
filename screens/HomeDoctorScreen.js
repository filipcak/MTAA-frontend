import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    FlatList
} from "react-native";

import { styles } from '../styles/styles'
import {encode as btoa} from "base-64";

class HomeDoctorScreen extends React.Component{
    constructor(props) {
        super(props);
    }
    state ={
        data : []
    };
    patients = [{"id_number": "1234/23"}]

    Messages(message){
        Alert.alert("nieco",message)
    }

    addPatient(id_doctor, r_doctor, p_doctor){
        this.props.navigation.navigate('AddPatient',{id: id_doctor, r_number: r_doctor, password: p_doctor})
    }

    detailPatient(id_doctor, r_doctor, p_doctor, id_patient){
        this.props.navigation.navigate('DetailPatient', {id: id_doctor, r_number: r_doctor, password: p_doctor, id_p: id_patient})
    }

    async getPatients(id_doctor, r_doctor, p_doctor) {
        try {
            await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/get_patients/${id_doctor}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Basic ' + btoa(`${r_doctor}:${p_doctor}`),
                }),
            }).then(response => response.json()).then(data => {
                this.patients = data.patients;
                this.setState({data: data.patients});
            });
        } catch (error) {
            console.error(error);
            this.Messages("Chybná autentifikácia.")
        }
    }

    // render table with pacients
    renderTable(arr, d_id, d_rn, d_p) {
        return arr.map(({ id_number, id_patient }) => {
            return (
                <View>
                    <TouchableOpacity onPress = {() => {
                        this.detailPatient(d_id, d_rn, d_p, id_patient);
                    }}>
                        <Text key={id_patient}>{id_number} </Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }

    render(){
        const {id, r_number, password} = this.props.route.params;
        this.getPatients(id, r_number, password);
        return (
            <View style={styles.dataView}>
                <Text style={styles.textStyles}>Zoznam tvojich pacientov</Text>
                <Text style={styles.textStyles}>Rodné číslo</Text>
                <View style={styles.textStyles}>
                    {this.renderTable(this.state.data, id, r_number, password)}
                </View>

                <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                    this.addPatient(id, r_number, password);
                }}>
                    <Text>Pridaj pacienta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default HomeDoctorScreen;