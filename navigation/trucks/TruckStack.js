import React from 'react';

import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import TruckTabs from './TruckTabs';
import ViewTruck from '../../src/screens/trucks/ViewTruck';
import AddTruck from '../../src/screens/trucks/AddTruck';


const Stack = createStackNavigator();

export default function TruckStack() {
  return (
    <Stack.Navigator mode='modal' >
      <Stack.Screen name="Trucks" component={TruckTabs}
        options={({ route, navigation }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
          headerRight: () => (
            <Icon
              color='#fff'
              name='add-circle-outline'
              containerStyle={{
                marginRight: 15
              }}
              onPress={() => navigation.navigate('Add Truck')}
            />
          )
        })}
      /> 
      <Stack.Screen name="View Truck" component={ViewTruck} />
      <Stack.Screen name='Add Truck' component={AddTruck} />
      {/* <Stack.Screen name="Update Truck" component={UpdateTruck} /> */}
    </Stack.Navigator>
  );
}