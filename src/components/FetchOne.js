import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

// Environment variables
import getEnvVars from '../../environment';
const { apiUrl } = getEnvVars();

export default function FetchOne(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  var requestOptions = {
    method: props.requestMethod,
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(`${apiUrl}${props.endpoint}`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setData([json])
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator /> : error ? <Text>Error</Text> : (
        <FlatList
          data={data}
          keyExtractor={({ _id }, index) => _id}
          renderItem={props.display}
        />
      )}
    </View>
  );
}