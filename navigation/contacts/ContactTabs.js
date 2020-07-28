import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllContacts from '../../src/screens/contacts/AllContacts';
import AddContact from '../../src/screens/contacts/AddContact';

const Tab = createBottomTabNavigator();

export default function ContactTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Contacts" component={AllContacts} />
      <Tab.Screen name='Add Contact' component={AddContact} />
    </Tab.Navigator>
  );
}