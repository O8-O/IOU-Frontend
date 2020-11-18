import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, ScrollView,View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from "./src/stack/AppStack";


export default class App extends React.Component {

  render() {
      return (
        <NavigationContainer>
          <AppStack/>
        </NavigationContainer>
          
      );
  }
}
