import React, { } from 'react';
import { View, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Text, Input } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';
import { deleteItem } from '../../services/api';
import confirmDelete from '../../services/confirmDelete';

export default function ViewEmployee({ route, navigation }) {
  const item = route.params.item;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <Input label='Phone Number (2)'
          disabled={true}
          value={item.alt_phone}
        />
        <Input label='Address'
          disabled={true}
          value={item.address}
        />
        <Input label='Has CDL?'
          disabled={true}
          value={item.has_CDL ? 'Yes' : 'No'}
        />
        <Input label='Admin?'
          disabled={true}
          value={item.admin ? 'Yes' : 'No'}
        />
      </ScrollView>
      <ButtonGroup
        buttonOneProps={{
          title: 'Update',
          onPress: () => navigation.navigate('Update Employee', { item })
        }}
        buttonTwoProps={{
          title: 'Delete',
          onPress: () => {
            confirmDelete(`${item.first_name}, ${item.last_name}`, () => {
              deleteItem(`employee/${item._id}`)
                .then((json) => alert(json.message))
                .then(() => navigation.goBack())
                .catch(console.error)
            }
            );
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
});