import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ContactTabs from './ContactTabs';
import ViewContact from '../../src/screens/contacts/ViewContact';
import UpdateContact from '../../src/screens/contacts/UpdateContact';

const Stack = createStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator initialRouteName='Contacts' >
      <Stack.Screen name="Contacts" component={ContactTabs} />
      <Stack.Screen name="View Contact" component={ViewContact} />
      <Stack.Screen name="Update Contact" component={UpdateContact} />
    </Stack.Navigator>
  );
}