import React from 'react';

import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import AddJob from '../../src/screens/home/AddJob';
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator mode='modal' >
      <Stack.Screen name='Home Tabs' component={HomeTabs}
        options={({ route, navigation }) => ({
          headerTitle: 'Home',
          headerLeft: null,
          headerRight: () => {
            if (getFocusedRouteNameFromRoute(route) === 'Schedule') {
              return (
                <Icon
                  color='#fff'
                  name='add-circle-outline'
                  containerStyle={{
                    marginRight: 15
                  }}
                  onPress={() => navigation.navigate('Add Job')}
                />
              )
            } else {
              return null;
            }
          }
        })}
      />
      <Stack.Screen name='Add Job' component={AddJob} />
    </Stack.Navigator>
    
  );
}