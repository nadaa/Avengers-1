//import react from react
import React from 'react';
//import element from reacr-native
import { View, StyleSheet,Text } from 'react-native';
//import createDrawerNavigator as DrawerNavigator from react navigation
import { createDrawerNavigator } from 'react-navigation'
//import the file screen (page)
import Tasks from './Tasks'
import Finance from './Finance';
import UserInfo from './UserInfo';
import Bar from './Bar'

import Try from './Try';
import Try2 from './Try';
import Login from './Login';
import SignUp from './SignUp';

const MyDrawer=createDrawerNavigator(
  {
    Tasks:{
     screen:Tasks,
    },
    Finance:{
      screen:Finance,
    },
    'User Information':{
     screen:UserInfo,
    },

    Try:{
      screen:Try,
    },
    Try2:{
      screen:Try2,
    },
    Shortage:{
     screen:Tasks,
    },
    'Family Events':{
     screen:Tasks,
    },
    Study:{
     screen:Try,
    },
    Exam:{
     screen:Try,
    },
    Outside:{
     screen:Try,
    },
    'Login For Try Only':{
     screen:Login,
    },
    'SignUp For Try Only':{
     screen:SignUp,
    },
  },
  {
    // navigationOptions:({navigation}) => ({
    //   headerStyle: {backgroundColor: 'red'},
    //   title: 'Welcome!',
    //   headerTintColor: 'blue',
    // }),
    //contentComponent: CustomDrawerContentComponent,


    //                                  Try   Try2 Try3
    //initialRouteName:'Tasks',Finance  Study Exam Outside
    initialRouteName:'Finance',
    drawerPosition:'left',
    drawerWidth:200,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions:{
      activeTintColor:'red',
      // tintStyle:{backgroundColor: 'red'},
    },
  }
);

//export Drawer from the react componant
export default class Drawer extends React.Component{
  //here change make the navigate work and 
  //in <MyDrawer> put navigation={this.props.navigation}
  static router = MyDrawer.router;
  //render
  render() {
    //what return
    return (
      <View style={styles.allPage}>
        <MyDrawer navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    //When finish delet this
    marginBottom:25,
  },
});
/*
  static router = MyDrawer.router;
*/
