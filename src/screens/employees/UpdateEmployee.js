import React from 'react';

import EmployeeForm from './EmployeeForm';

export default function UpdateEmployee({ route, navigation }) {
  return (
    <EmployeeForm
      requestMethod='PUT'
      endpoint={`employee/${route.params.item._id}`}
      params={route.params}
      redirect={(item) => navigation.navigate('View Employee', { item })}
      navigation={navigation}
    />
  )
};