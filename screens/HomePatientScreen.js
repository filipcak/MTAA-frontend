import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LogBox } from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {decode as atob, encode as btoa} from 'base-64'
import blankImage from '../images/emptyProfile.png';
import { launchImageLibrary } from 'react-native-image-picker';


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

class LoginPatientScreen extends React.Component{
  constructor(props) {
    super(props);
    this.checkIfDataActual();
    this.state={
      btnColor:"#000",
      id_patient: "",
      id_number: "",
      password: "",    
      image: Image.resolveAssetSource(blankImage).uri,
      photo: null,
      setPhoto: null
    }
  }

  createFormData (photo, body = {}) {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });
    return data;
  };


  handleChoosePhoto (setPhoto){
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
          if (response.assets[0].fileSize > 6000000) {
              Alert.alert('Chyba', 'Fotka je moc velká.');
          } else if(response.assets[0].type != "image/png" && response.assets[0].type != "image/jpg" && response.assets[0].type != "image/jpeg"){
              Alert.alert('Chyba', 'Súbor nie je fotka.');
          }
          else {
              this.putPhoto(response);
          }
      }
    });
  };

  date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkIfDataActual();
      this.getPhoto();
    });
  }

  processResponse(imageBlob, status){
    if (status == 200){
      let fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(imageBlob); 
      fileReaderInstance.onload = () => {
      let base64data = fileReaderInstance.result;                
      //console.log(base64data);
      this.setState({image: base64data})
    }
    }
  }

  async getPhoto(){
    try{
        const {id_patient, r_number, password} = this.props.route.params;
        const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/photo_patient/${id_patient}`, {
        method: 'GET',
        headers: new Headers({ 
            'Authorization': 'Basic '+btoa(`${r_number}:${password}`),          
        }),
        }).then(response => {return Promise.all([response.status, response.blob()])}).then(result => {
          this.processResponse(result[1], result[0])})
    }catch (error){
        alert(error);
    } 
}

  async putPhoto(image){
    try{
      const {id_patient, r_number, password} = this.props.route.params;
      const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/photo_update`, {
        body: this.createFormData(image.assets[0], { patient_id: `${id_patient}` }),
        method: 'PUT',
        headers: new Headers({
          'Authorization': 'Basic '+btoa(`${r_number}:${password}`),
          'Content-Type': 'multipart/form-data',
        }),
      }).then(response => {
        if (response.status == 200){
          Alert.alert('Úspech', 'Úspešne nahratá fotka');
          this.getPhoto();
        }
        else {
          Alert.alert('Neúspech', 'neúspešne nahratá fotka, skúste ešte raz');
        }
      })
    }catch (error){
      Alert.alert('Neúspech', 'chyba v aplikácii')
    }
  }

  Messages(message){
    if (message === 200){
      this.setState({btnColor: "#0F0"});
    }
    else if (message === 204){
      this.setState({btnColor: "#F00"});
    }else if(message === 400){
      alert("Nespravne udaje")
    }
    else if (message === 401){
      alert("Nespravna autentifikacia")
    }else{
      alert("Ina chyba")
    }
}

  async checkIfDataActual(){
    try{
        const {id_patient, r_number, password} = this.props.route.params;
        const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/check_status?patient_id=${id_patient}&date=${this.date}`, {
        method: 'GET',
        headers: new Headers({ 
            "Content-Type": "application/json",
            'Authorization': 'Basic '+btoa(`${r_number}:${password}`),          
        }),
        }).then(response => this.Messages(response.status));         
    }catch (error){
        alert(error);
    } 
}

  render(){
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', opacity: 1}}>
          <View style={{justifyContent: 'space-between', marginRight:10, marginTop:10, flexDirection:'row'}}>
            <Image source={{uri: this.state.image}} style={{ borderRadius: 100, marginLeft: 20, marginTop: 20, maxWidth: 120,  maxHeight: 120, minHeight: 120, minWidth: 120, flex: 1 }}/>
            <Text style={{marginRight: 10, marginTop: 20}}>
              <Icon name="bell" size={40} color={this.state.btnColor} />
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', marginLeft: 20, top: 15}}>
          <TouchableOpacity style={styles.btnUpload} onPress= {() => this.handleChoosePhoto(this.state.setPhoto)}>
            <Text>Nahraj fotku</Text>
          </TouchableOpacity>
          </View>

          <View style={{top: 20}}>
            <TouchableOpacity style={styles.btnHome} onPress= {() => this.props.navigation.navigate('PatientCarbohydratesScreen')}>
              <Text>Idem jesť</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('PatientSugarCalcScreen', {cabohydrates: 0, tag: 0})}>
              <Text>Vypočítaj inzulín</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnHome} onPress={() => this.props.navigation.navigate('PatientSendSugarScreen', {id_patient: this.props.route.params.id_patient, 
              r_number: this.props.route.params.r_number, password: this.props.route.params.password})}>
              <Text>Zapíš hodnotu cukru</Text>
            </TouchableOpacity>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginRight: 40}}>
              <Text></Text>
              <TouchableOpacity style={styles.btnCall} onPress={() => this.props.navigation.navigate('RoomScreen')}>
                <Text>Zavolaj doktorovi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        
      </View>
    );
  }
}
export default LoginPatientScreen;