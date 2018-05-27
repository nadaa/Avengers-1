import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform, TextInput,ScrollView,TouchableOpacity, Text,AsyncStorage,ImageBackground } from 'react-native';
import axios from 'axios';
import { List, ListItem} from "react-native-elements";
import CheckBox from 'react-native-checkbox';
import Bar from './Bar';
// import { List, ListItem,CheckBox } from "react-native-elements";
// import CheckboxGroup from 'react-native-checkbox-group';
export default class TasksDisplay extends React.Component {

	constructor(props){
		super(props);
		this.state={
			kidTasks:[],
			checked:[],
 		}
		this.getTasks=this.getTasks.bind(this);
		this.updateCheck=this.updateCheck.bind(this);
		this.changeTaskStatus=this.changeTaskStatus.bind(this);
	}

	changeTaskStatus(selected){
		//console.log(selected);
		var taskId=this.state.kidTasks[selected]._id;
		axios.post('http://10.0.2.2:3000/api/toggletask',{taskId:taskId})
		.then((response)=>{
			alert("success, status was changed");
			this.getTasks();
			if(this.state.checked[selected]){
				this.state.checked[selected]=!this.state.checked[selected];
				this.setState({checked:this.state.checked});
			}
		})
		.catch(function (error) {
	    console.log(error);                                      
	  });
	}

	async getTasks(){
		var kidEmail=await AsyncStorage.getItem('email');
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
		this.getTasks();
	}	

	updateCheck(index){
		this.state.checked[index]=!this.state.checked[index];
		this.setState({checked:this.state.checked});
			if(this.state.checked[index] ){
				alert ("Are you sure to change task status?")
				this.changeTaskStatus(index);
			}
	}

	render() {
		return (
			<ScrollView contentContainerStyle={{backgroundColor	:'#2896d3',flex:1}} >
			 <Bar navigation={this.props.navigation}/>
				<Text style={styles.title}> My Tasks</Text>
				<View style={styles.card} >
			     {this.state.kidTasks.map((t,index)=>{
				   	return(<CheckBox key={index}
				  label={t.taskName}
				  labelStyle={this.state.kidTasks[index].completed?styles.strikeText:styles.unstrikeText}
				  checked={this.state.checked[index]}
				  onChange={(checked) =>this.updateCheck(index)}
				/>)}
				)}
				</View>
	    	</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2896d3',
	},
	card: {
	    backgroundColor: '#fff',
	    flex: 1,
	    width: 400,
	    height:300,
	    borderTopLeftRadius: 10,
	    borderTopRightRadius: 10,
	    borderBottomLeftRadius: 10,
	    borderBottomRightRadius: 10,
	    marginTop:30,
	    // marginLeft:30,
	    // marginRight:50,
	    paddingLeft:10,
	    paddingTop:30,

  },
	  strikeText: {
	    color: '#bbb',
	    textDecorationLine: 'line-through',
	    fontSize:14,
	  },
	  unstrikeText: {
	    color: "#29323c",
	    fontSize:14,
	  },
	  title: {
	    color: '#fff',
	    fontSize: 30,
	    marginTop: 40,
	    marginBottom: 20,
	    fontWeight: '300'
	  },

})

