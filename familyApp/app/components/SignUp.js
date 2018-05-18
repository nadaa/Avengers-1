import React from 'react';
import {
 StyleSheet,
 Text, 
 View ,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 Button,
 AsyncStorage,
 Picker,
} from 'react-native';

import {createStackNavigator } from 'react-navigation';
import Login from './Login';
import axios from 'axios';    
import DatePicker from 'react-native-datepicker';
import {Select, Option} from "react-native-chooser";



export default class SignUp extends React.Component {

	constructor(props){
        super(props);

        this.state={
        email:'',
        password: '',
        username:'',
        bdate: '',
        role: 'Select your role',
        familyId:''
        }
    }



	// componentDidMount(){
	// 	this._loadInitialState().done();
	// }



 //    //store user info in the device
	// _loadInitialState = async () => {
	// 	var value = await AsyncStorage.getItem('user');
	// 	if(value !== null){
	// 		this.props.navigation.navigate('Profile')
	// 	}
	// }



// validateEmail (text) {
//     var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
//     if(reg.test(text) === false)
//     {return false;
//       }
//     else {
//       return true;
//     }
// }


sendSignUp(){
// axios.post('http://192.168.1.86:3000/api/signup', {

      const { navigate } = this.props.navigation;
	axios.post('http://10.0.2.2:3000/api/signup', {
    user:this.state
   })
   .then(function (response) {
    
     if(response.data.msg==="success signup"){
          navigate('Login')
     }
     else if(response.data.msg==='choose another email'){
           alert('choose another email')
      }
     }

   )
   .catch(function (error) {
     console.log(error);
   });
  }

onSelect(value, label) {
    this.setState({role : value});
  }


  render() {
  	const { navigate } = this.props.navigation;
    return (
    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <View style={styles.container}>
    <Text style={styles.header}> SIGNUP </Text>

    <TextInput
    ref={input =>{this.textInput =input}}
     value={this.state.username}
    	style={styles.textInput}  
    	placeholder='Username'
    	onChangeText={(text) => this.setState({username: text})}
    /> 
     <TextInput
        value={this.state.email}
    	style={styles.textInput} 
    	placeholder='Email'
    	onChangeText={(text) => this.setState({email: text})}
    /> 
     <TextInput
    	style={styles.textInput} 
    	placeholder='Password'
    	secureTextEntry={true}	
        value={this.state.password}
        onChangeText={(text) => this.setState({password: text})}
    /> 
   
      <DatePicker 
   
        style={styles.datepicker}
        date={this.state.bdate}
        mode="date"
        placeholder="select your birthdate"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
       
        onDateChange={(date) => {this.setState({bdate: new Date(date)})}}
      />



    <View style={styles.rolepicker}>
        <Select
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.role}
            textStyle = {{}}
            
          >
          <Option value = 'father'>Father</Option>
          <Option value = 'mother'>Mother</Option>
          <Option value = 'kid'>kid</Option>
         

        </Select>
      </View>

     <TextInput
    	style={styles.textInput} 
    	placeholder='FamilyId'
    		
        value={this.state.familyId}
        onChangeText={(text) => this.setState({familyId: text})}
    /> 
    
    <TouchableOpacity
    	style={styles.btn}
    	onPress={
    		this.sendSignUp.bind(this)
        }
    	>
    	<Text>SignUp</Text>
    	</TouchableOpacity>
         <Text style={{color: 'blue', paddingTop:10}}
        onPress={() =>  navigate('Login')}>
          I have already account -Login-
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

datepicker: {
    width:295,
    height:60,
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
},


rolepicker: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    


    

    // height:100,
},

btn: {
	alignSelf:'stretch',
	backgroundColor:'#01c853',
	padding:20,
	alignItems:'center',
}

})

