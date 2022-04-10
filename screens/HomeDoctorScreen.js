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

class HomeDoctorScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            id_doctor: 0
        };
    }
    newFunction(id){
        alert("podarilo sa");
    }
    nepodarilosa(){
        alert("nepodarilo prihlasit");
    }

    addPatient(id_doctor, r_doctor, p_doctor){
        this.props.navigation.navigate('AddPatient',{id: id_doctor, r_number: r_doctor, password: p_doctor})
    }

    render(){
        const {id, r_number, password} = this.props.route.params;
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>Zoznam tvojich pacientov</Text>
                <Text style={styles.textStyle}>in development</Text>
                <TextInput
                    style={styles.btnStyle}
                    placeholder="in development"
                    //onChangeText={(email) => setIdNumber(email)}
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
export default HomeDoctorScreen;