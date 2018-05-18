import React from 'react';
import { View, Picker, FlatList ,StyleSheet,Platform, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { List, ListItem,CheckBox } from "react-native-elements";

export default class TaskMonitor extends React.Component {

	constructor(props){
		super(props);

		this.state={
			// it should object of arrays (kidname as key, value array of tasks)
			kids:[],
			kidTasks:[],
			kidIndex:0
		}
		this.getKids=this.getKids.bind(this);
		this.showTasks=this.showTasks.bind(this);
		//this.renderItem=this.renderItem.bind(this);
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

	// renderItem(item){
	// 	return (
	// 	<View>
	// 	<Text>{item.taskName}</Text>
	// 	<Text>{item.completed}</Text>
	// 	</View>

	// 	)
	// 	}



	render() {
		return (
			<View style={styles.container} >
		
			<View style={{borderWidth:2,marginTop:10,height:150,width:400}}>
			<Picker style={styles.picker}
			selectedValue = {this.state.selectedKid}
  			onValueChange={(kidName, kidIndex) => this.setState({selectedKid: kidName,kidIndex:kidIndex})}
			mode="dropdown">
			
			{this.state.kids.map((kid,index)=>{
        	return (<Picker.Item   label={kid.username} value={kid.username} key={index}/>) 
			})}
			</Picker>
			

			<TouchableOpacity
			style={styles.btn}
			onPress={() =>this.showTasks()}>
			<Text style={styles.textStyle}>Show Tasks</Text>
			</TouchableOpacity>
			</View>



   	<View style={{borderWidth:2,marginTop:20,height:150,width:400}}>

			<FlatList
      data={this.state.kidTasks}
      //numColumns={4}
      renderItem={({ item }) => (
          <Text style={styles.text}>{`${item.taskName}  ${item.completed}`}</Text>

         )}
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
