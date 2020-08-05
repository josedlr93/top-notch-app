import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Themes from './src/Themes';
import Login from './src/screens/home/Login';
import HomeStack from './navigation/home/HomeStack';
import ContactStack from './navigation/contacts/ContactStack';
import TruckStack from './navigation/trucks/TruckStack';
import EmployeeStack from './navigation/employees/EmployeeStack';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false
}

export default function App() {
  return (
    <NavigationContainer theme={Themes.TopNotch}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={HomeStack}
          options={screenOptions}
        />
        <Stack.Screen name='ContactStack' component={ContactStack}
          options={screenOptions}
        />
        <Stack.Screen name='TruckStack' component={TruckStack}
          options={screenOptions}
        />
        <Stack.Screen name='EmployeeStack' component={EmployeeStack}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}