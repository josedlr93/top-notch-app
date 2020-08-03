import React, { } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';
import { deleteItem } from '../../services/api';
import confirmDelete from '../../services/confirmDelete';

export default function ViewContacts({ route, navigation }) {
  const item = route.params.item;

  return (
    <View style={styles.container}>
      <Input label='Name'
        disabled={true}
        value={`${item.first_name}, ${item.last_name}`}
      />
      <Input label='Email'
        disabled={true}
        value={item.email}
      />
      <Input label='Phone Number'
        disabled={true}
        value={item.phone}
      />
      <Input label='Address'
        disabled={true}
        value={item.address}
      />
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