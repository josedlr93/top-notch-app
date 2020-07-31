import React, { useState } from 'react';
import { TouchableHighlight, FlatList, View } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';

export default function SearchableList(props) {
  const [data, setData] = useState(props.data);
  const [search, setSearch] = useState('');

  const searchFilter = text => {
    setSearch(text);

    const newData = props.data.filter(item => {
      const itemData = props.formats.itemData(item)
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
  };

  const header = (
    <SearchBar
      placeholder='Search...'
      lightTheme
      round
      onChangeText={text => searchFilter(text)}
      autoCorrect={false}
      value={search}
    />
  );

  const separator = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
        marginLeft: "0%"
      }}
    />
  )

  const listItems = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        console.log('pressed');
        props.handleSelected(item)
      }}>
      <ListItem
        title={props.formats.title(item)}
        subtitle={props.formats.subtitle(item)}
      />
    </TouchableHighlight>
  )

  return (
    <FlatList
      data={data}
      keyExtractor={({ _id }, index) => _id}
      renderItem={listItems}
      ListHeaderComponent={header}
      ItemSeparatorComponent={separator}
    />
  );
}