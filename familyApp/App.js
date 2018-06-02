import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer';
import DrawerKids from './app/components/DrawerKids';
import TaskMonitor from './app/components/TaskMonitor';
import TasksDisplay from './app/components/TasksDisplay';
import Bar from './app/components/Bar';
import Shortage from './app/components/Shortage';
import UserInfo from './app/components/UserInfo';
import Finance from './app/components/Finance';

const Application=  createStackNavigator({
  Login:{ screen: Login },
  Finance:{screen:Finance},
  'User Information':{screen:UserInfo},
  TasksDisplay:{screen:TasksDisplay},
  Shortage:{screen:Shortage},
  Drawer: { screen: Drawer },
  SignUp:{screen:SignUp},
  DrawerKids: { screen: DrawerKids },
  'Task Monitor':{screen:TaskMonitor},
  TasksDisplay:{screen:TasksDisplay},
  },{
  navigationOptions: {
    header: null,
  }
});
export default class App extends React.Component {
  constructor(props){
    super(props);
    // global.ip='http://10.0.2.2:3000/api'; //nada
    // global.ip='http://192.168.8.105:3000/api'; //jozaa
    global.ip='http://192.168.2.50:3000/api' //Waed
    //global.ip='http://192.168.202.2:3000/api'; //Hussein
  }
  render(){
    return(
     <Application/>
    );
  }
}
