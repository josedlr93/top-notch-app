import React, { } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';
import { deleteItem } from '../../services/api';
import confirmDelete from '../../services/confirmDelete';

export default function ViewTruck({ route, navigation }) {
  const item = route.params.item;
  return (
    <View style={styles.container}>
      <Input label='Truck Number'
        disabled={true}
        value={item.truck_num.toString()}
      />
      <Input label='VIN'
        disabled={true}
        value={item.vin}
      />
      <Input label='Plate Number'
        disabled={true}
        value={item.plate_num}
      />
      <Input label='CDL Required'
        disabled={true}
        value={item.cdl_required ? 'Yes' : 'No'}
      />
      <Input label='Service Date'
        disabled={true}
        value={item.service_date ? new Date(item.service_date).toLocaleString() : 'N/A'}
      />
      <ButtonGroup
        buttonOneProps={{
          title: 'Update',
          onPress: () => navigation.navigate('Update Truck', { item })
        }}
        buttonTwoProps={{
          title: 'Delete',
          onPress: () => {
            confirmDelete(`truck ${item.truck_num}`, () => {
              deleteItem(`truck/${item._id}`)
                .then((json) => alert(json.message))
                .then(() => navigation.goBack())
                .catch(console.error);
            });
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