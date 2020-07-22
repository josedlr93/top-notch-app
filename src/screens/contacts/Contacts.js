import React from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';

import FetchAll from '../../components/FetchAll';

export default function Contacts({ route, navigation }) {

  const displayAll = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        console.log('pressed');
        navigation.navigate('ViewContact', { id: item._id })
      }}>
      <ListItem
        title={`${item.first_name}, ${item.last_name}`}
        subtitle={`${item.email}`}
      />
    </TouchableHighlight>
  )

  return (
    <FetchAll requestMethod='GET' endpoint='contact' display={displayAll} />
  );

}