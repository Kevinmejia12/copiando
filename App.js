import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './pantallas/Inicio';
import NuevoCliente from './pantallas/NuevoCliente';
import DetallesCliente from './pantallas/DetallesCliente';

const Stack = createStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown:false}}
      >
        <Stack.Screen 
        name='Inicio'
        component={Inicio}
        />
        <Stack.Screen 
        name='NuevoCliente'
        component={NuevoCliente}
        />
        <Stack.Screen 
        name='DetallesCliente'
        component={DetallesCliente}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  
});

export default App;
