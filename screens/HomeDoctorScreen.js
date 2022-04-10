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

    detailPatient(id_doctor, r_doctor, p_doctor){
        this.props.navigation.navigate('DetailPatient', {id: id_doctor, r_number: r_doctor, password: p_doctor})
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


    render(){
        const {id, r_number, password} = this.props.route.params;
        this.getPatients(id, r_number, password);
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Zoznam tvojich pacientov</Text>
                    <FlatList style={styles.textStyleInfo}
                              data={this.state.data}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item}) => <Text>{item.id_number}</Text>}
                        />
                <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                    this.addPatient(id, r_number, password);
                }}>
                    <Text>Pridaj pacienta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                    this.detailPatient(id, r_number, password);
                }}>
                    <Text>Detail Pacienta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default HomeDoctorScreen;