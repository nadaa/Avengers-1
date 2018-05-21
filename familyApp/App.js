import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer'
//only for test (Jozaa)
import Login2 from './app/components/Login2';
import AssignKidsTasks from './app/components/AssignKidsTasks';
const Application=  createStackNavigator({
  //i change it for testing (Jozaa)
  // Home: { screen: Login2 },
  Home: { screen: Login },
  SignUp: { screen: SignUp },
  Login:{ screen: Login },
  Drawer: { screen: Drawer },
  AssignKidsTasks:{screen:AssignKidsTasks},
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
