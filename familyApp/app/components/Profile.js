//import react from react
import React from 'react';
//import element from reacr-native 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import FormInput & Header from react native elements
import { FormInput, Header ,Divider, CheckBox } from 'react-native-elements';
//import from navidate react drawer
import Drawer from 'react-native-drawer'
//import createDrawerNavigator as DrawerNavigator from react navigation
import { createDrawerNavigator } from 'react-navigation'
//import axios to make router works
import axios from 'axios';    
 
//import the icon from lirbary  one by one (each one library in react native icon)
import Icon0 from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/Octicons';
import Icon7 from 'react-native-vector-icons/Foundation';

//import the file screen (page)
import Login from './Login';
import Tasks from './Tasks'
import SignUp from './SignUp';
import Try from './Try';
import Try2 from './Try2';

import Finance from './Finance';

const UserTypeGenderText={
  //female (Mother) / male (Father) / child (Children)
  female:'Mother',
  male:'Father',
  child:'Child',
}

const MyDrawer=createDrawerNavigator(
  {
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
    Tasks:{
     //path:'/sent',
     screen:Tasks,  
    },
    'Family Events':{
     //path:'/sent',
     screen:Tasks,  
    },
    Study:{
     //path:'/sent',
     screen:Tasks,  
    },
    Exam:{
     //path:'/sent',
     screen:Try2,  
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
  },
  {
    //initialRouteName:'Tasks',
    initialRouteName:'Try2',
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

//export Home from the react componant
export default class Profile extends React.Component{
  //the constructor
  constructor(){
    //super for ES6
    super();
    //all the data save before to can show in the bar
    this.state={
      //defult thing when change from data base change here 🙂 <3
      //female (Mother) / male (Father)/ child (Children)
      userType:'female',
      //from 100%
      userProgress:'100',
      //for how many child in family
      userRanking:'2',
      //the money still
      restMoney:'1500',
    };
  }

  fectch1(){
    //return axios.get('http://192.168.1.82:3000')
    return fetch('http://192.168.1.82:3000')
      .then((response) => response.json())
        .then((responseJson) => {
          console.log("server done:",JSON.stringify(responseJson) )
           alert(JSON.stringify(responseJson));
        })
      .catch(function (error) {
       console.log(error);
      });  
  }
  
  goToDrawer(){
    alert('Drawer From Profile');
  };
  goToTasks(){
    alert('Tasks From Profile');
    //this.props.navigation.openDrawer()
  };

  //render
  render() {
    //what return
    return (
      <View style={styles.allPage}>
        <View style={styles.barView}>
          <Header
            backgroundColor='#123456'
            innerContainerStyles={styles.innerContainer}
            outerContainerStyles={styles.outerContainer}

            leftComponent={
              <View  style={styles.leftComponent}>
                <Icon0 onPress={this.fectch1.bind(this)} style={{color:'#0bf5fb'}} name="bars" size={35}/>
                <Text onPress={this.goToDrawer.bind(this)} style={styles.textUnderIcon}>Menu</Text>
              </View>
            }

            centerComponent={
              <View style={styles.centerComponentView}>
                <View style={styles.centerComponent}>
                  <Icon0 name={this.state.userType} size={35} color="red"/>
                  <Text style={styles.textUnderIcon}>
                    {UserTypeGenderText[this.state.userType]}
                  </Text>
                </View>
                
                <View style={styles.centerComponent}>
                  <Text style={styles.textIconDone}>{this.state.userProgress}%</Text>
                  <Text style={styles.textUnderIcon}>
                    Progress
                  </Text>
                </View>
                <View style={styles.centerComponent}>
                  <Text style={styles.textIconRank}>{this.state.userRanking}</Text>
                  <Text style={styles.textUnderIcon}>
                    Rank
                  </Text>
                </View>
                <View style={styles.lastCenterComponent}>
                  <Text style={styles.textIconMoney}>{this.state.restMoney}</Text>
                  <Text style={styles.textUnderIcon}>
                    Money
                  </Text>
                </View>
                              
              </View>
            }

            rightComponent={
              <View style={styles.rightComponent}>
                <Icon6 onPress={this.fectch1.bind(this)} style={{color:'#0bf5fb'}} name="checklist" size={35}/>
                <Text onPress={this.goToTasks.bind(this)} style={styles.textUnderIcon}>Tasks</Text>
              </View>
            }
          >
          </Header>
        </View>
        <View style={styles.otherView}>
          <MyDrawer/>
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
  barView: {
    flexDirection: 'column',
    //comment this after finish
    marginTop:35,
  },
  innerContainer: {
    //backgroundColor:'green',
    flexDirection: 'row',
    alignItems: 'center',
    margin:-12,
  },
  leftComponent: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    marginLeft:5,
    alignItems: 'center',
  },
  rightComponent: {
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    marginRight:5,
    alignItems: 'center',

  },
  centerComponentView: {
    flexDirection: 'row',
    //backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstCenterComponent: {
    marginRight:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerComponent: {
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastCenterComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnderIcon: {
    fontSize: 15,
    textAlign:'center',
    fontWeight: 'bold',
    color:'white',
  },
  textIconDone: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: 'bold',
    color:'#3cff00',
  },
  textIconRank: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: 'bold',
    color:'red',
  },
  textIconMoney: {
    fontSize: 23,
    textAlign:'center',
    fontWeight: 'bold',
    color:'#3cff00',
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



*/