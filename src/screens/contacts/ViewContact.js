import React, { } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';
import { deleteItem } from '../../services/api';
import confirmDelete from '../../services/confirmDelete';

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
        buttonOneProps={{
          title: 'Update',
          onPress: () => navigation.navigate('Update Contact', { item })
        }}
        buttonTwoProps={{
          title: 'Delete',
          onPress: () => {
            confirmDelete(`${item.first_name}, ${item.last_name}`, () => {
              deleteItem(`contact/${item._id}`)
                .then((json) => alert(json.message))
                .then(() => navigation.goBack())
                .catch(console.error)
            }
            );
          }
        }}
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