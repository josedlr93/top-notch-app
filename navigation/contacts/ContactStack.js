import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ContactTabs from './ContactTabs';
import ViewContact from '../../src/screens/contacts/ViewContact';
import UpdateContact from '../../src/screens/contacts/UpdateContact';

const Stack = createStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contacts" component={ContactTabs}
        options={({ route }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
        })}
      />
      <Stack.Screen name="View Contact" component={ViewContact} />
      <Stack.Screen name="Update Contact" component={UpdateContact} />
    </Stack.Navigator>
  );
}