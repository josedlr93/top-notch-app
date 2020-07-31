import React from 'react';
import { Text, View } from 'react-native';

import SearchableList from '../../components/SearchableList';

export default function AllTrucks() {

  const display = ({ item }) => (
    <View>
      <Text>Truck Number: {item.truck_num}</Text>
      <Text>VIN: {item.vin}</Text>
      <Text>CDL Required: {item.cdl_required}</Text>
      <Text>Service Date: {item.service_date}</Text>
    </View>
  )

  return (
    <SearchableList endpoint='truck' display={display} />
  );
}