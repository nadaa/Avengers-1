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
import Login from './Login';
import axios from 'axios';    

export default class SignUp extends React.Component {

	constructor(props){
		super(props);
		this.state={
		email:'',
		password: '',
		username:'',
		bdate: '',
		role: '',
		rank: '',
		familyId:''
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





sendSignUp(){
	// axios.post('http://192.168.1.86:3000/api/signup', {
 //  user:this.state
 // })
 // .then(function (response) {
 //   console.log(response);
 // })
 // .catch(function (error) {
 //   console.log(error);
 // });
	// fetch('http://192.168.1.86:3000/api/signup', {
	//   method: 'POST',
	//   headers: {
	//     Accept: 'application/json',
	//     'Content-Type': 'application/json',
	//   },
	//   body: JSON.stringify({
	//   //       email:this.state.email,
	// 		// password: this.state.password,
	// 		// username:this.state.username,
	// 		// bdate:this.state.bdate,
	// 		// role: this.state.role,
	// 		// rank: this.state.rank,
	// 		// familyId:this.state.familyId
	// 		user:this.state,

	//   })

	// })

 //  .then((response) => response.json())
 //    .then((responseJson) => {
      
 //    })
 //    .catch((error) => {
 //      console.error(error);
 //    });

}


  render() {
  	
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
    	onChangeText={(bdate) => this.setState({bdate})}
    	
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='Role'
    	onChangeText={(role) => this.setState({role})}
    	
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='Rank'
    	onChangeText={(rank) => this.setState({rank})}
    		
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='FamilyId'
    	onChangeText={(familyId) => this.setState({familyId})}		

    /> 
    
    <TouchableOpacity
    	style={styles.btn}
    	onPress={
    		this.sendSignUp()
        }
    	>
    	<Text>SignUp</Text>
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

