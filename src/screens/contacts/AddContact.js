import React from 'react';

import ContactForm from './ContactForm';

export default function UpdateContact({ route, navigation }) {
  return (
    <ContactForm
      requestMethod='POST'
      endpoint={`contact`}
      params={route.params}
      redirect={(item) => navigation.navigate('View Contact', { item })}
      navigation={navigation}
    />
  )
};