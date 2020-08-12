import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button
} from 'react-native';

export default function Login({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('Home')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
