
import React from 'react';
import {
 StyleSheet,
 Text, 
 View ,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 AsyncStorage,
 ScrollView,
 ImageBackground,
} from 'react-native';
import axios from 'axios';  
import { createStackNavigator } from 'react-navigation';
import SignUp from './SignUp';
//import DrawerKids from './DrawerKids';
// import Drawer from './Drawer';
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'nada@gmail.com',
      password:'123',
    }
  }
  saveData(userInfo){
   //console.log('userinfo',userInfo)
    AsyncStorage.setItem('username',(userInfo.username));
    AsyncStorage.setItem('email',(userInfo.email));
    AsyncStorage.setItem('role',(userInfo.role));
    AsyncStorage.setItem('familyid',(userInfo.familyId));
  }
 sendLogin(){
     var that=this;

          const { navigate } = this.props.navigation;

            axios.post(global.ip+'/login',{
             user:this.state
         })
         .then(async function (response) {

          alert(response.data.msg)
           that.saveData(response.data.user);
            var role= await AsyncStorage.getItem('role');
           if(response.data.msg==="success login"){
            if(role==='Mother'||role==='Father'){
               this.props.navigation('Drawer')
            }else if(role==='Child'){
               this.props.navigation('DrawerKids')
            }
              
           }
           else if(response.data.msg==="the password is not correct"){
                 alert("the password is not correct")
            }
            else if(response.data.msg==="no account"){
              alert('You Have No Account')

                 navigate('SignUp')

            }
           })
         .catch(function (error) {
          console.log(error);
         });
};
   render() {
    //jozaa 
 return (
      <ImageBackground
      source={{uri: 'https://images.pexels.com/photos/1018137/pexels-photo-1018137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
      style={styles.container}>
    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <TextInput
    	style={styles.textInput} 
      value={this.state.email}
    	placeholder='Email'
    	onChangeText={(email) => this.setState({email})}
      /> 
     <TextInput
      style={styles.textInput} 
      value={this.state.password}
      secureTextEntry={true}
      placeholder='Password'
      onChangeText={(password) => this.setState({password})}
      /> 
    <TouchableOpacity
      style={styles.btn}
      onPress={
         this.sendLogin.bind(this)


        }
    	>
    	<Text>LOGIN</Text>
    	</TouchableOpacity>
    	 <Text style={{color: 'black', paddingTop:20,fontSize: 15}}
        //const { navigate } =;
        onPress={() =>  this.props.navigation.navigate('SignUp')}>
          Create Account 
             </Text>
    </ScrollView>
    </KeyboardAvoidingView>
        </ImageBackground>

    );
  }
  

// import React, {Component} from 'react';
// import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';
// import LoginForm from './LoginForm';

// export default class Login extends Component {

// 	render(){
// 		return (
// 			<KeyboardAvoidingView behavior="padding" style={styles.container}>
// 			<View style={styles.logoContainer}>
// 			<Image
// 			style={styles.logo}
// 			source={require('../images/13.png')} />

// 			</View>
// 			<View style={styles.formContainer}>
// 			<LoginForm />
// 			</View>
// 			</KeyboardAvoidingView>

// 			);
// 	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor : '#2980b9'
	},
	logoContainer:{
		alignItems : 'center',
		flexGrow: 1,
		justifyContent : 'center'
	},
	logo: {
		width: 200,
		height: 200
	}
})