import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer'
import Login2 from './app/components/Login2';

const Application=  createStackNavigator({
  Home: { screen: Login2 },
  SignUp: { screen: SignUp },
  Login:{ screen: Login },
  Drawer: { screen: Drawer },
},{
  navigationOptions: {
    header: false,
  }
});

export default class App extends React.Component {
  render() {
    return (
     <Application/>
     // <Drawer/>
    );
  }
}
