import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import EmployeeTabs from './EmployeeTabs';

const Stack = createStackNavigator();

export default function EmployeeStack() {
  return (
    <Stack.Navigator
      initialRouteName='Employees'
    >
      <Stack.Screen name="Employees" component={EmployeeTabs}
        options={{
          title: 'Employees'
        }}
      />
    </Stack.Navigator>
  );
}