import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Directories from '../../src/screens/home/Directories';
import Schedule from '../../src/screens/home/Schedule';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Schedule" component={Schedule}
        options={{
          tabBarIcon: () => (
            <Icon name='schedule' color='#fff' />
          )
        }}
      />
      <Tab.Screen name="Directories" component={Directories}
        options={{
          tabBarIcon: () => (
            <Icon name='list' color='#fff' />
          )
        }}
      />
    </Tab.Navigator>
  );
}