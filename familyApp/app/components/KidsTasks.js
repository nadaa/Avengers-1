import React from 'react';
import { View, Picker, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios'

export default class KidsTasks extends React.Component {

	constructor(props){
		super(props);


		this.state={
			kidName: [],
			taskText : ''
		}
	}


	componentDidMount(){
		this.getKids();
	}


	getKids(){
		const x = this;
		axios.post('http://192.168.56.1:3000/api/getkidsid',{
			familyId:"12345"
		})
		.then(function (response) {
		// console.log('task:',response.data);
		var array=response.data;
		var arr = []
		for(var i = 0 ; i < array.length;i++){
			arr.push(array[i].username)
			//alert("your iddd: " + response.data.id)
		}
		x.setState({
			kidName: arr
		})
		console.log('sdsdsd',x.state.kidName)

	})
		.catch(function (error) {
			console.log(error);
		});
	}

	componentDidMount(){

		console.log('This happens 3rd.');
		this.getKids()

	}

	render() {
		return (

			<View style={styles.container}>

			<Picker
			style={{ width: 160 }}
			mode="dropdown">
			{
				this.state.kidName.map((data)=>
					(
						<Picker.Item label={data} value={data} />
						)
					)}
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
		// onPress={this.componentWillMount.bind(this)}
		>
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