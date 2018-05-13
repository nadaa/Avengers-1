import React from 'react';
import {
 StyleSheet,
 Text, 
 View ,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 AsyncStorage,
} from 'react-native';

import {createStackNavigator } from 'react-navigation';
//we did 11:00 AM

  

import Login from './Login';

export default class SignUp extends React.Component {

	constructor(props){
		super(props);
		this.state={
			username:'',
			email:'',
			password:'',
			DateOfBirth:'',
		}
	}
	componentDidMount(){
		this._loadInitialState().done();
	}
	_loadInitialState = async () => {
		var value = await AsyncStorage.getItem('user');
		if(value !== null){
			this.props.navigation.navigate('Profile')
		}
	}
  render() {
  	const { navigate } = this.props.navigation;
    return (
    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <View style={styles.container}>
    <Text style={styles.header}> SIGNUP </Text>
    <TextInput
    	style={styles.textInput} 
    	placeholder='Username'
    	onChangeText={(username) => this.setState({username})}
    	
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='Email'
    	onChangeText={(email) => this.setState({email})}
    	


    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='Password'
    	onChangeText={(password) => this.setState({password})}
    	secureTextEntry={true}	


    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='DateOfBirth'
    	onChangeText={(DateOfBirth) => this.setState({DateOfBirth})}
    		

    /> 
    
    <TouchableOpacity
    	style={styles.btn}
    	onPress={() =>
          navigate('Login')
        }
    	>
    	<Text>SignUp</Text>
    	</TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
    );
  }
  login=()=>{
  	fetch('https://192.168.1.86.3000/api/signup', {
	  method: 'POST',
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    username: this.state.username,
	    email: this.state.email,
	    password: this.state.password,
	    DateOfBirth: this.state.DateOfBirth,
  }),
});
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
	backgroundColor: '#2896d3',
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

