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
} from "react-native";

import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) { 
  const bodyText = "Aplikácia určená pre diabetikov a ich lekárov. Diabetikom vytvára možnosť si zapisovať hladinu cukru v krvi a počítať si potrebné množstvo inzulínu. Lekárom poskytuje údaje o pacientovi. Pre rýchlejšiu a lepšiu komunikáciu.";

  return (
    <View style={styles.container}>
      <Text style={styles.textStyleTitle}>Zdravie diabetikov</Text>
      <Text style={styles.textStyle}>
        Aplikácia určená pre diabetikov a ich lekárov.
      </Text>
      <Text style={styles.textStyle}>
        Umožňuje zapisovanie hladiny cukru v krvi {"\n"}a počítať si potrebné
        množstvo inzulínu.
      </Text>
      <Text style={styles.textStyle}>
        Lekárom poskytuje údaje o pacientovi. {"\n"}Pre rýchlejšiu a lepšiu
        komunikáciu.
      </Text>
      <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('LoginDoctor')}>
        <Text>Prihlásenie lekára</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('LoginPatient')}>
        <Text>Prihlásenie pacienta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate('RegisterPatient')}>
        <Text>Registrácia pacienta</Text>
      </TouchableOpacity>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    marginTop: 10,
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 15,
  },
  textStyleTitle: {
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 35,
    bottom: 30
  },
  btnStyle: {
    width: "80%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00BFFF",
  },
  
 
  inputView: {
    backgroundColor: "#00BFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});