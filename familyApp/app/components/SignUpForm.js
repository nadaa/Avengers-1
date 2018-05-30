import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Select, Option} from "react-native-chooser";
import {createStackNavigator } from 'react-navigation';
import Login from './Login';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';


export default class SignUpForm extends Component {

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

		this.sendSignUp=this.sendSignUp.bind(this);
	}

	validateEmail (text) {
		var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(reg.test(text) === false)
			{return false;
			}
			else {
				return true;
			}
		}


		sendSignUp(){

			if(this.state.email===''||this.state.password === ''||this.state.username ===''|| this.state.bdate === ''||this.state.role === 'Select your role'|| this.state.familyId ===''){
				alert('fill all your data')
			}else if(this.validateEmail(this.state.email))
			{ 	axios.post(global.ip+'/signup', {
					user:this.state
				})
				.then(function (response) {
					console.log(response.data.msg)
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
				})
				
			} 
		}  

		onSelect(value, label) {
			this.setState({role : value});
		}

		render(){
		//const { navigate } = this.props.navigation;

			return (
				<View style={styles.regForm}>
     			<Text style={styles.header}> Registration </Text>
				<TextInput style={styles.textInput} placeholder="Username"
				underlineColorAndroid={"transparent"}
				ref={input =>{this.textInput =input}}
				value={this.state.username}
				onChangeText={(text) => this.setState({username: text})}
				/>

				<TextInput style={styles.textInput} placeholder="Email"
				underlineColorAndroid={"transparent"}
				value={this.state.email}
				onChangeText={(text) => this.setState({email: text})}
				/>

				<TextInput style={styles.textInput} placeholder="New password"
				underlineColorAndroid={"transparent"}
				secureTextEntry={true}
				value={this.state.password}
				onChangeText={(text) => this.setState({password: text})}
				/>

				<DatePicker

				style={styles.datepicker}
				mode="date"
				date={this.state.bdate}
				placeholder="Birthday"
				format="YYYY-MM-DD"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				onDateChange={(date) => {this.setState({bdate: new Date(date)})}}

				/>

				<View style = {{alignItems:'center',flexDirection:'row'}}>
				<ModalDropdown ref={(el) => {this.dropDown = el}}
				onSelect = {this.onSelect.bind(this)}

				options={['Father', 'Mother', 'Child']}
				style={styles.dropdown_2}
				textStyle={styles.dropdown_2_text}
				dropdownStyle={styles.dropdown_2_dropdown}
				defaultValue = {"Select your role"}


				/>
				</View>

				

				<TextInput style={styles.textInput} placeholder="Family Id"
				underlineColorAndroid={"transparent"}
				/>

				<TouchableOpacity style={styles.buttonContainer}>
				<Text style={styles.buttonText}> Sign up </Text>
				onPress={this.sendSignUp.bind(this) }
				</TouchableOpacity>

				<Text style={styles.textStyle}

				onPress={() =>  navigate('Login')}>

				I am already registered
				</Text>

				</View>

				);
		}
	}

	const styles = StyleSheet.create({
		regForm: {
			alignSelf: 'stretch',
		},
		header: {
			fontSize: 24,
			color: '#FFF',
			paddingBottom: 10,
			marginBottom: 40,
			borderBottomColor: '#273c75',
			borderBottomWidth : 1,
		},

		textInput: {
			alignSelf: 'stretch',
			height: 40,
			marginBottom: 30,
			fontWeight: 'bold',
			color: '#FFF',
			borderBottomColor: '#273c75',
			borderBottomWidth : 1,
		},
		buttonContainer:{
			alignSelf: 'stretch',
			alignItems: 'center',
			padding : 20,
			backgroundColor: '#0be881',
			paddingVertical: 15
		},

		buttonText: {
			textAlign: 'center',
			color: "#FFFFFF",
			fontWeight: '700'
		},

		textStyle:{
			textAlign: 'center',
			color: "#FFFFFF",
			fontWeight: '700',
			paddingTop: 10
		},

		datepicker: {
			width:350,
			alignSelf: 'stretch',
			marginBottom: 10,
			paddingRight: 40,
		},

		rolepicker: {
			width:350,
			alignSelf: 'stretch',
			marginBottom: 10,
		},

		dropdown_2: {
			alignSelf: 'flex-end',
			width: 150,
			marginTop: 32,
			right: 8,
			borderWidth: 0,
			borderRadius: 3,
			backgroundColor: 'transparent',
		},
		dropdown_2_text: {
			marginVertical: 10,
			marginHorizontal: 6,
			fontSize: 18,
			color: 'white',
			textAlign: 'center',
			textAlignVertical: 'center',
		},
		dropdown_2_dropdown: {
			width: 150,
			height: 150,
			borderColor: 'cornflowerblue',
			borderWidth: 2,
			borderRadius: 3,
		},


	})