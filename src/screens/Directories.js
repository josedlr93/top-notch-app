import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import TouchableList from '../components/TouchableList';

export default function Directories({ navigation }) {
  const directories = [
    {
      title: 'Contacts',
      navigate: () => navigation.navigate('ContactStack')
    },
    {
      title: 'Trucks',
      navigate: () => navigation.navigate('Trucks')
    },
    {
      title: 'Employees',
      navigate: () => navigation.navigate('Employees')
    },
  ]

  return (
    <View style={styles.container}>
      <TouchableList list={directories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
