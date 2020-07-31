import React from 'react';

import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ContactTabs from './ContactTabs';
import ViewContact from '../../src/screens/contacts/ViewContact';
import UpdateContact from '../../src/screens/contacts/UpdateContact';
import AddContact from '../../src/screens/contacts/AddContact';

const Stack = createStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator mode='modal'>
      <Stack.Screen name="Contacts" component={ContactTabs}
        options={({ route, navigation }) => ({
          headerTitle: getFocusedRouteNameFromRoute(route),
          headerRight: () => (
            <Icon 
              color='#fff'
              name='add-circle-outline'
              containerStyle={{
                marginRight: 15
              }}
              onPress={() => navigation.navigate('Add Contact')}
            />
          )
        })}
      /> 
      <Stack.Screen name='Add Contact' component={AddContact} />
      <Stack.Screen name="View Contact" component={ViewContact} />
      <Stack.Screen name="Update Contact" component={UpdateContact} />
    </Stack.Navigator>
  );
}