import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllEmployees from '../../src/screens/employees/AllEmployees';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function EmployeeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Employees" component={AllEmployees} 
        options={{
          tabBarIcon: () => (
            <Icon name='person' color='#fff' />
          )
        }}
      />
    </Tab.Navigator>
  );
}