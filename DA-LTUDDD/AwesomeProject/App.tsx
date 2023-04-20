/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

const TextInputExample = () => {

  const [selectedTab, setSelectedTab] = useState('');
  const [username, onChangeText] = React.useState('');
  const [password, onChangeNumber] = React.useState('');

  const isLoggedIn = false;

  const SelectedTab = () => {
      switch(selectedTab){
          case 'B':
              return <Text
              style={styles.text}>
                Login successful
              </Text>;
          default:
              return (
                <SafeAreaView>
      <Text
        style={styles.titletext}>
        Login
      </Text>
      <Text
        style={styles.text}>
          Username
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={username}
        placeholder=""
        keyboardType="default"
      />
      <Text
        style={styles.text}>
          Password
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={password}
        placeholder=""
        keyboardType="visible-password"
      />
      <Button
        title="Login"
        onPress={() => {
          if ((username == 'user' || username == 'User') && password == '123456')
          {
            setSelectedTab('B')
          }
        }}
      />
    </SafeAreaView>
              )
      }
  }

  return(
      <View>
          {SelectedTab()}
      </View>
  )  
}

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
  titletext: {
    fontSize: 60,
    color: 'black',
  }
});

export default TextInputExample;