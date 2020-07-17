import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Contacts from '../src/screens/Contacts';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contacts" component={Contacts} />
    </Tab.Navigator>
  );
}