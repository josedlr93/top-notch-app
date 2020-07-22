import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContactTabs from './ContactTabs';
import ViewContact from '../../src/screens/contacts/ViewContact';
import UpdateContact from '../../src/screens/contacts/UpdateContact';

const Stack = createStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator
      initialRouteName='Contacts'
    >
      <Stack.Screen name="Contacts" component={ContactTabs}
        options={{
          title: 'Contacts'
        }}
      />
      <Stack.Screen name="ViewContact" component={ViewContact}
        options={{
          title: 'View Contact'
        }}
      />
      <Stack.Screen name="UpdateContact" component={UpdateContact}
        options={{
          title: 'Update Contact'
        }}
      />

    </Stack.Navigator>
  );
}