import React from 'react';
import { View, Picker, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
export default class TaskMonitor extends React.Component {

	constructor(props){
		super(props);

		this.state={
			// it should object of arrays (kidname as key, value array of tasks)
			kids:[],
			KidTasks:[],
			kidIndex:0
		}
		this.getKids=this.getKids.bind(this);
		this.showTasks=this.showTasks.bind(this);
	}


getKids(){
	//get familyId from the localstorage of the loggedin user, for testing
	//I will use familyId=1
	var familyId="1"
	axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)
	.then((response) =>{
		this.setState({kids:response.data});
				//console.log(this.state.kids);

  })
  .catch(function (error) {
    console.log(error);
  });

}

showTasks(){
	var kidEmail=this.state.kids[this.state.kidIndex].email;
	axios.post('http://10.0.2.2:3000/api/gettasks',{kidemail:kidEmail

	})
	.then((response) =>{
		//console.log(response.data);
		this.setState({KidTasks:response.data});
    
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
			onPress={() =>this.showTasks()}>
			<Text style={styles.textStyle}>Show Tasks</Text>
			</TouchableOpacity>


			{this.state.KidTasks.map((task,index)=>{
				return(<View style={{flex: 1, flexDirection: 'column'}}>
				<View key={index}><Text>{task.taskName+" "+task.completed}</Text></View>
				</View>
				)
			})
			}


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
