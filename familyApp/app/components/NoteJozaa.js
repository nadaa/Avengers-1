//dont delete this because it is the code for ata base jozaa
//IP Adress Jozaa: 192.168.1.82
import Bar from './Bar'
<Bar navigation={this.props.navigation}/>

Drawer     //When finish delet this
Bar     //When finish delet this
//issue
1- after login remove the stack navigate
2- make the screen scroll view


//first the mother
1- function run automaticlly when user login in
2- get the type of user from data base (by the email)
3- put type inside the state

//second the progress
1- function run automaticlly when user login in
2- get the all tasks of user from data base (by the email)
3- calculate how many task state cchecl over all tasks
4- return this number  in percenteg

//third ranked
1- function run automaticlly when user login in
2- get the progress for all family child (by email + fimilly id + child)
3- compare each progress b other
4- if the same give the compare for how many task have
5- if the same give who eamil lenght smallest

//finance
1- function run automaticlly when user login in
2- get the how money this family have (by email + fimilly id + money)
3- subtract the input from output

need to save the table in data base and the cost to can render it



//proplem
1- menue button
2- tasks button
3- router me and waed






///note

neeed







myby

//dont know why dont wwork
 //  axios.get('http://facebook.github.io/react-native/movies.json')
 // .then(function (response) {
 //   console.log(response);
 //   alert('JSON.stringify(response.movies[0])');
 // })
 // .catch(function (error) {
 //   console.log(error);
 // });




done

/*fetch wrok trying
fectch1(){
  return fetch('http://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      alert(JSON.stringify(responseJson.movies[0]));
    })
    .catch((error) => {
      console.error(error);
    });
}
*/




















------ the whole page

import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import axios from 'axios';  
//import { createStackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import Drawer from './Drawer';

export default class Login2 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'Alex Mercer',
      password:'1234567',
    }
  }
  sendLogin(){
  const { navigate } = this.props.navigation;
  axios.post('http://192.168.1.82:3000/login2', {
    user:this.state
  })
  .then(function (response) {
    if(response.data.msg==="success login"){
      //alert(response.data.msg);
      navigate('Drawer');
    }else if(response.data.msg==="the password is not correct"){
     alert("the password is not correct please inser it correct");
    }else if(response.data.msg==="no account"){
      alert('You dont have an account please make one then login');
      navigate('SignUp');
    }
  })
  .catch(function (error) {
    console.log(error);
    alert(error);
  });
};
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}> LOGIN </Text>
          <TextInput style={styles.textInput} placeholder='Username'
            value={this.state.username} onChangeText={(username)=>this.setState({username})}/> 
            <TextInput style={styles.textInput} placeholder='Password'
              value={this.state.password} onChangeText={(password)=>this.setState({password})}/> 
          <TouchableOpacity style={styles.btn} onPress={this.sendLogin.bind(this)}>
            <Text>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#123456',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf:'stretch',
    backgroundColor:'#01c853',
    padding:20,
    alignItems:'center',
  }
})











--short one
import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity,} from 'react-native';
import axios from 'axios';  
import SignUp from './SignUp';
import Drawer from './Drawer';
export default class Login2 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'Alex Mercer',
      password:'1234567',
    }
  }
sendLogin(){
  const { navigate } = this.props.navigation;
  axios.post('http://192.168.1.82:3000/login2', {user:this.state})
  .then(function (response) {
    if(response.data.msg==="success login"){
      //alert(response.data.msg);
      navigate('Drawer');
    }
  })
};
  render() {
    const { navigate } = this.props.navigation;
    return (
<View style={styles.container}>
  <Text style={styles.header}> LOGIN </Text>
  <TextInput style={styles.textInput} placeholder='Username'
  value={this.state.username} onChangeText={(username)=>this.setState({username})}/> 
  <TextInput style={styles.textInput} placeholder='Password'
  value={this.state.password} onChangeText={(password)=>this.setState({password})}/> 
  <TouchableOpacity style={styles.btn} onPress={this.sendLogin.bind(this)}>
  <Text>LOGIN</Text></TouchableOpacity>
</View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {flex: 1},
  container: {flex: 1,alignItems: 'center',justifyContent: 'center',
  backgroundColor: '#123456',paddingLeft: 40,paddingRight: 40},
  header: {fontSize: 30,marginBottom: 60,color: '#fff',fontWeight: 'bold'},
  textInput: {alignSelf: 'stretch',padding: 16,marginBottom: 20,backgroundColor: '#fff'},
  btn: {alignSelf:'stretch',backgroundColor:'#01c853',padding:20,alignItems:'center'}
})

