//import react from react
import React from 'react';
//import element from reacr-native 
import { StyleSheet, Text, View,Button,TextInput,TouchableOpacity } from 'react-native';
//import the icon from lirbary
import Icon from 'react-native-vector-icons/FontAwesome';
//import input from elent react native
import { FormInput } from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

//export this app from the react componant
export default class LoginPrototype extends React.Component {
  //the constructor
  /*
  constructor(){
    //super for es6
    super();
    //all the data save before sent in state
    this.state={
      username:'',
      password:'',
      data:'it is dont change',
    };
  }
  */
  static navigationOptions = {
    tabBarLabel:'Screen 1',
    drawarIcon:()=>{
      return(
        <Icon
          name='user'
          size={23}
          style={{color:'blue'}}
        >
        </Icon>
      );
    }
  }
  //function to fecth data
  login(){
    alert(this.state.username+this.state.password);
  }
  signUp(){
    alert('LEARN MORE IS WORK');
  }

  //render
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
  
          <Text style={styles.mainText}>Login or Sign Up</Text>
        
          <View style={styles.usernamePasswordView}>
            <Icon style={styles.usernamePasswordIcon} name="user" size={20} color="#000"/>
            <TextInput style={styles.usernamePasswordTextInput}
              placeholder="Username"
              onChangeText={(username) => {this.setState({username})}}
            />
          </View>
  
          <View style={styles.usernamePasswordView}>
            <Icon style={styles.usernamePasswordIcon} name="lock" size={20} color="#000"/>
            <TextInput
              type="password" 
              maxlength="4" 
              size="4"
              style={styles.usernamePasswordTextInput}
              placeholder="Password"
              onChangeText={(password) => {this.setState({password})}}
              secureTextEntry={true}
            />
          </View>


          <Button
            style={styles.loginScreenButton}
            onPress={()=>this.props.navigation.navigate('DrawerOpen')}
            title='HERE MUSt work 1'
            >
          </Button>

          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={()=>this.props.navigation.navigate('DrawerOpen')}
            underlayColor='red'>
            <Text style={styles.loginSingUpText}>Go to press</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={this.login.bind(this)}
            underlayColor='red'>
            <Text style={styles.loginSingUpText}>Login</Text>
          </TouchableOpacity>
      
          <TouchableOpacity
            style={styles.signUpScreenButton}
            onPress={this.signUp.bind(this)}
            underlayColor='blue'>
            <Text style={styles.loginSingUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flexDirection: 'column',
    marginTop:35,
    marginBottom:35,
    backgroundColor: 'white',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  mainText: {
    color:'black',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  usernamePasswordView: {
    flexDirection: 'row',
    backgroundColor: 'red',
    marginRight:20,
    marginLeft: 20,
    marginTop:10,
    //size:20,
    //position:'fixed',
  },
  usernamePasswordIcon: {
    marginLeft: 10,
    marginTop: 10,
  },
  usernamePasswordTextInput:{
    marginLeft: 50,
    color:'black',
    height: 40,

  },
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  signUpScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
    loginSingUpText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',

  },
});


/*
() => navigate('HomeScreen')

<FormInput style={styles.input}
  //placeholder='INPUT WITH CUSTOM ICON'
  leftIcon={
    <Icon
    name='user'
      size={50}
      color='black'
    />
  }
/>
type="text" name="pin" maxlength="4" size="4"




 





*/