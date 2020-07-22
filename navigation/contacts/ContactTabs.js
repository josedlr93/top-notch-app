import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Contacts from '../../src/screens/contacts/Contacts';
import AddContact from '../../src/screens/contacts/AddContact';

const Tab = createBottomTabNavigator();

export default function ContactTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name='AddContact' component={AddContact} />
    </Tab.Navigator>
  );
}