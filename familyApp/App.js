import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './app/components/Login';
import SignUp from './app/components/SignUp';
import Drawer from './app/components/Drawer';
import DrawerKids from './app/components/DrawerKids';
import TaskMonitor from './app/components/TaskMonitor';
import TasksDisplay from './app/components/TasksDisplay';
import Shortage from './app/components/Shortage';
import UserInfo from './app/components/UserInfo';

// App navigation screens
const Application = createStackNavigator({
  Login: { screen: Login },
  SignUp: { screen: SignUp },
 'User Information': { screen: UserInfo },
  Drawer: { screen: Drawer },
  DrawerKids: { screen: DrawerKids },
  'Task Monitor': { screen: TaskMonitor },
  TasksDisplay: { screen: TasksDisplay },
  Shortage: { screen: Shortage },

  }, {
  navigationOptions: {
    header: null,
  }
});
export default class App extends React.Component {
  constructor(props) {
    super(props);
     global.ip = 'https://avengers-rbk.herokuapp.com/api'; //nada
    // global.ip = 'http://192.168.8.105:3000/api'; //jozaa
    // global.ip = 'http://192.168.1.111:3000/api' //Waed
    //global.ip = 'http://192.168.202.2:3000/api'; //Hussein
  }
  render() {
    return (
     <Application />
      //<Drawer/>
    );
  }
}
