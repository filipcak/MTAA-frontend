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


class PatientResultScreen extends React.Component{
    constructor(props) {
        super(props);

      }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.textStyleInfo}>
                    Výsledok zobrazuje odporúčanú dávku inzulínu pre teba. {"\n"} Výsledok je zadaný v ml.
                </Text>

                <Text style={styles.textStyle}>
                    Potrebná dávka inzulínu:
                </Text>
                
                <Text style={styles.btnStyle}>
                    {this.props.route.params.insulin_dose}
                </Text>

                <View style={{flexDirection: 'row'}}>
                    <Text style={{flex:1, flexWrap: 'wrap', fontSize: 15, marginLeft: 40, marginRight: 40, marginTop: 20}}>
                        {this.props.route.params.body}
                    </Text>
                </View>
                
            </View>
        );
    }
}
export default PatientResultScreen;