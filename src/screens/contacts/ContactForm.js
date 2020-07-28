import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';

import ButtonGroup from '../../components/ButtonGroup';
import { editItems as editItems } from '../../services/api';

export default function ContactForm(props) {
  const params = props.params;
  const item = params ? params.item : {};
  const [firstName, setFirstName] = useState(item.first_name);
  const [lastName, setLastName] = useState(item.last_name);
  const [email, setEmail] = useState(item.email);
  const [phone, setPhone] = useState(item.phone);
  const [address, setAddress] = useState(item.address);

  const handleSubmit = () => {
    editItems(props.requestMethod, {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      address
    }, props.endpoint)
      .then((item) => props.redirect(item))
      .catch((error) => console.log(error));

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Input label='First Name'
            onChangeText={(text) => setFirstName(text)}
            autoCapitalize='words'
          >
            {firstName}
          </Input>
          <Input label='Last Name'
            onChangeText={(text) => setLastName(text)}
            autoCapitalize='words'
          >
            {lastName}
          </Input>
          <Input label='Email'
            onChangeText={(text) => setEmail(text)}
            keyboardType='email-address'
          >
            {email}
          </Input>
          <Input label='Phone Number'
            onChangeText={(text) => setPhone(text)}
            errorStyle={{ color: 'red' }}
            errorMessage='ENTER A VALID ERROR HERE'
            maxLength={10}
            keyboardType='phone-pad'
          >
            {phone}
          </Input>
          <Input label='Address'
            onChangeText={(text) => setAddress(text)}
            multiline={true}
          >
            {address}
          </Input>
          <ButtonGroup
            buttonOneTitle='Submit'
            buttonOnePress={handleSubmit}
            buttonTwoTitle='Cancel'
            buttonTwoPress={() => props.navigation.goBack()}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});