import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform,ScrollView, TextInput, TouchableOpacity, Text,AsyncStorage } from 'react-native';
import axios from 'axios';
import { List, ListItem,CheckBox,Dimensions } from "react-native-elements";
import CheckboxGroup from 'react-native-checkbox-group';
import {Select, Option} from "react-native-chooser";
import BarParents from './BarParents';


export default class TaskMonitor extends React.Component {
	constructor(props){
		super(props);
		this.state={
			kids:[],
			kidTasks:[],
			checked:[],
			taskText:'',
			selectedKid:undefined
			}
		this.getKids=this.getKids.bind(this);
		this.showTasks=this.showTasks.bind(this);
		this.updateCheck=this.updateCheck.bind(this);
	}

async getKids(){
	var familyId= await AsyncStorage.getItem('familyid')
//	console.log(familyId)
	axios.get(`http://10.0.2.2:3000/api/getkids/${familyId}`)
	//axios.get(`http://192.168.1.86:3000/api/getkids/${familyId}`)
		.then((response) =>{
			this.setState({kids:response.data});
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
}


updateCheck(index){
	this.state.checked[index]=!this.state.checked[index];
	this.setState({checked:this.state.checked});
		if(this.state.checked[index] && this.state.kidTasks[index].completed){
			alert ("Do you want to delete this task?")
			this.confirm(index);
		}
}

showTasks(kidName){
	if(this.state.selectedKid){
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
				//initialize checked array by false
				var temp;
				for(var i=0;i<this.state.kidTasks.length;i++){
					temp.push(false);
					this.setState({checked:temp});
				}
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	 }
}

componentDidMount(){
	this.getKids();
}

setKidTask(){
	if(this.state.selectedKid){
	var kidIndex;
	for(var i=0;i<this.state.kids.length;i++){
		if(this.state.kids[i].username===this.state.selectedKid)
			kidIndex=i;
	}
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
}

confirm(selected){
	if(this.state.checked[selected]){
		axios.post('http://10.0.2.2:3000/api/confirmtask',{taskId:this.state.kidTasks[selected]._id})
			.then((response)=>{
				if(response.data.deleted){
					this.showTasks();
				}
			})
			.catch(function(err){
			})
	}
}
	render() {
		return (
	<View style={{flex:1}}>
	<BarParents navigation={this.props.navigation}/>
	<ScrollView contentContainerStyle={styles.container}>
		<Text style={styles.title}> Monitor Kids' Tasks</Text>
		<View style={styles.subcontainer}>
		    <Select style={styles.select}
					onSelect = {(kidName, key) => this.setState({selectedKid: kidName})
						}
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
		<View style={styles.subcontainer}>
			<TextInput 
			value={this.state.taskText}
			style={styles.textInput} 
			placeholder='Add One Task'
			onChangeText={(text) => this.setState({taskText: text})}
			/> 
			<TouchableOpacity
			style={styles.btn}
			onPress={() =>this.setKidTask()}>
			<Text style={styles.textStyle}>Add Task</Text>
			</TouchableOpacity>
		</View>


  		<ScrollView contentContainerStyle={styles.card} horizental={true} >
  			{this.state.kidTasks.map((t,index)=>{
  				return (
  					<CheckBox key={index}
	  				title={t.taskName}
	  				textStyle={this.state.kidTasks[index].completed?styles.strikeText:styles.unstrikeText}
	 				checked={this.state.checked[index]}
	  				onPress={() =>this.updateCheck(index)}
				/>
				)
 			})}
  
  		</ScrollView>
    </ScrollView>
    </View>
	);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2896d3',
	},
	subcontainer:{
		justifyContent:'center',
		flexDirection:'row',
		marginTop:10
	},
	select:{
		backgroundColor:"#D3D3D3",
		height:30,
		justifyContent: 'center',
	},
	btn: {
		backgroundColor: '#D3D3D3',
		justifyContent: 'center',
		marginLeft:5,
		borderRadius:5,
		width:70,
		alignSelf: 'center',
		borderWidth: 1,
    	borderColor: '#336633',
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
card: {
    backgroundColor: '#fff',
    flex: 1,
    width: 400,
    height:300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    // marginTop:30,
    // marginBottom:30,
    // marginLeft:10,
    // marginRight:10,


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

   title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '300',
    textAlign:'center',
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through'
  },
  unstrikeText: {
    color: "#29323c"
  },
  textInput: {
		backgroundColor: '#fff',
        height: 70,
        width:200,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft:0,
        justifyContent: 'center',
	},
})


