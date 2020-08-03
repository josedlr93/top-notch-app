import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllTrucks from '../../src/screens/trucks/AllTrucks';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function TruckTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trucks" component={AllTrucks} 
        options={{
          tabBarIcon: () => (
            <Icon name='local-shipping' color='#fff' />
          )
        }}
      />
    </Tab.Navigator>
  );
}