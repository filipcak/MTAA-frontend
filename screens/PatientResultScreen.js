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
  ImageBackground ,
} from "react-native";

import { styles } from '../styles/styles'


class PatientResultScreen extends React.Component{
    constructor(props) {
        super(props);

      }

    returnHome(){
        
        if (this.props.route.params.tag == 0){
            this.props.navigation.goBack();
            this.props.navigation.goBack();
        }
            
        else if (this.props.route.params.tag == 1){
            this.props.navigation.goBack();
            this.props.navigation.goBack();
            this.props.navigation.goBack();
        }
            

        
    }

    render(){
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', opacity: 1}}>
                    <Text style={styles.textStyleInfo}>
                        Výsledok zobrazuje odporúčanú dávku inzulínu pre teba. {"\n"} Výsledok je zadaný v ml.
                    </Text>

                    <Text style={{fontSize: 20, marginLeft: 40, marginTop: 20, fontWeight: 'bold'}}>
                        Potrebná dávka inzulínu:
                    </Text>
                    
                    <Text style={styles.sugarResultText}>
                        {this.props.route.params.insulin_dose}
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{flex:1, flexWrap: 'wrap', fontSize: 20, marginLeft: 40, marginRight: 40, marginTop: 20}}>
                            {this.props.route.params.body}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.btnStyleRegLog} onPress = {() => {
                        this.returnHome();
                    }}>
                        <Text>Späť</Text>
                    </TouchableOpacity>
                </ImageBackground>
                
            </View>
        );
    }
}
export default PatientResultScreen;