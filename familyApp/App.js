import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Tasks from './app/components/Tasks';
import KidsTasks from './app/components/AssignKidsTasks';
import TaskMonitor from './app/components/TaskMonitor';
<<<<<<< HEAD
import Drawer from './app/components/Drawer'

=======
import Drawer from './app/components/Drawer';
import Shortage from './app/components/Shortage';
//jozaa comment this
>>>>>>> shortage full stack
const Application=  createStackNavigator({
  Home: { screen: Shortage },
  SignUp: { screen: SignUp },
  Login:{ screen: Login },
  Drawer: { screen: Drawer },
  Tasks:{screen:Tasks},
  TaskMonitor:{screen:TaskMonitor},
  //Login: { screen: Drawer },
},{
  navigationOptions: {
    header: false,
  }
});

export default class App extends React.Component {
  render() {
    return (
     // <Application/>
     <Drawer/>
    );
  }
}
