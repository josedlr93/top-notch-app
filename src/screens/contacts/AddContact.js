import React from 'react';

import ContactForm from './ContactForm';

export default function AddContact({ route, navigation }) {
  return (
    <ContactForm
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