import React from 'react';
import { TouchableHighlight, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function TouchableList({list}) {
  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        item.navigate();
      }}>
      <ListItem
        title={item.title}
        chevron={true}
      />
    </TouchableHighlight>
  )
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem}
    />
  );
}