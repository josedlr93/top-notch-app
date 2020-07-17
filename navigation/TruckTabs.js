import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trucks from '../src/screens/Trucks';

const Tab = createBottomTabNavigator();

export default function TruckTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trucks" component={Trucks} />
    </Tab.Navigator>
  );
}