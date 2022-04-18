import React, { useState } from "react";
import moment from 'moment';
import {decode as atob, encode as btoa} from 'base-64'
import {
    RefreshControl,
    StyleSheet,
    Text,
    ScrollView,
    View,
    table,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import { styles } from '../styles/styles'

class DataPatient extends React.Component{
    constructor(props) {
        super(props);

        this.date = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
        this.getDataPatient();

    }

    state = {
        records: [{date: 5, morning: 6, lunch: 7, evening: 8}],

        tableHead: ['Dátum', 'Ráno', 'Obed', 'Večera'],

    }
    


    toList(records){
        this.setState({records: records})
    }


    async getDataPatient(){
        try{
            const {id, r_number, password, id_patient} = this.props.route.params;

            const response = await fetch(`https://mtaa-backend-pscpu.ondigitalocean.app/data_patient?patient_id=
            ${id_patient}&date=${this.date}&num_of_records=${1000}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", 
            'Authorization': 'Basic '+btoa(`${r_number}:${password}`)}
            }).then(response => response.json()).then(data => {
                this.toList(data.response);
              })
        } catch (error){
            alert("Chyba na strane serveru");
        } 
    }

    render(){       
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < this.state.records.length; i += 1) {
            const rowData = [];

            rowData.push(`${this.state.records[i].date}`)
            rowData.push(`${this.state.records[i].morning}`)
            rowData.push(`${this.state.records[i].lunch}`)
            rowData.push(`${this.state.records[i].evening}`)

            tableData.push(rowData);
        }
        return (
            <ImageBackground source={require('../images/background.png')} style={{width: '100%', height: '100%', opacity: 1}}>

            <View style={{ flex: 1, padding: 15, paddingTop: 0}}>
                    <Text style={styles.textStyleData} >{'\n'}Pacientové záznamy{'\n'}</Text>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data={state.tableHead} widthArr={state.widthArr} style={{ height: 50, backgroundColor: '#00BFFF' , textAlign: 'center'}} 
                        textStyle={{ textAlign: 'center', fontWeight: '100' }}/>
                    </Table>
                    <ScrollView style={{ marginTop: -1 }}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {
                        tableData.map((rowData, index) => (
                            <Row
                            key={index}
                            data={rowData}
                            widthArr={state.widthArr}
                            style={[{ height: 40, backgroundColor: '#E7E6E1' }, index%2 && {backgroundColor: '#F7F6E7'}]}
                            textStyle={{ textAlign: 'center', fontWeight: '100' }}
                            />
                        ))
                        }
                        </Table>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}
export default DataPatient;