import React from 'react';
import { View, Picker, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export default class KidsTasks extends React.Component {

	constructor(props){
		super(props);

		this.state={
			kidName: '',
			taskText : ''
		}
	}

	render() {
		return (
			<View style={styles.container}>
			
			<Picker
			selectedValue = {this.state.day}
			onValueChange={day => this.setState({ day })}
			style={{ width: 160 }}
			mode="dropdown"
			>
			<Picker.Item label="Monday" value="Monday" />
			<Picker.Item label="Tuesday" value="Tuesday" />
			<Picker.Item label="Wednesday" value="Wednesday" />


			</Picker>

			<TextInput 
			underlineColorAndroid="transparent"
			value={this.state.taskText}
			style={styles.textInput} 
			placeholder='Add Task'
			onChangeText={(text) => this.setState({taskText: text})}
			/> 

			<TouchableOpacity
			style={styles.btn}
			onPress={() =>  console.log("Hussein")}>
			<Text style={styles.textStyle}>Submit</Text>
			</TouchableOpacity>
			</View>

			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2896d3',
		paddingLeft: 40,
		paddingRight: 40,
	},

	btn: {
		alignSelf: 'stretch',
		backgroundColor: '#01c853',
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
		paddingTop: 15,
		marginTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},

	viewStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},

	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#fff',

	},
})
