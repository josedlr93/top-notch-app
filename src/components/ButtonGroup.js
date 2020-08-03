import React from 'react';

import { View, StyleSheet } from 'react-native'; 
import { Button } from 'react-native-elements';

export default function ButtonGroup({buttonOneProps, buttonTwoProps}) {
  return (
    <View style={styles.container}>
      <Button
        title={'button 1'}
        onPress={() => console.log('Set onPress for button 1')}
        {...buttonOneProps}
        raised
        containerStyle={styles.buttonContainer}
      />
      <Button
        title={'button 2'}
        onPress={() => console.log('Set onPress for button 2')}
        {...buttonTwoProps}
        raised
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonOne}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonContainer: {
    margin: 10
  },
  buttonOne: {
    backgroundColor: 'red'
  }
});