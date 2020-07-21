import React from 'react';

import { View } from 'react-native'; 
import { Button } from 'react-native-elements';

export default function ButtonGroup(props) {

  return (
    <View>
      <Button
        title={props.buttonOneTitle || 'button 1'}
      />
      <Button
        title={props.buttonTwoTitle || 'button 2'}
      />
    </View>
  )
};