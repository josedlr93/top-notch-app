import React from 'react';

import JobForm from './JobForm';

export default function AddJob({ route, navigation }) {
  return (
    <JobForm
      requestMethod='POST'
      endpoint={`job`}
      params={route.params}
      redirect={(item) => {
        navigation.replace('Schedule', { item })
      }}
      navigation={navigation}
    />
  )
};