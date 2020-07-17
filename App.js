import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTabs from './navigation/HomeTabs';
import ContactTabs from './navigation/ContactTabs';
import TruckTabs from './navigation/TruckTabs';
import EmployeeTabs from './navigation/EmployeesTabs';

import Login from './src/screens/Login';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login'}}
        />
        <Stack.Screen
          name="Home"
          options={{ 
            title: 'Home', 
            headerLeft: null
          }}
          component={HomeTabs}
        />
        <Stack.Screen
          name="Contacts"
          options={{ title: 'Contacts' }}
          component={ContactTabs}
        />
        <Stack.Screen
          name="Trucks"
          component={TruckTabs}
          options={{ title: 'Trucks' }}
        />
        <Stack.Screen
          name="Employees"
          component={EmployeeTabs}
          options={{ title: 'Employees' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}