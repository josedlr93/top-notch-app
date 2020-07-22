import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Employees from '../../src/screens/employees/Employees';

const Tab = createBottomTabNavigator();

export default function EmployeeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Employees" component={Employees} />
    </Tab.Navigator>
  );
}