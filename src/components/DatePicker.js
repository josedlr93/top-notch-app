import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Icon } from 'react-native-elements';

export const DatePicker = ({ initialDateTime, handleChange, label }) => {
  const [date, setDate] = useState(initialDateTime);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    handleChange(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      <Input label={label}
        value={date ? new Date(date).toLocaleString() : ''}
        disabled={true}
        rightIcon={
          (<View style={styles.icons}>
            <Icon name='date-range'
              onPress={showDatepicker} />
            <Icon name='access-time'
              onPress={showTimepicker} />
          </View>)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    margin: 5
  }
});