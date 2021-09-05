import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import HomeScreen from './Screens/HomeScreen';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <HomeScreen/>
      </View>
    );
  }
}