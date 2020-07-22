import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import HomeTabs from './navigation/HomeTabs';
import ContactStack from './navigation/contacts/ContactStack';
import TruckStack from './navigation/trucks/TruckStack';
import EmployeeStack from './navigation/employees/EmployeeStack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Login'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7a003c'
          },
          headerTitleStyle: {
            color: '#fff'
          }
        }}
      >
        <Stack.Screen name="Login" component={Login}
          options={{ 
            title: 'Login'
          }}
        />
        <Stack.Screen name="Home" component={HomeTabs}
          options={{ 
            title: 'Home', 
            headerLeft: null
          }}
        />
        <Stack.Screen name="Contacts" component={ContactStack}
          options={{ 
            title: 'Contacts' 
          }}
        />
        <Stack.Screen name="Trucks" component={TruckStack}
          options={{ 
            title: 'Trucks' 
          }}
        />
        <Stack.Screen name="Employees" component={EmployeeStack}
          options={{ 
            title: 'Employees' 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}