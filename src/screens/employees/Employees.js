import React from 'react';
import { Text, View } from 'react-native';

import SearchableList from '../../components/SearchableList';

export default function Employees() {

  const display = ({ item }) => (
    <View>
      <Text>Name: {item.first_name}, {item.last_name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Address: {item.address}</Text>
      <Text>CDL: {item.has_CDL}</Text>
    </View>
  )

  return (
    <SearchableList endpoint='employee' display={display} />
  );
}