//import react from react
import React from 'react';
//import element from reacr-native 
import { View, StyleSheet } from 'react-native';
//import createDrawerNavigator as DrawerNavigator from react navigation
import { createDrawerNavigator } from 'react-navigation'

//import the file screen (page)
import Bar from './Bar'
import Tasks from './Tasks'
import Try from './Try';
import Finance from './Finance';
import Login from './Login';
import SignUp from './SignUp';

const MyDrawer=createDrawerNavigator(
  {
    Tasks:{
     //path:'/sent',
     screen:Tasks,  
    },
    Finance:{
      //path:'/',
      screen:Finance, 
    },
    Shortage:{
     //path:'/sent',
     screen:Tasks,  
    },
    'User Information':{
     //path:'/sent',
     screen:Tasks,  
    },

    'Family Events':{
     //path:'/sent',
     screen:Tasks,  
    },
    Study:{
     //path:'/sent',
     screen:Try,  
    },
    Exam:{
     //path:'/sent',
     screen:Try,  
    },
    Outside:{
     //path:'/sent',
     screen:Try,  
    },
    
    'Login For Try Only':{
     //path:'/sent',
     screen:Login,  
    },
    'SignUp For Try Only':{
     //path:'/sent',
     screen:SignUp,  
    },
    Try:{
      screen:Try,  
    },
    Bar:{
      screen:Bar,  
    },

  },
  {
    //                                  Try   Try2 Try3 
    //initialRouteName:'Tasks',Finance  Study Exam Outside
    initialRouteName:'Bar',
    drawerPosition:'left',
    //contentComponent: CustomDrawerContentComponent,
    //drawarWidth:10,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions:{
      activeTintColor:'red',
    }
  }
);

//export Drawer from the react componant
export default class Drawer extends React.Component{
  //here change
  static router = MyDrawer.router; 
  //render
  render() {
    //what return
    return (
      <View style={styles.allPage}>
        <Bar navigation={this.props.navigation}/>
        <View style={styles.otherView}>
          <MyDrawer navigation={this.props.navigation}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allPage: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  otherView: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
    //comment this after finish
    marginBottom:35,
  },
});
/*

  static router = MyDrawer.router;

*/