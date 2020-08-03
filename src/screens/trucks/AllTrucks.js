import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'

import SearchableList from '../../components/SearchableList';
import { getItems } from '../../services/api';

export default function AllTrucks({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getItems('truck')
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        })
        .finally(() => setLoading(false));

      return () => { setLoading(true) }
    }, [],
    )
  );

  const formats = {
    itemData(item) {
      return `${item.truck_num}`;
    },
    title(item) {
      return `Truck ${item.truck_num}`;
    },
    subtitle(item) {
      return item.cdl_required ? `CDL required` : `CDL not required`;
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : error ? <Text>Error</Text> : (
        <SearchableList
          data={data}
          formats={formats}
          handleSelected={(item) => navigation.navigate('View Truck', { item })}
        />
      )}
    </View>
  );

}