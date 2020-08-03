import React from 'react';

import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import EmployeeTabs from './EmployeeTabs';
import AddEmployee from '../../src/screens/employees/AddEmployee';
import ViewEmployee from '../../src/screens/employees/ViewEmployee';
import UpdateEmployee from '../../src/screens/employees/UpdateEmployee';

const Stack = createStackNavigator();

export default function EmployeeStack() {
  return (
    <Stack.Navigator mode='modal' >
      <Stack.Screen name="Employees" component={EmployeeTabs}
        options={({ route, navigation }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
          headerRight: () => (
            <Icon
              color='#fff'
              name='add-circle-outline'
              containerStyle={{
                marginRight: 15
              }}
              onPress={() => navigation.navigate('Add Employee')}
            />
          )
        })}
      />
      <Stack.Screen name='Add Employee' component={AddEmployee} />
      <Stack.Screen name="View Employee" component={ViewEmployee} />
      <Stack.Screen name="Update Employee" component={UpdateEmployee} />
    </Stack.Navigator>
  );
}