import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllContacts from '../../src/screens/contacts/AllContacts';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default function ContactTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contacts" component={AllContacts} 
        options={{
          tabBarIcon: () => (
            <Icon name='contacts' color='#fff'/>
          )
        }}
      />
    </Tab.Navigator>
  );
}