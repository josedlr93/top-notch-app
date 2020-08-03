import React from 'react';

import ContactForm from './ContactForm';

export default function UpdateContact({ route, navigation }) {
  return (
    <ContactForm 
      requestMethod='PUT'
      endpoint={`contact/${route.params.item._id}`}
      params={route.params} 
      redirect={(item) => navigation.navigate('View Contact', { item })}
      navigation={navigation}
    />
  )
};