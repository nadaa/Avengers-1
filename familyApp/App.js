import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import Profile from './app/components/Profile';
import SignUp from './app/components/SignUp';

<<<<<<< HEAD
const Application=  createStackNavigator({
  Home: { screen: Login },
=======

const Application=  createStackNavigator({
  Home: { screen: SignUp },
  SignUp: { screen: SignUp },
  Login: { screen: Profile },
  Profile: { screen: Profile },
  Login:{screen: Login}
>>>>>>> connection front end component
},{

    navigationOptions: {
       header: false,
      }

});

export default class App extends React.Component {
  render() {
    return (
      <Application/>
      

    );
  }
}

