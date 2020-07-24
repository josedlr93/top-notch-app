import React from 'react';
import { TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';

import SearchableList from '../../components/SearchableList';

export default function Contacts({ navigation }) {

  const displayAll = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        console.log('pressed');
        navigation.navigate('View Contact', { id: item._id })
      }}>
      <ListItem
        title={`${item.first_name}, ${item.last_name}`}
        subtitle={`${item.email}`}
      />
    </TouchableHighlight>
  )

  return (
    <SearchableList endpoint='contact' display={displayAll} />
  );

}