import React from 'react';
import { Text, View } from 'react-native';

import FetchOne from '../../components/FetchOne';
import ButtonGroup from '../../components/ButtonGroup';

export default function ViewContacts({ route, navigation }) {
  if (route.params) {
    console.log(route.params.id);
  }
  const displayOne = ({ item }) => (
    <View>
      <Text>Name: {item.first_name}, {item.last_name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Address: {item.address}</Text>
      <ButtonGroup
        buttonOneTitle='Update'
        buttonOnePress={() => navigation.navigate('UpdateContact')}
        buttonTwoTitle='Delete'
      />
    </View>
  )

    return (
      <FetchOne requestMethod='GET' endpoint={`contact/${route.params.id}`} display={displayOne} />
    );
}