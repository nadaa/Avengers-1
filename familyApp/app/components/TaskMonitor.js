import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform, TextInput, TouchableOpacity, Text,AsyncStorage } from 'react-native';
import axios from 'axios';
import { List, ListItem,CheckBox } from "react-native-elements";
import CheckboxGroup from 'react-native-checkbox-group';
import {Select, Option} from "react-native-chooser";


var s=require('./Store.js');

export default class TaskMonitor extends React.Component {

	constructor(props){
		super(props);

		this.state={
			kids:[],
			kidTasks:[],
			kidIndex:0,
			checked:true,
			selectedIndex:0
			}
		this.getKids=this.getKids.bind(this);
		this.showTasks=this.showTasks.bind(this);
		//this.deleteCompletedTask=this.deleteCompletedTask.bind(this);
	}

async getKids(){
	
	var familyId= await AsyncStorage.getItem('familyid')
	
	axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)


getKids(){
	//get familyId from the localstorage of the loggedin user, for testing
	//I will use familyId=1
	var familyId="1"
	axios.get(`http://192.168.1.86:3000/api/getkids/${familyId}`)
	//axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)
	.then((response) =>{
		this.setState({kids:response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
}

deleteCompletedTask(selected){

}

showTasks(){
	var kidIndex;
	for(var i=0;i<this.state.kids.length;i++){
		if(this.state.kids[i].username===this.state.selectedKid)
			kidIndex=i;

	}
	var kidEmail=this.state.kids[kidIndex].email;

	axios.post('http://10.0.2.2:3000/api/gettasks',{kidemail:kidEmail
	})
	.then((response) =>{
		console.log(response.data);
		this.setState({kidTasks:response.data});
  })
  .catch(function (error) {
    console.log(error);
  });
}

componentDidMount(){
	// send a ajax get request to get all kids
	this.getKids();
}

confirm(selected){

	this.setState({selectedIndex:selected});
	var completed=[];
	for(var i=0;i<selected.length;i++){
		if(this.state.kidTasks[i].completed)
			completed.push(this.state.kidTasks[i]._id);
	}


	//send a post request of all completed tasks
	axios.post('http://10.0.2.2:3000/api/confirmtasks',{tasks:completed})
		.then((response)=>{
			this.render();

		})
		.catch(function(err){

		})
}
	

	render() {
		return (
			<View style={styles.container} >
			<View style={{marginTop:10,height:150,width:400}}>


		        <Select
		            onSelect = {(kidName, KidName) => this.setState({selectedKid: kidName})}
		            defaultText  = {this.state.selectedKid}
		            textStyle = {{}}
		          >
		          {this.state.kids.map((kid,index)=>{
		        	return (<Option value={kid.username}  key={index}>{kid.username}</Option>) 
					})}
		          
		    	         

		        </Select>

			<TouchableOpacity
			style={styles.btn}
			onPress={() =>this.showTasks()}>
			<Text style={styles.textStyle}>Show Tasks</Text>
			</TouchableOpacity>
			</View>

   	<View style={{marginTop:20,height:150,width:400}}>
		    <CheckboxGroup
              callback={(selected) => this.confirm(selected)}
              iconColor={"#fff"}
              iconSize={30}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={this.state.kidTasks.map((task,index)=>{
              	return {label:task.taskName+'     '+task.completed,value:index}
              })
      
              }
              labelStyle={{
                color: '#333'
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"column"}
            />




		</View>
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
	
		//paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
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

	picker: {
    width: 200,
    height: 44,
    borderColor: 'black',
    borderWidth: 1,
    
  },
})
