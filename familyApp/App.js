import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer';
import DrawerKids from './app/components/DrawerKids';
//only for test (Jozaa)
import Login2 from './app/components/Login2';
import AssignKidsTasks from './app/components/AssignKidsTasks';
import TaskMonitor from './app/components/TaskMonitor';
import Bar from './app/components/Bar';
const Application=  createStackNavigator({
  // Home: { screen: Login },
  //i change it for testing (Jozaa)
  // Home: { screen: Login2 },

   Login:{ screen: Login },


  Drawer: { screen: Drawer },
  DrawerKids: { screen: DrawerKids },
  Home: { screen: Login },
  TaskMonitor:{screen:TaskMonitor},
  SignUp: { screen: SignUp },
  Login:{ screen: Login },
  // Drawer: { screen: Drawer },
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
