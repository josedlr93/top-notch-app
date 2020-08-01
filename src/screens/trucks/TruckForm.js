import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, CheckBox, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';

import ButtonGroup from '../../components/ButtonGroup';
import { editItems as editItems } from '../../services/api';

export default function TruckForm(props) {
  const params = props.params;
  const item = params ? params.item : {};

  const constraints = {
    emailAddress: {
      email: {
        message: "^Please enter a valid email address"
      }
    },
  };

  const truckSchema = yup.object({
    truckNum: yup.string()
      .required('Truck number required'),
    vin: yup.string(),
    cdlRequired: yup.boolean(),
    serviceDate: yup.date(),
    showDatePicker: yup.boolean()
  });

  const submitItem = (values, setSubmitting) => {
    editItems(props.requestMethod, {
      truck_num: values.truckNum,
      vin: values.vin,
      cdl_required: values.cdlRequired,
      service_date: values.serviceDate
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
            truckNum: item.truck_num,
            vin: item.vin,
            cdlRequired: item.cdl_required,
            serviceDate: item.service_date || new Date(),
            showDatePicker: false
          }}
          validationSchema={truckSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitItem(values, setSubmitting);
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <View>
              <Input label='Truck Number'
                onChangeText={handleChange('truckNum')}
                errorStyle={styles.error}
                errorMessage={touched.truckNum && errors.truckNum}
                onBlur={handleBlur('truckNum')}
                value={values.truckNum}
              />
              <Input label='VIN'
                onChangeText={handleChange('vin')}
                errorStyle={styles.error}
                value={values.vin}
              />
              {values.showDatePicker && (<DateTimePicker
                value={values.serviceDate}
                onChange={handleChange('serviceDate')}
                mode='default'
                display='default'
              />)}
              <Input label='Service Date'
                value={new Date(values.serviceDate).toDateString()}
                disabled={true}
                rightIcon={(<Icon name='date-range' onPress={() => setFieldValue('showDatePicker', true)}/>)}
              />
              <CheckBox
                title='CDL Required?'
                checked={values.cdlRequired}
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