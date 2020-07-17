import React from 'react';
import { Text, View } from 'react-native';

import FetchData from '../components/FetchData';

export default function Trucks() {

  const display = ({ item }) => (
    <View>
      <Text>Truck Number: {item.truck_num}</Text>
      <Text>VIN: {item.vin}</Text>
      <Text>CDL Required: {item.cdl_required}</Text>
      <Text>Service Date: {item.service_date}</Text>
    </View>
  )

  return (
    <FetchData requestMethod='GET' endpoint='truck' display={display} />
  );
}