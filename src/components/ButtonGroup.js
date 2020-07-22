import React from 'react';

import { View, StyleSheet } from 'react-native'; 
import { Button } from 'react-native-elements';

export default function ButtonGroup(props) {

  return (
    <View style={styles.container}>
      <Button
        title={props.buttonOneTitle || 'button 1'}
        onPress={props.buttonOnePress ? props.buttonOnePress : () => console.log('Set onPress for button 1')}
        raised
        containerStyle={styles.buttonContainer}
      />
      <Button
        title={props.buttonTwoTitle || 'button 2'}
        onPress={props.buttonTwoPress ? props.buttonTwoPress : () => console.log('Set onPress for button 2')}
        raised
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.buttonOne}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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