import React from 'react';

import EmployeeForm from './EmployeeForm';

export default function AddEmployee({ route, navigation }) {
  return (
    <EmployeeForm
      requestMethod='POST'
      endpoint={`employee`}
      params={route.params}
      redirect={(item) => {
        navigation.replace('View Employee', { item })
      }}
      navigation={navigation}
    />
  )
};