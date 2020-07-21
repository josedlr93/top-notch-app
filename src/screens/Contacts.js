import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import FetchData from '../components/FetchData';
import { ListItem } from 'react-native-elements';

export default function Contacts({ navigation}) {

  const item = ({item}) => (
    <View>
      <Text>Name: {item.first_name}, {item.last_name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Address: {item.address}</Text>
    </View>
  )

  const display = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => console.log('pressed')}>
      <ListItem
        title={`${item.first_name}, ${item.last_name}`}
        subtitle={`${item.email}`}
        />
    </TouchableHighlight>
  )

  return (
    <FetchData requestMethod='GET' endpoint='contact' display={display} />
  );
}