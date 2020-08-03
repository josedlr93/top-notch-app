import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';
import { Input, CheckBox, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';

import ButtonGroup from '../../components/ButtonGroup';
import { DatePicker } from '../../components/DatePicker';
import { editItems } from '../../services/api';

export default function TruckForm(props) {
  const params = props.params;
  const item = params ? params.item : {};

  const truckSchema = yup.object({
    truckNum: yup.number()
      .required('Truck number required'),
    vin: yup.string()
      .max(17)
      .test('check-vin', 'Enter a valid VIN', (value) => {
        return !value ? true : value.length === 17 ? true : false;
      }),
    plateNum: yup.string(),
    cdlRequired: yup.boolean(),
    serviceDate: yup.date(),
    showDatePicker: yup.boolean()
  });

  const submitItem = (values, setSubmitting) => {
    editItems(props.requestMethod, {
      truck_num: values.truckNum,
      vin: values.vin,
      plate_num: values.plateNum,
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
            plateNum: item.plate_num,
            cdlRequired: item.cdl_required || false,
            serviceDate: item.service_date,
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
                value={values.truckNum ? values.truckNum.toString() : ''}
              />
              <Input label='VIN'
                onChangeText={handleChange('vin')}
                maxLength={17}
                errorStyle={styles.error}
                errorMessage={touched.vin && errors.vin}
                onBlur={handleBlur('vin')}
                value={values.vin}
              />
              <Input label='Plate Number'
                onChangeText={handleChange('plateNum')}
                errorStyle={styles.error}
                errorMessage={touched.plateNum && errors.plateNum}
                onBlur={handleBlur('plateNum')}
                value={values.plateNum}
              />
              <DatePicker 
                initialDateTime={values.serviceDate} 
                handleChange={(newDate) => setFieldValue('serviceDate', newDate)}
              />
              <CheckBox
                title='CDL Required?'
                checked={values.cdlRequired}
                onPress={() => setFieldValue('cdlRequired', !values.cdlRequired)}
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
                    props.navigation.navigate('Trucks')
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