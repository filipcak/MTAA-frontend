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
} from "react-native";

import { styles } from '../styles/styles'

class DataPatient extends React.Component{
    constructor(props) {
        super(props);
    }
    indevelopment(){
        Alert.alert("in development", "pracuje sa na tom");
    }

    render(){
        const {id, r_number, password, id_p} = this.props.route.params;
        return (
            <View style={styles.dataView} >
                <Text key="mail">IN DEVELOPMENT</Text>
                <TouchableOpacity style={styles.btnStyleleft} onPress = {() => {
                    this.indevelopment();
                }}>
                    <Text>in development</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default DataPatient;