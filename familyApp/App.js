import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer';
import DrawerKids from './app/components/DrawerKids';
import AssignKidsTasks from './app/components/AssignKidsTasks';
import TaskMonitor from './app/components/TaskMonitor';
import BarParents from './app/components/BarParents';
import Shortage from './app/components/Shortage';
//only for test (Jozaa)
import Login2 from './app/components/Login2';
const Application=  createStackNavigator({
  //i change it for testing (Jozaa)
  // Home: { screen: Login2 },
  Drawer: { screen: Drawer },
  DrawerKids: { screen: DrawerKids },
  TaskMonitor:{screen:TaskMonitor},
  SignUp: { screen: SignUp },
  Login:{ screen: Login },
  // Drawer: { screen: Drawer },
  AssignKidsTasks:{screen:AssignKidsTasks},
},{
  navigationOptions: {
    header: null,
  }
});

export default class App extends React.Component {
  constructor(props){
    super(props);
    global.ip='http://10.0.2.2:3000/api'; //nada
    // global.ip='http://192.168.8.105:3000/api'; //jozaa
  }
  render() {
    return (
     <Application/>
     // <Drawer/>
    );
  }
}
