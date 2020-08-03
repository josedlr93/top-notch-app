import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validate } from 'validate.js';

import ButtonGroup from '../../components/ButtonGroup';
import { editItems } from '../../services/api';

export default function EmployeeForm(props) {
  const params = props.params;
  const item = params ? params.item : {};
  console.log(item)

  const constraints = {
    emailAddress: {
      email: {
        message: "^Please enter a valid email address"
      }
    },
  };

  const adminSchema = yup.object({
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
      }),
    phone: yup.string()
      .max(10)
      .test('check-phone', 'Enter a valid phone number', (value) => {
        return !value ? true : value.length === 10 ? true : false;
      }),
    altPhone: yup.string()
      .nullable()
      .max(10)
      .test('check-phone', 'Enter a valid phone number', (value) => {
        return !value ? true : value.length === 10 ? true : false;
      }),
    address: yup.string(),
    hasCdl: yup.boolean(),
    admin: yup.boolean()

  });

  const submitItem = (values, setSubmitting) => {
    editItems(props.requestMethod, {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      alt_phone: values.altPhone,
      address: values.address,
      has_CDL: values.hasCdl,
      admin: values.admin
    }, props.endpoint)
      .then((item) => {
        if (item.duplicate) {
          alert(item.message);
          setSubmitting(false);
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
            altPhone: item.alt_phone,
            address: item.address,
            hasCdl: item.has_CDL,
            admin: item.admin
          }}
          validationSchema={adminSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            submitItem(values, setSubmitting);
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <SafeAreaView style={styles.form}>
              <ScrollView>
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
                  maxLength={10}
                  errorStyle={styles.error}
                  errorMessage={touched.phone && errors.phone}
                  onBlur={handleBlur('phone')}
                  keyboardType='phone-pad'
                  value={values.phone}
                />
                <Input label='Phone Number (2)'
                  onChangeText={handleChange('altPhone')}
                  maxLength={10}
                  errorStyle={styles.error}
                  errorMessage={touched.altPhone && errors.altPhone}
                  onBlur={handleBlur('altPhone')}
                  keyboardType='phone-pad'
                  value={values.altPhone}
                />
                <Input label='Address'
                  onChangeText={handleChange('address')}
                  multiline={true}
                  value={values.address}
                />
                <CheckBox
                  title='Has CDL?'
                  checked={values.hasCdl}
                  onPress={() => setFieldValue('hasCdl', !values.hasCdl)}
                />
                <CheckBox
                  title='Admin?'
                  checked={values.admin}
                  onPress={() => setFieldValue('admin', !values.admin)}
                />
              </ScrollView>
              <View>
                <ButtonGroup
                  buttonOneProps={{
                    title: 'Submit',
                    onPress: handleSubmit,
                    disabled: isSubmitting
                  }}
                  buttonTwoProps={{
                    title: 'Cancel',
                    onPress: () => {
                      props.navigation.navigate('Employees')
                    }
                  }}
                />
              </View>
            </SafeAreaView>
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
  form: {
    flex: 1
  },
  error: {
    color: 'red'
  }
});