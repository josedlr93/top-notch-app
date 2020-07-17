import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function Schedule({ navigation }) {
  
  return (
    <View styles={styles.container}>
      <Text>Schedule</Text>
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
