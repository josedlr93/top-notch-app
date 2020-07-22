import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

// Environment variables
import getEnvVars from '../../environment';
const { apiUrl } = getEnvVars();

export default function FetchAll(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(null);
  const [originalData, setOriginalData] = useState([]);

  var requestOptions = {
    method: props.requestMethod,
    redirect: 'follow'
  };
  
  useEffect(() => {
    fetch(`${apiUrl}${props.endpoint}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        setOriginalData(json);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const searchFilter = text => {
    setSearch(text);

    const newData = originalData.filter(item => {
      const itemData = `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()}`;
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

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : error ? <Text>Error</Text> : (
        <FlatList
          data={data}
          keyExtractor={({ _id }, index) => _id}
          renderItem={props.display}
          ListHeaderComponent={header}
          ItemSeparatorComponent={separator}
        />
      )}
    </View>
  );
}