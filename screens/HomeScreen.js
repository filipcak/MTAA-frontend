import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground ,
} from "react-native";

import { styles } from '../styles/styles'

class HomeScreen extends React.Component{ 
  bodyText = "Aplikácia určená pre diabetikov a ich lekárov. Diabetikom vytvára možnosť si zapisovať hladinu cukru v krvi a počítať si potrebné množstvo inzulínu. Lekárom poskytuje údaje o pacientovi. Pre rýchlejšiu a lepšiu komunikáciu.";
  
  render(){
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', opacity: 1}}>
          <Text style={styles.textStyleTitle}>Zdravie diabetikov</Text>
          <Text style={styles.textStyleInfo}>
            Aplikácia určená pre diabetikov a ich lekárov.
          </Text>
          <Text style={styles.textStyleInfo}>
            Umožňuje zapisovanie hladiny cukru v krvi {"\n"}a počítať si potrebné
            množstvo inzulínu.
          </Text>
          <Text style={styles.textStyleInfo}>
            Lekárom poskytuje údaje o pacientovi. {"\n"}Pre rýchlejšiu a lepšiu
            komunikáciu.
          </Text>
            <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('LoginDoctorScreen')}>
              <Text>Prihlásenie lekára</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('LoginPatientScreen')}>
              <Text>Prihlásenie pacienta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('RegisterPatientScreen')}>
              <Text>Registrácia pacienta</Text>
            </TouchableOpacity> 
        </ImageBackground>
      </View>
    );
    }
}
export default HomeScreen;