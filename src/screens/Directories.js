import React from 'react';
import { Button } from 'react-native';
import {
  StyleSheet,
  View
} from 'react-native';

export default function Directories ({ navigation })  {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Contacts"
        onPress={() =>
          navigation.navigate('ContactStack')
        }
      />
      <Button
        title="Go to Trucks"
        onPress={() =>
          navigation.navigate('Trucks')
        }
      />
      <Button
        title="Go to Employees"
        onPress={() =>
          navigation.navigate('Employees')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
