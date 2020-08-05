import React from 'react';
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
import { editItems } from '../../services/api';

export default function JobForm(props) {
  const params = props.params;
  const item = params ? params.item : {};

  const jobSchema = yup.object({
    name: yup.string()
      .required('Name required'),
  });

  const submitItem = (values, setSubmitting) => {
    console.log(values);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            name: item.first_name,
          }}
          validationSchema={jobSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitItem(values, setSubmitting);
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
            <View>
              <Input label='Customer Name'
                onChangeText={handleChange('name')}
                autoCapitalize='words'
                errorStyle={styles.error}
                errorMessage={touched.name && errors.name}
                onBlur={handleBlur('name')}
                value={values.name}
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
                    props.navigation.navigate('Schedule');
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