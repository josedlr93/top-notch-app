import React from 'react';

import TruckForm from './TruckForm';

export default function AddContact({ route, navigation }) {
  return (
    <TruckForm
      requestMethod='POST'
      endpoint={`contact`}
      params={route.params}
      redirect={(item) => {
        navigation.replace('View Contact', { item })
      }}
      navigation={navigation}
    />
  )
};