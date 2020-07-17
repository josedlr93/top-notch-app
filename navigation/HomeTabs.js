import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Schedule from '../src/screens/Schedule';
import Directories from '../src/screens/Directories';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Directories" component={Directories} />
    </Tab.Navigator>
  );
}