import React from 'react';
import { View, Picker, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
export default class KidsTasks extends React.Component {

	constructor(props){
		super(props);

		this.state={
			// to store all kids of the loggedin parent
			kids:[],
			taskText: '',
			selectedKid:'',
			familyId:'',
			kidIndex:0
		}
		this.getKids=this.getKids.bind(this);
		this.setKidTask=this.setKidTask.bind(this);
	}


getKids(){
	//get familyId from the localstorage of the loggedin user, for testing
	//I will use familyId=1
	var familyId="1"
	axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)
	.then((response) =>{
    this.setState({kids:response.data});
  })
  .catch(function (error) {
    console.log(error);
  });

}


setKidTask(){
	//console.log(this.state.kids[this.state.kidIndex]);
	var kidEmail=this.state.kids[this.state.kidIndex].email;
	axios.post('http://10.0.2.2:3000/api/setkidtask',{kidemail:kidEmail,
		task:this.state.taskText

	})
	.then((response) =>{
	    
  })
  .catch(function (error) {
    console.log(error);
  });

}


componentDidMount(){
	// send a ajax get request to get all kids
	this.getKids();
}
	render() {
		return (
			<View style={styles.container}>
			
			
			<TextInput 
			underlineColorAndroid="transparent"
			value={this.state.taskText}
			style={styles.textInput} 
			placeholder='Add Task'
			onChangeText={(text) => this.setState({taskText: text})}
			/> 

			<Picker
			selectedValue = {this.state.selectedKid}
  			onValueChange={(kidName, kidIndex) => this.setState({selectedKid: kidName,kidIndex:kidIndex})}
			style={{ width: 160 }}
			mode="dropdown">
			
			{this.state.kids.map((kid,index)=>{
        	return (<Picker.Item label={kid.username} value={kid.username} key={index}/>) 
			})}
			</Picker>



			<TouchableOpacity
			style={styles.btn}
			onPress={() => this.setKidTask() }>
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
