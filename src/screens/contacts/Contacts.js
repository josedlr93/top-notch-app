import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';

import SearchableList from '../../components/SearchableList';
import { getItems } from '../../services/api';

export default function Contacts({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getItems('contact')
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const formats = {
    itemData(item){
      return `${item.first_name.toUpperCase()} ${item.last_name.toUpperCase()}`;
    },
    title(item){
      return `${item.first_name}, ${item.last_name}`;
    },
    subtitle(item){
      return `${item.email}`;
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : error ? <Text>Error</Text> : (
        <SearchableList 
          endpoint='contact' 
          data={data}
          formats={formats}
          selected={(id) => navigation.navigate('View Contact', { id })}
        />
      )}
    </View>
  );

}