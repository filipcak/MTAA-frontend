import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/HomeScreen'
import LoginDoctorScreen from './screens/LoginDoctorScreen'
import LoginPatientScreen from './screens/LoginPatientScreen'
import RegisterPatientScreen from './screens/RegisterPatientScreen'
import HomePatientScreen from './screens/HomePatientScreen'
import PatientSugarCalcScreen from './screens/PatientSugarCalcScreen'
import PatientResultScreen from './screens/PatientResultScreen'
import HomeDoctorScreen from "./screens/HomeDoctorScreen";
import AddPatient from './screens/AddPatient';
import DetailPatient from './screens/DetailPatient';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Domov' }}
          />
          <Stack.Screen
            name="LoginPatientScreen"
            component={LoginPatientScreen}
            options={{ title: 'LoginPatientScreen' }}
          />
          <Stack.Screen
            name="LoginDoctorScreen"
            component={LoginDoctorScreen}
            options={{ title: 'Prihlásenie lekára' }}
          />
          <Stack.Screen
            name="RegisterPatientScreen"
            component={RegisterPatientScreen}
            options={{ title: 'Registrácia pacienta'}}
          />
          <Stack.Screen
            name="HomePatientScreen"
            component={HomePatientScreen}
            options={{ title: 'Domov pacient'}}
          />
          <Stack.Screen
            name="PatientSugarCalcScreen"
            component={PatientSugarCalcScreen}
            options={{ title: 'Zadanie cukru'}}
          />
          <Stack.Screen
            name="PatientResultScreen"
            component={PatientResultScreen}
            options={{ title: 'Zadanie cukru'}}
          />
          <Stack.Screen
              name="HomeDoctorScreen"
              component={HomeDoctorScreen}
              options={{ title: 'Lekár'}}
          />
          <Stack.Screen
              name="AddPatient"
              component={AddPatient}
              options={{ title: 'Pridanie pacienta'}}
          />
          <Stack.Screen
              name="DetailPatient"
              component={DetailPatient}
              options={{ title: 'Informácie o pacientovi'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
