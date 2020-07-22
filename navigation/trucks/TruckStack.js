import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import TruckTabs from './TruckTabs';

const Stack = createStackNavigator();

export default function TruckStack() {
  return (
    <Stack.Navigator
      initialRouteName='Trucks'
    >
      <Stack.Screen name="Trucks" component={TruckTabs}
        options={{
          title: 'Trucks'
        }}
      />
    </Stack.Navigator>
  );
}