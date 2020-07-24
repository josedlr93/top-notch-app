import React, { } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';

export default function ViewContacts({ route, navigation }) {
  const item = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text>Name: </Text>
        <Text>{item.first_name}, {item.last_name}</Text>
      </View>
      <View style={styles.line}>
        <Text>Email: </Text>
        <Text>{item.email}</Text>
      </View>
      <View style={styles.line}>
        <Text>Phone: </Text>
        <Text>{item.phone}</Text>
      </View>
      <View style={styles.line}>
        <Text>Address: </Text>
        <Text>{item.address}</Text>
      </View>
      <ButtonGroup
        buttonOneTitle='Update'
        buttonOnePress={() => navigation.navigate('Update Contact', { item })}
        buttonTwoTitle='Delete'
        buttonTwoPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  line: {
    flexDirection: 'row'
  }
});