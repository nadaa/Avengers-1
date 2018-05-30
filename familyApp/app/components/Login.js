import React, {Component} from 'react';
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {

	render(){
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
			<View style={styles.logoContainer}>
			<Image
			style={styles.logo}
			source={require('../images/13.png')} />

			</View>
			<View style={styles.formContainer}>
			<LoginForm />
			</View>
			</KeyboardAvoidingView>

			);
	}
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