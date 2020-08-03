import React from 'react';

import TruckForm from './TruckForm';

export default function UpdateTruck({ route, navigation }) {
  return (
    <TruckForm
      requestMethod='PUT'
      endpoint={`truck/${route.params.item._id}`}
      params={route.params}
      redirect={(item) => navigation.navigate('View Truck', { item })}
      navigation={navigation}
    />
  )
};