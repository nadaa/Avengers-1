import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform, TextInput,ScrollView,TouchableOpacity, Text,AsyncStorage,ImageBackground } from 'react-native';
import axios from 'axios';
import { List, ListItem} from "react-native-elements";
import CheckBox from 'react-native-checkbox';
import Bar from './Bar';
//these are for android user 
// import { List, ListItem,CheckBox } from "react-native-elements";
// import CheckboxGroup from 'react-native-checkbox-group';
export default class TasksDisplay extends React.Component {

	constructor(props){
		super(props);

		this.state={
			// it should object of arrays (kidname as key, value array of tasks)
			kidTasks:[],
			selectedTasks:[], //should contain taskId of the selected tasks
			checked:[]
 		}
		this.getTasks=this.getTasks.bind(this);
		this.updateCheck=this.updateCheck.bind(this);
		this.changeTaskStatus=this.changeTaskStatus.bind(this);
	}

changeTaskStatus(selected){
	console.log(selected);
	var taskId=this.state.kidTasks[selected]._id;
	axios.post('http://10.0.2.2:3000/api/toggletask',{taskId:taskId})
	.then((response)=>{

		alert("success, status was changed");
		this.getTasks();
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

	<ScrollView  contentContainerStyle={styles.container}>
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


	textInput: {
		alignSelf: 'stretch',
		padding:25,
	    marginBottom: 20,
	    paddingRight:70,
	    paddingLeft:70,
		backgroundColor: '#fff',

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
    marginBottom:30,
    marginLeft:30,
    marginRight:30,

    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through'
  },
  unstrikeText: {
    color: "#29323c"
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginTop: 40,
    marginBottom: 20,
    fontWeight: '300'
  },

})
//this is for android users just replace the above Checkbox with this and don't forget to uncomment the import as well 
 // <CheckboxGroup 
 //              callback={(selected) => { this.changeTaskStatus(selected)}}
 //              iconColor={"#fff"}
 //              iconSize={30}
 //              checkedIcon="ios-checkbox-outline"
 //              uncheckedIcon="ios-square-outline"
 //              checkboxes={this.state.kidTasks.map((task,index)=>{
 //    	       	return {label:task.taskName+'     '+task.completed,value:task._id}

 //              })
                
 //              }
 //              labelStyle={{
 //              	padding:10,
 //                color: '#FFFF00',
 //                fontSize:16
 //              }}
 //              rowStyle={{
 //                flexDirection: 'row'
 //              }}
 //              rowDirection={"column"}
 //            />



// {this.state.kidTasks.map((t,index)=>{
// 	  	return (<CheckBox key={index}
// 	  	title={t.taskName}
// 	  	textStyle={this.state.kidTasks[index].completed?styles.strikeText:styles.unstrikeText}
// 	 	checked={this.state.checked[index]}
// 	  	onPress={() =>this.updateCheck(index)}
// 		/>)
// 	  })}
