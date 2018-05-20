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
            value={this.state.username}
            onChangeText={(username) => this.setState({username})} 
          /> 
            <TextInput
              style={styles.textInput} 
              placeholder='Password'
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}  
            /> 
          <TouchableOpacity
            style={styles.btn}
            onPress={
              this.sendLogin.bind(this)
              //  navigate('Profile')
            }
          >
            <Text>Log in</Text>
          </TouchableOpacity>
          <Text style={{color: 'blue', paddingTop:10}}
            onPress={() =>  navigate('SignUp')}>
            create account for free -SignUp-
          </Text>
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

