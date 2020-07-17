import React from 'react';
import { Text, View } from 'react-native';

import FetchData from '../components/FetchData';

export default function Contacts() {

  const display = ({ item }) => (
    <View>
      <Text>Name: {item.first_name}, {item.last_name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Address: {item.address}</Text>
    </View>
  )

return (
    <FetchData requestMethod='GET' endpoint='contact' display={display}/>
  );
}