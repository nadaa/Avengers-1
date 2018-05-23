import React from 'react';
import { View, Picker, StyleSheet, TextInput, TouchableOpacity, Text,AsyncStorage } from 'react-native';
import axios from 'axios';
import {Select, Option} from "react-native-chooser";

export default class AssignKidsTasks extends React.Component {

	constructor(props){
		super(props);

		this.state={
			// to store all kids of the loggedin parent
			kids:[],
			taskText: '',
			selectedKid:'select your kid',
			familyId:'',
			kidIndex:0
		}
		this.getKids=this.getKids.bind(this);
		this.setKidTask=this.setKidTask.bind(this);
	}


async getKids(){
	
	var familyId= await AsyncStorage.getItem('familyid')
	
	axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)
	.then((response) =>{
		this.setState({kids:response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
}


//familyId should be taken from the AsyncStorage
setKidTask(){
	//console.log(this.state.kids[this.state.kidIndex]);
	//var kidEmail=this.state.kids[this.state.kidIndex].email;
	//console.log('gjgjgjgj',this.state.kids[this.state.kidIndex]);
	var kidIndex;
	for(var i=0;i<this.state.kids.length;i++){
		if(this.state.kids[i].username===this.state.selectedKid)
			kidIndex=i;

	}
	//console.log('nada',this.state.kids[kidIndex]);


	//axios.post('http://192.168.1.86:3000/api/setkidtask',{
	axios.post('http://10.0.2.2:3000/api/setkidtask',{
		kidemail:this.state.kids[kidIndex].email,
		task:this.state.taskText,
		//familyId:this.state.kids[kidIndex].familyId	
	})
	// axios.post('http://10.0.2.2:3000/api/setkidtask',{kidemail:kidEmail,
	// 	task:this.state.taskText

	// })
	.then((response) =>{
		alert(response.data.msg);

	    
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
			
			 <View style={styles.rolepicker}>
		        <Select
		            onSelect = {(kidName, KidName) => this.setState({selectedKid: kidName})}
		            defaultText  = {this.state.selectedKid}
		            textStyle = {{}}
		          >
		          {this.state.kids.map((kid,index)=>{
		        	return (<Option value={kid.username}  key={index}>{kid.username}</Option>) 
					})}
		          
		          
		         

		        </Select>
		      </View>

			<TextInput 
			 multiline={true}
			underlineColorAndroid="transparent"
			value={this.state.taskText}
			style={styles.textInput} 
			placeholder='Add One Task'
			onChangeText={(text) => this.setState({taskText: text})}
			/> 

			

			<TouchableOpacity
			style={styles.btn}
			onPress={() => this.setKidTask() }>
			<Text style={styles.textStyle}>Add Task</Text>
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
		//backgroundColor: '#2896d3',
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
	  	height:200,

	},
	rolepicker: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
   
},
})

// <Picker
// 			selectedValue = {this.state.selectedKid}
//   			onValueChange={(kidName, kidIndex) => this.setState({selectedKid: kidName,kidIndex:kidIndex})}
// 			style={{ width: 160 }}
// 			mode="dropdown">
			
// 			{this.state.kids.map((kid,index)=>{
//         	return (<Picker.Item label={kid.username} value={kid.username} key={index}/>) 
// 			})}
// 			</Picker> 

