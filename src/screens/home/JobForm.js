import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import * as yup from 'yup';

import ButtonGroup from '../../components/ButtonGroup';
import { editItems } from '../../services/api';
import { DatePicker } from '../../components/DatePicker';

export default function JobForm(props) {
  const params = props.params;
  const item = params ? params.item : {};

  const fetchedTrucks = [
    {
      _id: '_id-01',
      cdl_required: false,
      truck_num: 1,
    },
    {
      _id: '_id-02',
      cdl_required: false,
      truck_num: 2,
    },
  ]

  const truckList = fetchedTrucks.map(truck => {
    let listItem = {
      label: `Truck ${truck.truck_num}`,
      value: truck
    }
    return listItem;
  })

  const fetchedEmployees = [
    {
      _id: "_id-01",
      hasCdl: false,
      name: "Jose, De La Rosa",
    },
    {
      _id: "_id-02",
      hasCdl: false,
      name: "Doug, Ziemba",
    },
  ]

  const employeeList = fetchedEmployees.map(employee => {
    let listItem = {
      label: `${employee.name}`,
      value: employee
    }
    return listItem;
  })

  const jobSchema = yup.object({
    name: yup.string()
      .required('Name required'),
    date: yup.date()
      .required('Date required'),
    trucks: yup.array()
      .of(
        yup.object()
          .shape({
            _id: yup.string(),
            cdl_required: yup.boolean(),
            truck_num: yup.number()
          }))
      .min(1, 'Select at least 1 truck'),
    employees: yup.array()
      .of(
        yup.object()
          .shape({
            _id: yup.string(),
            name: yup.string(),
            hasCdl: false
          })
      )
      .min(1, 'Select at least 1 employee')
  });

  const submitItem = (values, setSubmitting) => {
    console.log(values);
    setSubmitting(false);
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
            date: item.date,
            trucks: item.trucks,
            employees: item.employees
          }}
          validationSchema={jobSchema}
          onSubmit={(values, { setSubmitting }) => {
            submitItem(values, setSubmitting);
          }}
        >
          {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <View>
              <Input label='Customer Name'
                onChangeText={handleChange('name')}
                autoCapitalize='words'
                errorStyle={styles.error}
                errorMessage={touched.name && errors.name}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <DropDownPicker
                placeholder='Select trucks'
                defaultValue={values.trucks}
                items={truckList}
                multiple={true}
                multipleText="Trucks selected (%d)"
                min={1}
                containerStyle={{ height: 50, marginBottom: 20 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                onChangeItem={(item) => {
                  setFieldValue('trucks', item);
                }}
              />
              <DropDownPicker
                placeholder='Select employees'
                defaultValue={values.employees}
                items={employeeList}
                multiple={true}
                multipleText="Employees selected (%d)"
                min={1}
                containerStyle={{ height: 50, marginBottom: 20 }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                onChangeItem={(item) => {
                  setFieldValue('employees', item);
                }}
              />
              <DatePicker
                label={'Date/Time'}
                initialDateTime={values.date}
                handleChange={(newDate) => setFieldValue('date', newDate)}
                errorStyle={styles.error}
                errorMessage={touched.date && errors.date}
                onBlur={handleBlur('date')}
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