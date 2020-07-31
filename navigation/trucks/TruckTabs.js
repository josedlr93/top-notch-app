import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllTrucks from '../../src/screens/trucks/AllTrucks';

const Tab = createBottomTabNavigator();

export default function TruckTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trucks" component={AllTrucks} />
    </Tab.Navigator>
  );
}