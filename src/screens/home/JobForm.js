import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik';
import * as yup from 'yup';

import ButtonGroup from '../../components/ButtonGroup';
import { DatePicker } from '../../components/DatePicker';
import { getItems, editItems } from '../../services/api';
import { addJob } from './fetchedJobs';

export default function JobForm(props) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const params = props.params;
  const item = params ? params.item : {};

  useEffect(() => {
    getItems('truck')
      .then((json) => {
        setTrucks(json);
      })
      .then(() => {
        getItems('employee')
          .then((json) => {
            console.log(json)
            setEmployees(json);
          })
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const truckList = trucks.map(truck => {
    let listItem = {
      label: `Truck ${truck.truck_num}`,
      value: truck
    }
    return listItem;
  })

  const employeeList = employees.map(employee => {
    let listItem = {
      label: `${employee.first_name}, ${employee.last_name}`,
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
    const submitJob = new Promise((resolve, reject) => {
      addJob({
        name: values.name,
        trucks: values.trucks,
        employees: values.employees,
        date: values.date
      })
      resolve('success')
    });
    submitJob.then(() => {
      console.log('succeeded')
      props.redirect()
    })
    setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {isLoading ? <ActivityIndicator /> : error ? <Text>Error</Text> : (
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

      )}
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