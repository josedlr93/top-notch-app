import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Themes from './src/Themes';
import Login from './src/screens/Login';
import HomeTabs from './navigation/HomeTabs';
import ContactStack from './navigation/contacts/ContactStack';
import TruckStack from './navigation/trucks/TruckStack';
import EmployeeStack from './navigation/employees/EmployeeStack';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={Themes.TopNotch}>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={HomeTabs}
          options={{
            headerLeft: null
          }}
        />
        <Stack.Screen name='ContactStack' component={ContactStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Trucks' component={TruckStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Employees' component={EmployeeStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}