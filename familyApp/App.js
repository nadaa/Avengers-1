import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer';
import DrawerKids from './app/components/DrawerKids';
//only for test (Jozaa)
import Login2 from './app/components/Login2';
import TaskMonitor from './app/components/TaskMonitor';
import Tasks from './app/components/Tasks';
import TasksDisplay from './app/components/TasksDisplay';
import Bar from './app/components/Bar';
import Shortage from './app/components/Shortage';
import UserInfo from './app/components/UserInfo';
//only for test (Jozaa)
import Login2 from './app/components/Login2';
import Finance from './app/components/Finance';

const Application=  createStackNavigator({
  //i change it for testing (Jozaa)
  // Home: { screen: Login2 },
  Login:{ screen: Login },
  UserInfo:{screen:UserInfo},
  SignUp:{screen:SignUp},
  Drawer: { screen: Drawer },
  DrawerKids: { screen: DrawerKids },
  TaskMonitor:{screen:TaskMonitor},
  Tasks:{screen:Tasks},
  TasksDisplay:{screen:TasksDisplay},
  UserInfo:{screen:UserInfo},
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
     // <Finance/>
    );
  }
}
