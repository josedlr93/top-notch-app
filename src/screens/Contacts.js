import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import FetchAll from '../components/FetchAll';
import FetchOne from '../components/FetchOne';
import { ListItem } from 'react-native-elements';

import ButtonGroup from '../components/ButtonGroup';

export default function Contacts({route, navigation }) {
  if (route.params) {
    console.log(route.params.id);
  }
  const displayOne = ({item}) => (
    <View>
      <Text>Name: {item.first_name}, {item.last_name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Address: {item.address}</Text>
      <ButtonGroup 
        buttonOneTitle='Update'
        buttonTwoTitle='Delete'
      />
    </View>
  )

  const displayAll = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        console.log('pressed');
        navigation.navigate('Contacts', {id: item._id})
      }}>
      <ListItem
        title={`${item.first_name}, ${item.last_name}`}
        subtitle={`${item.email}`}
        />
    </TouchableHighlight>
  )

  if (route.params) {
    return (
      <FetchOne requestMethod='GET' endpoint={`contact/${route.params.id}`} display={displayOne} />
    );
  } else {
    return (
      <FetchAll requestMethod='GET' endpoint='contact' display={displayAll} />
    );
  }
}