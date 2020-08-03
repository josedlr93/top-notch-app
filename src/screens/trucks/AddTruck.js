import React from 'react';

import TruckForm from './TruckForm';

export default function AddTruck({ route, navigation }) {
  return (
    <TruckForm
      requestMethod='POST'
      endpoint={`truck`}
      params={route.params}
      redirect={(item) => {
        navigation.replace('View Truck', { item })
      }}
      navigation={navigation}
    />
  )
};