import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Text, Card, ListItem, Overlay } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';

import getTime from '../../services/getTime';
import {fetchedJobs} from './fetchedJobs';
import ButtonGroup from '../../components/ButtonGroup';

export default function Schedule({ navigation }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayElement, setOverlayElement] = useState(null);
  const [items, setItems] = useState({})

  console.log(new Date());

  const toggleOverlay = (element) => {
    setOverlayElement(element);
    setOverlayVisible(!overlayVisible);
  }  

  const getJobs = (date) => {
    const expandedDate = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1,
      day: date.getDate()
    };

    let currentJobs = fetchedJobs.filter(job => {
      let jobYear = job.date.getUTCFullYear();
      let jobMonth = job.date.getUTCMonth() + 1;
      return jobYear === expandedDate.year && jobMonth === expandedDate.month;
    });

    const newItems = {};
    currentJobs.forEach(job => {
      let jobDate = job.date.toISOString().split('T')[0];
      if (newItems[jobDate]) {
        newItems[jobDate].push(job);
      } else {
        newItems[jobDate] = [job];
      }
    });

    setItems(newItems);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={(month) => { 
          console.log('new month')
          getJobs(new Date(month['dateString']));
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <Card title={`${item.name}`}>
              <ListItem
                title={'Time'}
                subtitle={getTime(item.date)}
              />
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => toggleOverlay(
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={item.trucks}
                    renderItem={({ item }) =>
                      (<ListItem
                        title={`Truck ${item.truck_num.toString()}`}
                        subtitle={item.cdl_required ? 'CDL required' : 'CDL not required'}
                        bottomDivider
                      />)
                    }
                  />
                )}
              >
                <ListItem
                  title={`Trucks (${item.trucks.length})`}
                  chevron={true}
                />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => toggleOverlay(
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={item.employees}
                    renderItem={({ item }) =>
                      (<ListItem
                        title={item.name}
                        subtitle={`CDL: ${item.hasCdl ? 'Yes' : 'No'}`}
                        bottomDivider
                      />)
                    }
                  />
                )}
              >
                <ListItem
                  title={`Employees (${item.employees.length})`}
                  chevron={true}
                />
              </TouchableHighlight>
              <ButtonGroup
                buttonOneProps={{
                  title: 'Update',
                  onPress: () => console.log(`update ${item._id}`)
                }}
                buttonTwoProps={{
                  title: 'Delete',
                  onPress: () => {
                    console.log(`delete ${item._id}`)
                  }
                }}
              />
            </Card>
          )
        }}
        renderEmptyData={() => {
          return (
            <View style={{ alignItems: 'center' }}>
              <Text>Nothing to show</Text>
            </View>
          );
        }}
      />
      <Overlay
        animationType={'fade'}
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{ width: '60%', maxHeight: '60%' }}
      >
        <View>
          {overlayElement}
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
