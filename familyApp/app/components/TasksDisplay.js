import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform, TextInput,ScrollView,TouchableOpacity, Text,AsyncStorage,ImageBackground } from 'react-native';
import axios from 'axios';
import { Card} from "react-native-elements";
import CheckBox from 'react-native-checkbox';
import Bar from './Bar';

export default class TasksDisplay extends React.Component {
	constructor(props){
		super(props);
		this.state={
			kidTasks:[],
			checked:[],
			progress:0,
 		}
		this.getTasks=this.getTasks.bind(this);
		this.updateCheck=this.updateCheck.bind(this);
		this.changeTaskStatus=this.changeTaskStatus.bind(this);
	}
	changeTaskStatus(selected){
		var taskId=this.state.kidTasks[selected]._id;
		axios.post(global.ip+'/toggletask',{taskId:taskId})
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
		axios.post(global.ip+'/gettasks',{kidemail:kidEmail
		})
		.then((response) =>{
			this.setState({kidTasks:response.data});
			var completed=0;
			for(var i=0;i<this.state.kidTasks.length;i++){
				if(this.state.kidTasks[i].completed){
				  completed++;
		    }
	    }
	    if(this.state.kidTasks.length>0){
	    	this.setState({progress:Math.round(completed/this.state.kidTasks.length.toFixed(2)*100)})
	    }
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
	render(){
		return(
			<ScrollView contentContainerStyle={{flex:1}} >
			  <Bar p={this.state.progress} navigation={this.props.navigation}/>
				<Card title="My Tasks" titleStyle={{fontSize:26}}>
			    {this.state.kidTasks.map((t,index)=>{
				    return(
             <View key={index} style={{borderWidth:1, borderColor:'#E0E0E0'}}>
				      	<CheckBox key={index}
				         label={t.taskName}
				         labelStyle={this.state.kidTasks[index].completed?styles.strikeText:styles.unstrikeText}
				         checked={this.state.checked[index]}
				         onChange={(checked) =>this.updateCheck(index)}
				       />
				     </View>
            )
          })}
			  </Card>
	    </ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		//backgroundColor: '#2896d3',
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
	  paddingLeft:10,
	  paddingTop:30,
  },
	strikeText: {
	  color: '#bbb',
	  textDecorationLine: 'line-through',
	  fontSize:18,
	},
	unstrikeText: {
   //color: "#29323c",
    fontSize:18,
	},
	title: {
	  fontSize: 30,
	  marginTop: 40,
	  marginBottom: 20,
	  fontWeight: '300',
	  textAlign:'center',
	},
})
