import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { List, ListItem,CheckBox } from "react-native-elements";
import CheckboxGroup from 'react-native-checkbox-group';


export default class TasksDisplay extends React.Component {

	constructor(props){
		super(props);

		this.state={
			// it should object of arrays (kidname as key, value array of tasks)
			kidTasks:[],
			selectedTasks:[] //should contain taskId of the selected tasks
			//from the
 		}
		this.getTasks=this.getTasks.bind(this);
	}

changeTaskStatus(selected){
	console.log(selected);
	axios.post('http://10.0.2.2:3000/api/toggletask',{tasks:selected})
	.then((response)=>{
		alert("success");
	})

	.catch(function (error) {
    console.log(error);
  });

}


getTasks(){
	var kidEmail='kid1@gmail.com';
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
	this.getTasks();
}	

	render() {
		return (

		
	   	<View style={styles.container}>
		    <CheckboxGroup 
              callback={(selected) => { this.changeTaskStatus(selected)}}
              iconColor={"#fff"}
              iconSize={30}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={this.state.kidTasks.map((task,index)=>{
    	       	return {label:task.taskName+'     '+task.completed,value:task._id}

              })
                
              }
              labelStyle={{
                color: '#FFFF00',
                fontSize:16
              }}
              rowStyle={{
                flexDirection: 'row'
              }}
              rowDirection={"column"}
            />
		
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
		borderWidth:1
	
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
