import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validate } from 'validate.js';

import ButtonGroup from '../../components/ButtonGroup';
import { editItems as editItems } from '../../services/api';

export default function ContactForm(props) {
  const params = props.params;
  const item = params ? params.item : {};
  const [emailError, setEmailError] = useState({});

  const constraints = {
    emailAddress: {
      email: {
        message: "^Please enter a valid email address"
      }
    },
  };

  const contactSchema = yup.object({
    firstName: yup.string()
      .required('First name required'),
    lastName: yup.string()
      .required('Last name required'),
    email: yup.string()
      .required('Email required')
      .email('Invalid')
      .test('validate-email', 'Enter a valid email', (value) => {
        const validation = validate(value, constraints);
        return validation === undefined ? true : false;
      })
      .test('duplicate-email', 'Email already in use', () => {
        return emailError;
      }),
    phone: yup.string()
      .max(10)
      .test('check-phone', 'Enter a valid phone number', (value) => {
        return !value ? true : value.length == 10 ? true : false;
      })
  });

  const submitItem = (values) => {
    editItems(props.requestMethod, {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address
    }, props.endpoint)
      .then((item) => {
        if (item.duplicate) {
          setEmailError(true);
        } else {
          props.redirect(item);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            firstName: item.first_name,
            lastName: item.last_name,
            email: item.email,
            phone: item.phone,
            address: item.address
          }}
          validationSchema={contactSchema}
          onSubmit={(values, actions) => {
            submitItem(values);
          }}
        >
          {({values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
            <View>
              <Input label='First Name'
                onChangeText={handleChange('firstName')}
                autoCapitalize='words'
                errorStyle={styles.error}
                errorMessage={touched.firstName && errors.firstName}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              <Input label='Last Name'
                onChangeText={handleChange('lastName')}
                autoCapitalize='words'
                errorStyle={styles.error}
                errorMessage={touched.lastName && errors.lastName}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              <Input label='Email'
                onChangeText={handleChange('email')}
                keyboardType='email-address'
                errorStyle={styles.error}
                errorMessage={touched.email && errors.email}
                onBlur={handleBlur('email')}
                value={values.email}
                type='email'
              />
              <Input label='Phone Number'
                onChangeText={handleChange('phone')}
                errorStyle={styles.error}
                errorMessage={touched.phone && errors.phone}
                onBlur={handleBlur('phone')}
                keyboardType='phone-pad'
                value={values.phone}
              />
              <Input label='Address'
                onChangeText={handleChange('address')}
                multiline={true}
                value={values.address}
              />
              <ButtonGroup
                buttonOneProps={{
                  title: 'Submit',
                  onPress: handleSubmit,
                  disabled: isSubmitting
                }}
                buttonTwoProps={{
                  title: 'Cancel',
                  onPress: () => {
                    props.navigation.navigate('Contacts')
                  }
                }}
              />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  error: {
    color: 'red'
  }
});