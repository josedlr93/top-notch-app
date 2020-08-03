import React, { } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';
import { deleteItem } from '../../services/api';
import confirmDelete from '../../services/confirmDelete';

export default function ViewTruck({ route, navigation }) {
  const item = route.params.item;

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text>Truck: </Text>
        <Text>{item.truck_num}</Text>
      </View>
      <View style={styles.line}>
        <Text>VIN: </Text>
        <Text>{item.vin}</Text>
      </View>
      <View style={styles.line}>
        <Text>CDL required: </Text>
        <Text>{item.cdl_required}</Text>
      </View>
      <View style={styles.line}>
        <Text>Service Date: </Text>
        <Text>{item.service_date}</Text>
      </View>
      <ButtonGroup
        buttonOneProps={{
          title: 'Update',
          // onPress: () => navigation.navigate('Update Truck', { item })
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