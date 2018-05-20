import React from 'react';
import {
 StyleSheet,
 Text, 
 View ,
 TextInput,
 KeyboardAvoidingView,
 TouchableOpacity,
 Button,
 AsyncStorage,
 Picker,
} from 'react-native';

import {createStackNavigator } from 'react-navigation';
import Login from './Login';
import axios from 'axios';    
import DatePicker from 'react-native-datepicker';
import {Select, Option} from "react-native-chooser";
import Bar from './Bar';

export default class SignUp extends React.Component {
//in which room the need stuff
//what need the need for that room 
	constructor(props){
        super(props);

        this.state=
        {
        room:'',
        need:'',
        }
    }



	// componentDidMount(){
	// 	this._loadInitialState().done();
	// }



 //    //store user info in the device
	// _loadInitialState = async () => {
	// 	var value = await AsyncStorage.getItem('user');
	// 	if(value !== null){
	// 		this.props.navigation.navigate('Profile')
	// 	}
	// }






sendShortage(){
  // alert('BLA')
   const { navigate } = this.props.navigation;
 axios.post('http://192.168.1.86:3000/api/shortage', { 
	// axios.post('http://10.0.2.2:3000/api/signup', {
    needs:this.state
   })
   .then(function (response) {
     console.log('response.data.msg',response.data.msg)
     if(response.data.msg==="success "){
           alert('success')
     }
     else if(response.data.msg==='error'){
           alert('error')
      }
     }

   )
   .catch(function (error) {
     console.log(error);
   });
  }

onSelect(value, label) {
    this.setState({room : value});
  }


  render() {
  	const { navigate } = this.props.navigation;
    return (
    <KeyboardAvoidingView behaviour='padding' style ={styles.wrapper}>
    <Bar navigation={this.props.navigation}/>
    <View style={styles.container}>
    <Text style={styles.header}> SHORTAGE </Text>

    <View style={styles.rolepicker}>
        <Select
            onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.room}
            textStyle = {{}}
            
          >
          <Option value = 'Kitchen'>Kitchen</Option>
          <Option value = 'BedRoom'>BedRoom</Option>
          <Option value = 'BathRoom'>BathRoom</Option>
          <Option value = 'LivingRoom'>LivingRoom</Option>
          <Option value = 'Backyard'>Backyard</Option>
         

        </Select>
      </View>


    <TextInput
    multiline={true}
    ref={input =>{this.textInput =input}}
     value={this.state.need}
    	style={styles.textInput}  
    	placeholder='What do you need !'
    	 onChangeText={(text) => this.setState({need: text})}
    /> 

    
    <TouchableOpacity
    	style={styles.btn}
    	onPress={
    		this.sendShortage.bind(this)
        }
    	>
    	<Text>Ask for Approval</Text>
    	</TouchableOpacity>
       
    </View>
    </KeyboardAvoidingView>
    );
  }


 
}

const styles = StyleSheet.create({
wrapper: {
	flex: 1,
},
container: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
	// backgroundColor: '#2896d3',
	paddingLeft: 40,
	paddingRight: 40,
},
header: {
	fontSize: 24,
	marginBottom: 60,
	//color: '#fff',
	fontWeight: 'bold',
},
textInput: {
	alignSelf: 'stretch',
	padding: 16,
	marginBottom: 20,
	backgroundColor: '#fff',
  height:200,
},

datepicker: {
   
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
},


rolepicker: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  
},

btn: {
	alignSelf:'stretch',
	backgroundColor:'#01c853',
	padding:20,
	alignItems:'center',
}

})

